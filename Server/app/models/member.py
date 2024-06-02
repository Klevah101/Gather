from .db import db, environment, SCHEMA, add_prefix_for_prod




class Member(db.Model):
    __tablename__ = 'members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('servers.id'))) # foreign key
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'))) # foreign key
    # admin = db.Column(db.String(40), nullable=False, unique=True)
    # description = db.Column(db.String(255), nullable=False)

    users = db.relationship("User",back_populates="members")
    servers = db.relationship("Server",back_populates="members",lazy='joined')
    

    def to_dict(self):
        return {
            'id': self.id,
            'server_id':self.server_id,
            'user_id': self.user_id
        }
