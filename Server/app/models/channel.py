from .db import db, environment, SCHEMA, add_prefix_for_prod




class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('servers.id'))) # foreign key
    label = db.Column(db.String(40), nullable=False)
    # admin = db.Column(db.String(40), nullable=False, unique=True)
    # description = db.Column(db.String(255), nullable=False)

    channelposts = db.relationship("ChannelPost",back_populates="channels")
    servers = db.relationship("Server",back_populates="channels")

    def to_dict(self):
        return {
            'id': self.id,
            'server_id':self.server_id,
            'label': self.label
        }
