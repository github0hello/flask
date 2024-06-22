from . import login_bp
from flask import *
import os

@login_bp.route("/login/register_root", methods=['GET', 'POST'])
def register_root():
    global d
    rname = 'root'
    rpassword = '123456'
    if request.method == 'POST':
        if (request.form['name'] == rname) and (request.form['pswd'] == rpassword):
            if session['name'] in d:
                return '用户名已存在'
            d[session['name']] = session['password']
            with open("file/date.json", 'w') as f:
                json.dump(d, f)
            with open('file/date.json', 'r') as f:
                d = json.load(f)
            path = 'date/'
            os.mkdir(path + session['name'])
            return redirect('/login')
    return html2


@login_bp.route("/login_for_root", methods=['GET', 'POST'])
def login_root():
    rname = 'root'
    rpassword = '123456'
    if request.method == 'POST':
        if request.form['name'] == rname and rpassword == request.form['pswd']:
            session['root_name'] = request.form['name']
            session['root_password'] = request.form['pswd']
            return redirect('/static/app/root/index.html')
        else:
            return '错误'

    return html3


html2 = open('blueprint/login/login/html3.html', encoding="utf-8").read()
html3 = open('blueprint/login/login/html4.html', encoding="utf-8").read()