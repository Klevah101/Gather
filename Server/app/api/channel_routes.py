from flask import Blueprint, jsonify
from flask_login import current_user,login_required
from app.models import Channel,ChannelPost
# from flask_login import  login_user, logout_user, login_required

channel_routes = Blueprint('channels', __name__)


# @channel_routes.route('/')
# @login_required
# def channels():
#     user=current_user
#     servers = Channel.query.filter(Channel.admin == user.id).all()
#     return {'servers': [server.to_dict() for server in servers]}


@channel_routes.route('/<int:id>')
@login_required
def get_all_channel_posts(id):
    channel_posts = ChannelPost.query.filter(ChannelPost.channel_id == id)
    
    return {'channelposts':[channel_post.to_dict() for channel_post in channel_posts]}
