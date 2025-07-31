from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.user import User, db
from src.models.social import Friendship, Message, Bookmark, UserProfile
from src.models.event import Event
from datetime import datetime

social_bp = Blueprint('social', __name__)

# Friend Management
@social_bp.route('/friends/request', methods=['POST'])
@cross_origin()
def send_friend_request():
    """Send a friend request"""
    data = request.json
    requester_id = data.get('requester_id')
    addressee_id = data.get('addressee_id')
    
    if not requester_id or not addressee_id:
        return jsonify({'error': 'Both requester_id and addressee_id are required'}), 400
    
    if requester_id == addressee_id:
        return jsonify({'error': 'Cannot send friend request to yourself'}), 400
    
    # Check if friendship already exists
    existing = Friendship.query.filter(
        db.or_(
            db.and_(Friendship.requester_id == requester_id, Friendship.addressee_id == addressee_id),
            db.and_(Friendship.requester_id == addressee_id, Friendship.addressee_id == requester_id)
        )
    ).first()
    
    if existing:
        return jsonify({'error': 'Friendship already exists'}), 400
    
    friendship = Friendship(requester_id=requester_id, addressee_id=addressee_id)
    db.session.add(friendship)
    db.session.commit()
    
    return jsonify(friendship.to_dict()), 201

@social_bp.route('/friends/respond', methods=['POST'])
@cross_origin()
def respond_friend_request():
    """Accept or reject a friend request"""
    data = request.json
    friendship_id = data.get('friendship_id')
    status = data.get('status')  # accepted, rejected
    
    if not friendship_id or status not in ['accepted', 'rejected']:
        return jsonify({'error': 'Invalid friendship_id or status'}), 400
    
    friendship = Friendship.query.get_or_404(friendship_id)
    friendship.status = status
    friendship.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify(friendship.to_dict())

@social_bp.route('/friends/<int:user_id>', methods=['GET'])
@cross_origin()
def get_friends(user_id):
    """Get all friends of a user"""
    friendships = Friendship.query.filter(
        db.and_(
            db.or_(
                Friendship.requester_id == user_id,
                Friendship.addressee_id == user_id
            ),
            Friendship.status == 'accepted'
        )
    ).all()
    
    friends = []
    for friendship in friendships:
        friend_id = friendship.addressee_id if friendship.requester_id == user_id else friendship.requester_id
        friend = User.query.get(friend_id)
        if friend:
            friends.append({
                'friendship_id': friendship.id,
                'friend': friend.to_dict(),
                'since': friendship.updated_at.isoformat() if friendship.updated_at else None
            })
    
    return jsonify(friends)

@social_bp.route('/friends/requests/<int:user_id>', methods=['GET'])
@cross_origin()
def get_friend_requests(user_id):
    """Get pending friend requests for a user"""
    requests = Friendship.query.filter_by(addressee_id=user_id, status='pending').all()
    
    request_list = []
    for req in requests:
        requester = User.query.get(req.requester_id)
        if requester:
            request_list.append({
                'friendship_id': req.id,
                'requester': requester.to_dict(),
                'created_at': req.created_at.isoformat() if req.created_at else None
            })
    
    return jsonify(request_list)

# Messaging
@social_bp.route('/messages', methods=['POST'])
@cross_origin()
def send_message():
    """Send a message"""
    data = request.json
    
    message = Message(
        sender_id=data['sender_id'],
        recipient_id=data['recipient_id'],
        content=data['content'],
        message_type=data.get('message_type', 'text'),
        event_id=data.get('event_id')
    )
    
    db.session.add(message)
    db.session.commit()
    
    return jsonify(message.to_dict()), 201

@social_bp.route('/messages/<int:user_id>', methods=['GET'])
@cross_origin()
def get_messages(user_id):
    """Get messages for a user"""
    other_user_id = request.args.get('other_user_id')
    
    if other_user_id:
        # Get conversation between two users
        messages = Message.query.filter(
            db.or_(
                db.and_(Message.sender_id == user_id, Message.recipient_id == other_user_id),
                db.and_(Message.sender_id == other_user_id, Message.recipient_id == user_id)
            )
        ).order_by(Message.created_at.asc()).all()
    else:
        # Get all messages for user
        messages = Message.query.filter(
            db.or_(Message.sender_id == user_id, Message.recipient_id == user_id)
        ).order_by(Message.created_at.desc()).all()
    
    return jsonify([message.to_dict() for message in messages])

@social_bp.route('/messages/<int:message_id>/read', methods=['PUT'])
@cross_origin()
def mark_message_read(message_id):
    """Mark a message as read"""
    message = Message.query.get_or_404(message_id)
    message.is_read = True
    db.session.commit()
    
    return jsonify(message.to_dict())

# Bookmarks
@social_bp.route('/bookmarks', methods=['POST'])
@cross_origin()
def add_bookmark():
    """Add an event to bookmarks"""
    data = request.json
    user_id = data.get('user_id')
    event_id = data.get('event_id')
    
    if not user_id or not event_id:
        return jsonify({'error': 'Both user_id and event_id are required'}), 400
    
    # Check if bookmark already exists
    existing = Bookmark.query.filter_by(user_id=user_id, event_id=event_id).first()
    if existing:
        return jsonify({'error': 'Event already bookmarked'}), 400
    
    bookmark = Bookmark(user_id=user_id, event_id=event_id)
    db.session.add(bookmark)
    db.session.commit()
    
    return jsonify(bookmark.to_dict()), 201

@social_bp.route('/bookmarks/<int:user_id>', methods=['GET'])
@cross_origin()
def get_bookmarks(user_id):
    """Get all bookmarks for a user"""
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
    
    bookmark_list = []
    for bookmark in bookmarks:
        event = Event.query.get(bookmark.event_id)
        if event:
            bookmark_list.append({
                'bookmark_id': bookmark.id,
                'event': event.to_dict(),
                'bookmarked_at': bookmark.created_at.isoformat() if bookmark.created_at else None
            })
    
    return jsonify(bookmark_list)

@social_bp.route('/bookmarks/<int:bookmark_id>', methods=['DELETE'])
@cross_origin()
def remove_bookmark(bookmark_id):
    """Remove a bookmark"""
    bookmark = Bookmark.query.get_or_404(bookmark_id)
    db.session.delete(bookmark)
    db.session.commit()
    return '', 204

# User Profiles
@social_bp.route('/profile/<int:user_id>', methods=['GET'])
@cross_origin()
def get_profile(user_id):
    """Get user profile"""
    profile = UserProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        # Create default profile if doesn't exist
        user = User.query.get_or_404(user_id)
        profile = UserProfile(user_id=user_id, display_name=user.username)
        db.session.add(profile)
        db.session.commit()
    
    return jsonify(profile.to_dict())

@social_bp.route('/profile/<int:user_id>', methods=['PUT'])
@cross_origin()
def update_profile(user_id):
    """Update user profile"""
    data = request.json
    
    profile = UserProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        profile = UserProfile(user_id=user_id)
        db.session.add(profile)
    
    # Update fields if provided
    for field in ['display_name', 'bio', 'location', 'interests', 'profile_picture_url', 'privacy_level', 'notification_preferences']:
        if field in data:
            if field == 'interests' and isinstance(data[field], list):
                setattr(profile, field, ','.join(data[field]))
            else:
                setattr(profile, field, data[field])
    
    profile.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(profile.to_dict())

# Event Invitations
@social_bp.route('/invitations/send', methods=['POST'])
@cross_origin()
def send_event_invitation():
    """Send event invitation via message"""
    data = request.json
    sender_id = data.get('sender_id')
    recipient_id = data.get('recipient_id')
    event_id = data.get('event_id')
    message_content = data.get('message', 'You have been invited to an event!')
    
    if not all([sender_id, recipient_id, event_id]):
        return jsonify({'error': 'sender_id, recipient_id, and event_id are required'}), 400
    
    # Verify event exists
    event = Event.query.get_or_404(event_id)
    
    message = Message(
        sender_id=sender_id,
        recipient_id=recipient_id,
        content=message_content,
        message_type='event_invite',
        event_id=event_id
    )
    
    db.session.add(message)
    db.session.commit()
    
    return jsonify({
        'message': 'Invitation sent successfully',
        'invitation': message.to_dict()
    }), 201

