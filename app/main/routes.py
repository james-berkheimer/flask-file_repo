from flask import render_template, flash, redirect, url_for, request, g, \
    jsonify, json, current_app
from app import db, images
from app.main.forms import UploadForm
from app.main import bp
from app.models import ImageData
from config import Config



@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
def upload_file():
    form = UploadForm()
    if form.validate_on_submit():
        filename = images.save(form.uploaded_image.data)
        print (filename)
        file_url = images.url(filename)
        print (file_url)
        newImage = ImageData(image_name=filename, image_path=file_url)
        db.session.add(newImage)
        db.session.commit()
    else:
        file_url = None
    return render_template('index.html', title=('Image Upload'), form=form, file_url=file_url)