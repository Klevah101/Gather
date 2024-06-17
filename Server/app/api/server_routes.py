from flask import Blueprint, jsonify ,request
from flask_login import current_user,login_required
from app.models import Server, Member, User, Channel,db
from app.forms import CreateServerForm
from app.forms import CreateChannelForm
from app.forms import UpdateServerForm
# from flask_login import  login_user, logout_user, login_required

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def get_servers():
    # user=current_user   
    print(current_user)
    if current_user is not None:
        server_member_list = Member.query.filter(Member.user_id == current_user.id).all()
        # print(server_member_list)
        server_list = []
        for member in server_member_list:
            server_list.append(member.server_id)

        print(server_list)
        servers = Server.query.filter(Server.id.in_( server_list)).all()
    # servers = Server.query.filter(server_list in Server.id).all()

        return {'servers': [server.to_dict() for server in servers]}
    else:      
        return {'message': "no current user"}

@server_routes.route('/<int:id>',methods=["PUT"])
def update_server(id):
    form = UpdateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server.query.get(id)
        server.description = form.data['description']
        server.name = form.data['name']
        server.icon = form.data['icon'] if form.data['icon'] is not None else "" 
        db.session.commit()
        return server.to_dict()
    else:
        return 401


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
    for member in members:
        member_id_list.append(member.user_id)
    server_members = User.query.filter(User.id.in_(member_id_list)).all()
    return {'members':[user.to_dict() for user in server_members]}
    
    # """
    # Query for a user by id and returns that user in a dictionary
    # """
    # user = User.query.get(id)
    # return user.to_dict()

@server_routes.route('/all')
def get_all_servers():
    servers = Server.query.all()
    return {'servers':[server.to_dict() for server in servers]}

@server_routes.route('/<int:id>/members',methods=['POST'])
def add_member_to_server(id):
    member = Member(
        user_id = current_user.id,
        server_id=id)
    db.session.add(member)
    db.session.commit()
    return member.to_dict()

@server_routes.route('/',methods=['POST'])
def create_server():
    form = CreateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_server = Server(
            name = form.data['name'],
            description = form.data['description'],
            icon = form.data['icon'],
            admin = current_user.id
        )
        db.session.add(new_server)
        db.session.commit()

        created_server = Server.query.filter(Server.name == form.data['name']).first()
        new_member = Member(
            user_id = current_user.id,
            server_id = created_server.id
        )

        welcome_channel = Channel(
            server_id = created_server.id,
            label = 'Welcome, Say hi :)'
        )
    
        db.session.add(new_member)
        db.session.add(welcome_channel)
        db.session.commit()
        return new_server.to_dict()
    return form.errors,401


@server_routes.route('<int:id>',methods=['DELETE'])
def delete_server(id):
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return {"message":"success"}
