from . import my_file_bp
from flask import *
from flask import abort
import os
import shutil
from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter


@my_file_bp.route('/mobile/<name>', methods=['GET', 'POST'])
def mobile(name):
    if not session.get('user_info'):
        return redirect('/login')
    if session.get('mobile_have_visited') is None:
        session['name'] = name
        return redirect('/choose_the_file/mobile')
    print(session.get('path2'))
    print(session['path'] + '/' + name,session['path2'] + '/'+name)
    shutil.move(session['path'] + '/' + name,session['path2'] + '/'+name) #移动文件 源文件 移动后文件
    session.pop('mobile_have_visited',None)
    return redirect('/my_file')
             
             
@my_file_bp.route('/del_file/<name>')
def delfile(name):
    if not session.get('user_info'):
        return redirect('/login')
    # 登录验证
    if not os.path.isfile(session['path'] + '/' + name):
        return redirect('/my_file')
    os.remove(session['path'] + '/' + name)
    return redirect('/my_file')

@my_file_bp.route('/add_dir', methods=['GET', 'POST'])
def add_dir():
    if not session.get('user_info'):
        return redirect('/login')
    if request.method == 'POST':
        os.mkdir(session['path']+'/'+request.form.get('name'))
        return redirect('/my_file')
    else:
        return redirect('/static/html/add_dir.html')
@my_file_bp.route('/rename', methods=['GET', 'POST'])
def rename():
    if request.method == 'POST':
        os.rename(session['path'] + '/' + request.form.get('name'),session['path'] + '/' + request.form.get('new'))
        return redirect('/my_file')
    filePath = session['path']
    date = ''
    for i in os.listdir(filePath):
        if os.path.isfile(filePath +'/'+ i):
            date += '<option>{}</option>'.format(i)
    return open('static/html/rename.html').read().format(date)


 

@my_file_bp.route('/date/<user>/<file>/<ftype>', methods=['GET'])
def get_file(user, file, ftype):
    filePath = session['path']
    if not session.get('user_info'):
        return redirect('/login')
    if user == session['user_info']:
        if ftype == "download":
            return send_file(filePath+'/'+file, as_attachment=True)
        else:
            print(file)
            if file.split(".")[-1] == "py":
                with open(filePath+'/'+file, encoding="utf-8") as f:
                    code = f.read()
                
                # 设置高亮样式，这里使用默认的'default'样式
                formatter = HtmlFormatter()
                
                # 高亮代码
                html = highlight(code, PythonLexer(), formatter)
                
                # 打印出转换后的HTML

                return render_template("code.html", code=html)
            
        
            else: 
                return send_file(filePath+'/'+file)
    else:
         abort(401, 'Authentication required')
         
@my_file_bp.route('/dir/<name>')
def dir(name):
    if not session.get('user_info'):
        return redirect('/login')
    if name == 'up':
        if len(session['path'].split('/')) == 2:
            pass
        else:
            print(session['path'][0:len(session['path'].split('/')[-1]) - 1])
            session['path'] = session['path'][0:-len(session['path'].split('/')[-1]) - 1]
    elif not os.path.isdir(session['path'] + '/'+name):
        return '错误'
    else:
        session['path'] += '/'+name
    print(session['path'])
    return redirect('/my_file')
  
@my_file_bp.route('/dir2/<name>')
def dir2(name):
    if not session.get('user_info'):
        return redirect('/login')
    if name == 'up':
        if len(session['path2'].split('/')) == 2:
            pass
        else:
            print(session['path2'][0:len(session['path2'].split('/')[-1]) - 1])
            session['path2'] = session['path2'][0:-len(session['path2'].split('/')[-1]) - 1]
    elif not os.path.isdir(session['path2'] + '/'+name):
        return '错误'
    else:
        session['path2'] += '/'+name
    print(session['path2'])
    return redirect('/choose_the_file/'+session['isfrom'])
    
        
@my_file_bp.route('/my_file')
def file():  
     
    if not session.get('user_info'):
        return redirect('/login')
    idname = 'aa'
    filePath = session['path']
    if len(session['path'].split('/')) == 2:
        on_a = "#"
    else:
        on_a = "/dir/up"
    files = ''
    for i in os.listdir(filePath):
        if os.path.isfile(filePath +'/'+ i):
            html = """
                    <div class="dropdown">
      <button type="button" class="list-group-item list-group-item-action dropdown-toggle" data-bs-toggle="dropdown">
        <img src="/static/image/003.jpg" width="25" height="25">{0}
      </button>
      <ul class="dropdown-menu">
        <li><h5 class="dropdown-header">{0}</h5></li>
        <li><hr class="dropdown-divider"></hr></li>
        <li><a class="dropdown-item" href="/date/{1}/{0}/see">查看</a></li>
        <li><a class="dropdown-item" href="/date/{1}/{0}/download">下载</a></li>
        <li><a class="dropdown-item" href="/del_file/{0}">删除</a></li>
        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#rename" onclick="open_the_rename_modal_box('{0}')">重命名</a></li>
        <li><a class="dropdown-item" href="/mobile/{0}">移动</a></li>
      </ul>
</div>


            """
            
            files += html.format(i, session['user_info'],idname)   
            idname += "a"
    for filename in os.listdir(filePath):
        if os.path.isdir(filePath+'/'+filename):
            files += '<a href="/dir/{0}" class="list-group-item list-group-item-action"><img src="/static/image/002.jpg" width="25" height="25">{0}</a>'.format(filename)
    return render_template("my_file.html", last=on_a, files=files,user_name=session["user_info"])
    
    
    
   
@my_file_bp.route('/choose_the_file/<_from>')
def choose_the_file(_from):
    if not session.get('user_info'):
        return redirect('/login')
    session['isfrom'] = _from
    filePath = session['path2']
    if len(session['path2'].split('/')) == 2:
        on_a = '<a href="#" class="btn btn-primary" role="button">上一个</a>'
    else:
        on_a = '<a href="/dir2/up" class="btn btn-primary" role="button">上一个</a>'
    files = ''
    for filename in os.listdir(filePath):
        if os.path.isdir(filePath+'/'+filename):
            files += '<a href="/dir2/{0}" class="list-group-item list-group-item-action"><img src="/static/image/002.jpg" width="25" height="25">{0}</a>'.format(filename)
  
    return render_template("my_file2.html", last=on_a, files=files,from_=_from,name=session['name'])
    
