from flask import Blueprint, jsonify
from flask_login import current_user,login_required
from app.models import Server, Member, User, Channel
# from flask_login import  login_user, logout_user, login_required

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
# @login_required
def get_servers():
    # user=current_user
    server_member_list = Member.query.filter(Member.user_id == current_user.id).all()
    # print(server_member_list)
    server_list = []
    for server in server_member_list:
        server_list.append(server.id)

    # print(server_list)
    servers = Server.query.filter(Server.id.in_( server_list)).all()
    # servers = Server.query.filter(server_list in Server.id).all()

    return {'servers': [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>/channels')
# @login_required
def get_server(id):
    channels = Channel.query.filter(Channel.server_id == id).all()
    return {'channels':[channel.to_dict() for channel in channels]}
    
    # """
    # Query for a user by id and returns that user in a dictionary
    # """
    # user = User.query.get(id)
    # return user.to_dict()


@server_routes.route('/<int:id>/members')
@login_required
def get_server_members(id):
    members = Member.query.filter(Member.server_id == id).all()
    member_id_list = []
    for member_id in members:
        member_id_list.append(member_id.user_id)
    server_members = User.query.filter(User.id.in_(member_id_list)).all()
    return {'members':[user.to_dict() for user in server_members]}
    
    # """
    # Query for a user by id and returns that user in a dictionary
    # """
    # user = User.query.get(id)
    # return user.to_dict()
