from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import ChannelPost




class UpdatePostForm(FlaskForm):
   content= StringField('content', validators=[DataRequired()])
    # name= StringField('name', validators=[DataRequired()])
