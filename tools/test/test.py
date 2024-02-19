from flask import *
from flask_sqlalchemy import SQLAlchemy  
import bcrypt  


app = Flask(__name__)  
  
# 配置数据库  
app.config['SQLALCHEMY_DATABASE_URI'] =  'mysql+pymysql://root:mysql@localhost:3306/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "test"
# 让迁移工具和程序实例app、sqlalchemy实例关联

db = SQLAlchemy(app)
# 定义用户模型  
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

@app.route('/api/register', methods=['POST'])  
def register():  
    data = request.json  
    username = data.get('username')  
    password = data.get('password')  
    # email = data.get('email')  
    # phone = data.get('phone') 
    sex = data.get("sex")
  
    # 检查用户是否已存在  
    if User.query.filter_by(username=username).first():  
        return jsonify({'success': False, 'message': '用户名已存在'}), 409

    
  
    # 哈希密码  
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  
  
    # 创建新用户并保存到数据库  
    new_user = User(username=username.encode("gbk"), password_hash=hashed_password, sex=sex)  
    db.session.add(new_user)  
    db.session.commit()  
  
    return jsonify({'success': True, 'message': '注册成功'})

# @app.route("/get",methods=['POST'])
# def get_date():
#     a = User.query.filter_by(username="6116").first().password_hash
#     print(bcrypt.checkpw(a.encode('utf-8'), a.encode('utf-8')))
#     date = request.form.get("name")
#     print(date)
#     return date


  

  
# 登录路由  
@app.route('/login', methods=['POST'])  
def login():  
    data = request.json  
    username = data.get('name')  
    password = data.get('password')  
    print(username,password)
  
    # 从数据库中查询用户  
    user = User.query.filter_by(username=username).first()  
  
    # 检查用户是否存在以及密码是否正确  
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):  
        # 设置用户会话，例如将用户ID存储在session中  
        session['user_id'] = user.id  
        return jsonify({'success': True, 'message': '登录成功'})  
    else:  
        # 登录失败，返回错误信息  
        if not user:
            return jsonify({'success': False, 'message': '用户名错误'}), 401 
        else:
            return jsonify({'success': False, 'message': '密码错误'}), 401 
  


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)