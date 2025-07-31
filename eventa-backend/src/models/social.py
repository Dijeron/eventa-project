from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Friendship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    addressee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, blocked
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    requester = db.relationship('User', foreign_keys=[requester_id], backref=db.backref('sent_friend_requests', lazy=True))
    addressee = db.relationship('User', foreign_keys=[addressee_id], backref=db.backref('received_friend_requests', lazy=True))

    __table_args__ = (db.UniqueConstraint('requester_id', 'addressee_id', name='unique_friendship'),)

    def __repr__(self):
        return f'<Friendship {self.requester_id}->{self.addressee_id} ({self.status})>'

    def to_dict(self):
        return {
            'id': self.id,
            'requester_id': self.requester_id,
            'addressee_id': self.addressee_id,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    message_type = db.Column(db.String(20), default='text')  # text, image, event_invite
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)  # for event invites
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    sender = db.relationship('User', foreign_keys=[sender_id], backref=db.backref('sent_messages', lazy=True))
    recipient = db.relationship('User', foreign_keys=[recipient_id], backref=db.backref('received_messages', lazy=True))
    event = db.relationship('Event', backref=db.backref('message_invites', lazy=True))

    def __repr__(self):
        return f'<Message {self.sender_id}->{self.recipient_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'content': self.content,
            'message_type': self.message_type,
            'event_id': self.event_id,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Bookmark(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('bookmarks', lazy=True))
    event = db.relationship('Event', backref=db.backref('bookmarked_by', lazy=True))

    __table_args__ = (db.UniqueConstraint('user_id', 'event_id', name='unique_user_event_bookmark'),)

    def __repr__(self):
        return f'<Bookmark User:{self.user_id} Event:{self.event_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    display_name = db.Column(db.String(100), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(200), nullable=True)
    interests = db.Column(db.String(500), nullable=True)  # comma-separated categories
    profile_picture_url = db.Column(db.String(500), nullable=True)
    privacy_level = db.Column(db.String(20), default='public')  # public, friends_only, private
    notification_preferences = db.Column(db.String(500), nullable=True)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('profile', uselist=False))

    def __repr__(self):
        return f'<UserProfile {self.user_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'display_name': self.display_name,
            'bio': self.bio,
            'location': self.location,
            'interests': self.interests.split(',') if self.interests else [],
            'profile_picture_url': self.profile_picture_url,
            'privacy_level': self.privacy_level,
            'notification_preferences': self.notification_preferences,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

