from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(40))
    lastname = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar =db.Column(db.String(255))#should be URL
    hashed_password = db.Column(db.String(255), nullable=False)
    members = db.relationship("Member",back_populates="users")
    servers = db.relationship("Server",back_populates="users")
    channelposts = db.relationship("ChannelPost",back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname':self.firstname,
            'lastname':self.lastname,
            'avatar':self.avatar,
            'email': self.email
        }
