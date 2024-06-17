from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import ChannelPost




class CreatePostForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    channel_id = IntegerField('channel_id', validators=[DataRequired()])
    # icon = StringField('icon',validators=[])
    pass
