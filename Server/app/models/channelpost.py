from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelPost(db.Model):
    __tablename__ = 'channelposts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')),nullable=False) #user, foreign Key
    content = db.Column(db.String(255), nullable=False)

    #add foreign key stuff
    users = db.relationship("User",back_populates="channelposts")
    channels = db.relationship("Channel",back_populates="channelposts")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'content':self.content
        }
