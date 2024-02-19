from flask import Flask, request, jsonify  
from flask_sqlalchemy import SQLAlchemy  
import bcrypt  
  
app = Flask(__name__)  
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlclient://root:mysql@localhost/test'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
db = SQLAlchemy(app)  
  
# 用户模型  
class User(db.Model):  
    id = db.Column(db.Integer, primary_key=True)  
    username = db.Column(db.String(80), unique=True, nullable=False)  
    password_hash = db.Column(db.String(128), nullable=False)  
    email = db.Column(db.String(120), unique=True, nullable=False)  
    phone = db.Column(db.String(20), unique=True, nullable=False)  
  
    def set_password(self, password):  
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  
  
    def check_password(self, password):  
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))  
  
# 注册新用户  
@app.route('/api/register', methods=['POST'])  
def register():  
    data = request.json  
    username = data.get('username')  
    password = data.get('password')  
    email = data.get('email')  
    phone = data.get('phone')  
  
    # 检查用户名是否已存在  
    if User.query.filter_by(username=username).first():  
        return jsonify({'success': False, 'message': '用户名已存在'}), 409  
  
    # 创建新用户对象并设置密码  
    new_user = User(username=username, email=email, phone=phone)  
    new_user.set_password(password)  
  
    # 添加到数据库  
    db.session.add(new_user)  
    db.session.commit()  
  
    return jsonify({'success': True, 'message': '注册成功'})  
  
# 初始化数据库  
db.create_all()  
  
if __name__ == '__main__':  
    app.run(debug=True)