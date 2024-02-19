from flask import *
from flask import render_template
from blueprint.login import login_bp
from blueprint.upload import upload_bp
from blueprint.file import my_file_bp
# from blueprint.root import root_bp
from blueprint.test import test_bp
# from tools.path_list import path_list
import os
import difflib
from flask_sqlalchemy import SQLAlchemy  
import bcrypt
from flask_cors import CORS
from flask_cors import cross_origin
from pyzbar.pyzbar import decode
from PIL import Image
import cv2
from tools.vars import *
import secrets
# import glob
# from gevent import pywsgi

# init
on = 'win'
if on == 'android':
    os.chdir('/storage/emulated/0/Android/data/org.qpython.qpy/files/projects3/flask')

app = Flask(__name__)
app.secret_key = '5s9s.dd9&@8s.da36lm_4qw97n.Éwo3_pq.,is.h'
app.config['SQLALCHEMY_DATABASE_URI'] =  'mysql+pymysql://root:mysql@localhost:3306/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.register_blueprint(login_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(my_file_bp)
app.register_blueprint(test_bp)
CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
path_list = []


                



app.app_context().push()
class User(db.Model):  
    id = db.Column(db.Integer, primary_key=True)  
    username = db.Column(db.String(80), unique=True, nullable=False)  
    password_hash = db.Column(db.String(128), nullable=False)

    # email = db.Column(db.String(120), unique=True, nullable=False)  
    # phone = db.Column(db.String(20), nullable=False)  
    sex = db.Column(db.String(10))
    def check_password(self, password):  
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

class video_viewer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(80))

path_list = []




for root,dirs,files in os.walk('static'):
        for file in files:
            if file.split('.')[-1] == 'html':
                path_list.append('/'+os.path.join(root,file).split('flask')[-1].replace("\\", "/"))

for i in app.url_map.iter_rules():
    path_list.append(str(i))

print(path_list)
@app.route("/exit_video_viewing")
def exit_video_viewing():
    global cap
    # 方式1: 先查后删除
    if video_viewer.query.count() == 0:
        return "Can't exit"
    else:
        db.session.delete(video_viewer.query.first())
        db.session.commit()
        cap.release()
        return redirect("/")
    
@app.route('/root/user')
def getroot():
    if session.get('root_name') is None or session.get('root_password') is None:
        return "[]"
    data = ""
    json_date = """
{{"name":"{}",
"password":"{}",
"sex":"{}"
}},
"""
    for i in User.query.all():
        # data[i.username] = i.password_hash
        data += json_date.format(i.username, i.password_hash,i.sex)


    return "[{}]".format(data)

@app.route("/root")
def root():
    if session.get('root_name') is None or session.get('root_password') is None:
        return redirect("/login_for_root")
    return redirect("/static/app/root/index.html")

@app.before_request
def init():
    print(request.url)
    if request.url == "http://127.0.0.1:5000/image":
        global cap
        cap = cv2.VideoCapture(0)


@cross_origin
@app.route('/api/register', methods=['POST'])  
def register():  
    data = request.json  
    username = data.get('username')  
    password = data.get('password')  
    sex = data.get("sex")

    # 检查用户是否已存在  
    if User.query.filter_by(username=username).first():  
        return jsonify({'success': False, 'message': '用户名已存在'}), 409

    # 哈希密码  
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  
  
    # 创建新用户并保存到数据库  
    if sex == '':
        new_user = User(username=username.encode("utf-8"), password_hash=hashed_password)
    else:
        new_user = User(username=username.encode("utf-8"), password_hash=hashed_password, sex=sex)  
    db.session.add(new_user)  
    db.session.commit()  
    os.mkdir("date/"+username)
    return jsonify({'success': True, 'message': '注册成功'})

@app.route("/image")
def image1():
    # if session.get("user_info") is None:
    #     return redirect("/login")
    if video_viewer.query.count() == 0:
        key = secrets.token_hex(40)
        new_video_viewer = video_viewer(user=key)
        db.session.add(new_video_viewer)  
        db.session.commit() 
        session["Video viewing key"] = key
    else:
        return "只能有一个用户"
    return render_template("image.html")
    


@app.route("/static/image/1.jpg")
def send_image():
    global cap
    if cap.isOpened():
        ret, frame = cap.read()
        cv2.imwrite("static/image/1.jpg",frame)
    return send_file("static/image/1.jpg")
@app.route("/favicon.ico")
def favicon():
    return send_file("static/image/favicon.png")

@app.route("/login", methods=["GET"])
def login():
    return render_template("login.html")
@app.route('/login', methods=['POST'])  
def login_api():  
    
    data = request.form
    username = data.get('name')  
    password = data.get('password')
    login_date_ = ""  
  
    # 从数据库中查询用户  
    user = User.query.filter_by(username=username).first()
  
    # 检查用户是否存在以及密码是否正确  
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):  
        # 设置用户会话，例如将用户ID存储在session中  
        session['user_info'] = user.username

        session['path'] = 'date/' + user.username
        return redirect("/")
    else:  
        # 登录失败，返回错误信息  
        if not user:
            login_date_ = login_data.format("用户名错误")
            return render_template("login.html", date=login_date_)
        else:
            login_date_ = login_data.format("密码错误")
            return render_template("login.html", date=login_date_)

@app.route('/footprint')
def footprint():
    return request.cookies.get('footprint')
    
@app.after_request
def load_footprint(res):
    global path_list
    resp = make_response(res)
    data = request.cookies.get("footprint")
    if data is None:
        data = []
    else:
        data = eval(data)
    if str(request.url)[21:] in path_list:
        data.append(request.url)

    
    resp.set_cookie("footprint", str(data))
    
    return resp



@app.route('/setup/avatar', methods=["POST"])
def avatar():
    user_info = session.get('user_info')
    if not user_info:
        del user_info
        return redirect('/login')
    if request.method == 'POST':
        files = request.files.getlist('file')
        for file in files:
            filename = session.get("user_info")
            file.save("static\\avatar"+ "\\"+filename+".jpg")
            
        return """{}"""

@app.route('/')
def index():
    user_info = session.get('user_info')
    if not user_info:
        del user_info
        return redirect('/login')
    def get_notification(request):
        if request.cookies.get("notification_content") is None:
            return ["通知", "你没有通知"]
        else:
            return [request.cookies.get("notification_title"), request.cookies.get("notification_content")]

    notification = {
        "title": get_notification(request)[0],
        "content": get_notification(request)[1]
    }
    return render_template("index.html", name=user_info, name1=user_info, notification=notification)


@app.route("/api", methods = ["POST"])
def api():
    # print(request.json)
    return jsonify({
    "status": 0,
    "msg": '22',
    "data": {
        "id": 1
    }
})
@app.route("/search")
def search1():
    global path_list
    data = '''{{
            "label": "{0}",
            "value": "{0}"
          }},'''
    data1 = ''
    # print(data.format("ok"))
    for i in path_list:
        data1 += data.format(i)
    return render_template("search.html", data=data1)

@app.route('/forget')
def Forget_the_data():
    session.clear()
    return redirect('/login')



@app.route('/socket')
def websocket():
    if not session.get('user_info'):
        return redirect('/login')
    return render_template("socket.html")  # 调用render_template函数，传入html文件参数


@app.errorhandler(404)
def error(e):
    match_url_numbers = {}
    def string_similar(s1, s2):
        return difflib.SequenceMatcher(None, s1, s2).quick_ratio()
    for i in path_list:
        match_url_numbers[string_similar(i, request.url)] = i
    return render_template("404.html",link=match_url_numbers[max(match_url_numbers.keys())]), 404






if __name__ == '__main__':
    # server = pywsgi.WSGIServer(('0.0.0.0', 5000), app)
    # erver.serve_forever()

    app.run(debug=True, port=5000, host="0.0.0.0")
