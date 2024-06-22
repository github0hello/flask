import time
from flask import Blueprint
from flask import *
import json
#from PIL import ImageGrab


test_bp = Blueprint("test", __name__)

@test_bp.route('/test')
def test():
    return """
    <form action="/test2">
        <input name="title">
        <input name="content">
        <input type="submit">
    </form>
    """
@test_bp.route("/image2")
def image2():
    im = ImageGrab.grab()
    im.save("static/image/grab.png")
    return render_template("image2.html")
@test_bp.route('/test3')
# @cross_origin(supports_credentials=True)
def hello():
    print(session.get('user_info'))
    return "用户名：{}".format(session.get('user_info'))

@test_bp.route("/mytest", methods=["POST"])

def create_resource():
    if session.get('user_info'):
        return redirect("/login")
    print(request.json)
    with open('file/date.json', 'r') as f:
        d = json.load(f)
    if request.json['name'] != '':
        d[session.get('user_info')]['name'] == request.json['name']
    return jsonify({"message":"good"})

@test_bp.route("/test2", methods=["GET"])
def set_cookie():
    if request.args.get("content") is None and request.args.get("title") is None:
        return abort(404)
    resp = make_response(redirect("/"))
    resp.set_cookie("notification_content", request.args.get("content"), max_age=3600)
    resp.set_cookie("notification_title", request.args.get("title"), max_age=3600)
    return resp
    
@test_bp.route('/test5')
def test5():
    print(request.cookies.__dict__)
    return 'ok'
    
    
@test_bp.route("/onclick")
def click():
    print(request.args.get("x"),request.args.get("y"))


    pyautogui.click(int(request.args.get("x")),int(request.args.get("y")), button=request.args.get("mouse"))
    return ""



