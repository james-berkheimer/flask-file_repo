from datetime import datetime
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField
from app import images

class UploadForm(FlaskForm):
    uploaded_image = FileField('Add Image', validators=[FileRequired(), FileAllowed(images, 'Images only!')])
    submit = SubmitField('Upload')