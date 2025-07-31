from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.String(20), nullable=False, default='Free')
    image_url = db.Column(db.String(500), nullable=True)
    category = db.Column(db.String(50), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    organizer_name = db.Column(db.String(100), nullable=False)
    attendees_count = db.Column(db.Integer, default=0)
    helpers_needed = db.Column(db.Boolean, default=False)
    visibility = db.Column(db.String(20), default='public')  # public, private, invite-only
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    organizer = db.relationship('User', backref=db.backref('organized_events', lazy=True))
    rsvps = db.relationship('RSVP', backref='event', lazy=True, cascade='all, delete-orphan')
    helper_requests = db.relationship('HelperRequest', backref='event', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Event {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'time': self.time,
            'location': self.location,
            'price': self.price,
            'image_url': self.image_url,
            'category': self.category,
            'organizer_id': self.organizer_id,
            'organizer_name': self.organizer_name,
            'attendees_count': self.attendees_count,
            'helpers_needed': self.helpers_needed,
            'visibility': self.visibility,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class RSVP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    status = db.Column(db.String(20), default='interested')  # interested, going, not_going
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('rsvps', lazy=True))

    __table_args__ = (db.UniqueConstraint('user_id', 'event_id', name='unique_user_event_rsvp'),)

    def __repr__(self):
        return f'<RSVP User:{self.user_id} Event:{self.event_id} Status:{self.status}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class HelperRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    helpers_needed = db.Column(db.Integer, default=1)
    is_paid = db.Column(db.Boolean, default=False)
    payment_amount = db.Column(db.String(20), nullable=True)
    skills_required = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    applications = db.relationship('HelperApplication', backref='helper_request', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<HelperRequest {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'title': self.title,
            'description': self.description,
            'helpers_needed': self.helpers_needed,
            'is_paid': self.is_paid,
            'payment_amount': self.payment_amount,
            'skills_required': self.skills_required,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class HelperApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    helper_request_id = db.Column(db.Integer, db.ForeignKey('helper_request.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('helper_applications', lazy=True))

    __table_args__ = (db.UniqueConstraint('helper_request_id', 'user_id', name='unique_user_helper_application'),)

    def __repr__(self):
        return f'<HelperApplication User:{self.user_id} Request:{self.helper_request_id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'helper_request_id': self.helper_request_id,
            'user_id': self.user_id,
            'message': self.message,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

