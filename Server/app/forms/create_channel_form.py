from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Channel



class CreateChannelForm(FlaskForm):
    label = StringField('label', validators=[DataRequired()])
    server_id = StringField('server_id', validators=[DataRequired()])
