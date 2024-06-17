from flask import Blueprint, jsonify,request
from flask_login import current_user,login_required
from app.models import Channel,ChannelPost,db
from app.forms import CreateChannelForm
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


@channel_routes.route("/",methods=['POST'])
def create_channel():
    form = CreateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = Channel(
            label = form.data['label'],
            server_id = form.data['server_id']
        )
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    return form.errors,401
