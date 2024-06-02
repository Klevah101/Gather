from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import User,Server

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def get_users():
    user = User.query.get(current_user.id)
    return user.to_dict()
    # return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def get_user(id):
    print(f'this is the id {id}')
    user = User.query.get(id)
    if user is None:
        print("User is none")
        return "no user"
    return user.to_dict()
    # return id

@user_routes.route('/<int:id>/servers')
@login_required
def get_user_servers_by_userid():
    user=current_user
    servers = Server.query.filter(Server.admin == user.id).all()
    return {'servers': [server.to_dict() for server in servers]}

@user_routes.route('/<int:id>/servers/<int:server_id>')
@login_required
def get_user_server_by_serverid():
    user=current_user
    servers = Server.query.filter(Server.admin == user.id).all()
    return {'servers': [server.to_dict() for server in servers]}
