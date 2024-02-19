from . import upload_bp
from flask import *
from werkzeug.utils import secure_filename
import os



@upload_bp.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        files = request.files.getlist('txt_file')
        for file in files:
            filename = file.filename
            file.save(os.path.join(session['path'], filename))
        return """{}"""
    return open('blueprint/upload/upload.html',encoding="utf-8").read()