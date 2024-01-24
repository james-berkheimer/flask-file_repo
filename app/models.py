import datetime
from flask import current_app
from app import db
from config import Config

class ImageData(db.Model):
    __tablename__ = 'imagedata'
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    image_name = db.Column(db.Text)
    image_path = db.Column(db.Text)
    
    def __repr__(self):
        return '<Image Data: {}, {}, {}>'.format(self.image_name, self.image_path, self.created_date)
