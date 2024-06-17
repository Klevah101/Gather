from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import ChannelPost




class UpdateServerForm(FlaskForm):
    description= StringField('description', validators=[DataRequired()])
    name= StringField('name', validators=[DataRequired()])
    icon= StringField('icon', validators=[])
    
