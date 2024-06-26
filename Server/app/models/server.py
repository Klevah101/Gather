from .db import db, environment, SCHEMA, add_prefix_for_prod
# from flask_login import UserMixin


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    admin = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id"))) #user, foreign Key
    description = db.Column(db.String(255))
    icon = db.Column(db.String(255))

    #add key stuff
    members = db.relationship("Member",back_populates="servers",cascade="all,delete")
    users = db.relationship("User",back_populates="servers")
    channels = db.relationship("Channel",back_populates="servers",cascade="all,delete")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'admin': self.admin,
            'description':self.description,
            'icon':self.icon
        }
    
    def to_dict_channels(self):
        obj = {}
        for channel in self.channels:
            obj[channel.id] = channel.to_dict()
        return obj
        
    def to_dict_members(self):
        obj = {}
        for member in self.members:
            obj[member.id] = member.to_dict()
        return obj
    
    def to_dict_channel_posts(self):
        obj = {}
        for channel in self.channels:
            for post in channel.channelposts:
                obj[post.id] = post.to_dict()
        return obj


        
