from flask import Blueprint, jsonify, request
from flask_login import current_user,login_required
from app.models import ChannelPost,db
from app.forms import CreatePostForm,UpdatePostForm
# from flask_login import  login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)


# @channel_routes.route('/')
# @login_required
# def channels():
#     user=current_user
#     servers = Channel.query.filter(Channel.admin == user.id).all()
#     return {'servers': [server.to_dict() for server in servers]}


@post_routes.route('/',methods=['GET','POST'])
# @login_required
def create_post():
    # print(f"-------------------{request.method}---------------------------")
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = ChannelPost(
            content = form.data['content'],
            user_id = current_user.id,
            channel_id = form.data['channel_id']
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return "error",401
  
    
@post_routes.route('/<int:id>',methods=['PUT'])
def update_post(id):
    form = UpdatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = ChannelPost.query.get(id)
        post.content = form.data['content']
        db.session.commit()
        return post.to_dict()
    return "error",401

@post_routes.route('/<int:id>',methods=['DELETE'])
def delete_post(id):
    post = ChannelPost.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
