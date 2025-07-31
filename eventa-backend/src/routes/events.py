from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.user import User, db
from src.models.event import Event, RSVP, HelperRequest, HelperApplication
from datetime import datetime

events_bp = Blueprint('events', __name__)

@events_bp.route('/events', methods=['GET'])
@cross_origin()
def get_events():
    """Get all events with optional filtering"""
    category = request.args.get('category')
    search = request.args.get('search')
    location = request.args.get('location')
    helpers_needed = request.args.get('helpers_needed')
    price_filter = request.args.get('price_filter')  # free, paid
    
    query = Event.query.filter_by(visibility='public')
    
    if category and category != 'all':
        query = query.filter(Event.category.ilike(f'%{category}%'))
    
    if search:
        query = query.filter(
            db.or_(
                Event.title.ilike(f'%{search}%'),
                Event.description.ilike(f'%{search}%'),
                Event.location.ilike(f'%{search}%')
            )
        )
    
    if location:
        query = query.filter(Event.location.ilike(f'%{location}%'))
    
    if helpers_needed == 'true':
        query = query.filter(Event.helpers_needed == True)
    
    if price_filter == 'free':
        query = query.filter(Event.price.ilike('free'))
    elif price_filter == 'paid':
        query = query.filter(~Event.price.ilike('free'))
    
    events = query.order_by(Event.created_at.desc()).all()
    return jsonify([event.to_dict() for event in events])

@events_bp.route('/events', methods=['POST'])
@cross_origin()
def create_event():
    """Create a new event"""
    data = request.json
    
    # Validate required fields
    required_fields = ['title', 'date', 'time', 'location', 'category', 'organizer_id', 'organizer_name']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    event = Event(
        title=data['title'],
        description=data.get('description', ''),
        date=data['date'],
        time=data['time'],
        location=data['location'],
        price=data.get('price', 'Free'),
        image_url=data.get('image_url'),
        category=data['category'],
        organizer_id=data['organizer_id'],
        organizer_name=data['organizer_name'],
        helpers_needed=data.get('helpers_needed', False),
        visibility=data.get('visibility', 'public')
    )
    
    db.session.add(event)
    db.session.commit()
    
    return jsonify(event.to_dict()), 201

@events_bp.route('/events/<int:event_id>', methods=['GET'])
@cross_origin()
def get_event(event_id):
    """Get a specific event by ID"""
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

@events_bp.route('/events/<int:event_id>', methods=['PUT'])
@cross_origin()
def update_event(event_id):
    """Update an event"""
    event = Event.query.get_or_404(event_id)
    data = request.json
    
    # Update fields if provided
    for field in ['title', 'description', 'date', 'time', 'location', 'price', 'image_url', 'category', 'helpers_needed', 'visibility']:
        if field in data:
            setattr(event, field, data[field])
    
    event.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(event.to_dict())

@events_bp.route('/events/<int:event_id>', methods=['DELETE'])
@cross_origin()
def delete_event(event_id):
    """Delete an event"""
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return '', 204

@events_bp.route('/events/<int:event_id>/rsvp', methods=['POST'])
@cross_origin()
def rsvp_event(event_id):
    """RSVP to an event"""
    data = request.json
    user_id = data.get('user_id')
    status = data.get('status', 'interested')  # interested, going, not_going
    
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    
    # Check if RSVP already exists
    existing_rsvp = RSVP.query.filter_by(user_id=user_id, event_id=event_id).first()
    
    if existing_rsvp:
        existing_rsvp.status = status
    else:
        rsvp = RSVP(user_id=user_id, event_id=event_id, status=status)
        db.session.add(rsvp)
    
    # Update attendees count
    event = Event.query.get(event_id)
    if event:
        going_count = RSVP.query.filter_by(event_id=event_id, status='going').count()
        event.attendees_count = going_count
    
    db.session.commit()
    
    return jsonify({'message': 'RSVP updated successfully'}), 200

@events_bp.route('/events/<int:event_id>/rsvps', methods=['GET'])
@cross_origin()
def get_event_rsvps(event_id):
    """Get all RSVPs for an event"""
    rsvps = RSVP.query.filter_by(event_id=event_id).all()
    return jsonify([rsvp.to_dict() for rsvp in rsvps])

@events_bp.route('/events/trending', methods=['GET'])
@cross_origin()
def get_trending_events():
    """Get trending events based on attendees count"""
    events = Event.query.filter_by(visibility='public').order_by(Event.attendees_count.desc()).limit(10).all()
    return jsonify([event.to_dict() for event in events])

@events_bp.route('/events/categories', methods=['GET'])
@cross_origin()
def get_categories():
    """Get all event categories"""
    categories = db.session.query(Event.category).distinct().all()
    category_list = [cat[0] for cat in categories if cat[0]]
    return jsonify(category_list)

@events_bp.route('/events/<int:event_id>/helpers', methods=['GET'])
@cross_origin()
def get_helper_requests(event_id):
    """Get helper requests for an event"""
    helper_requests = HelperRequest.query.filter_by(event_id=event_id).all()
    return jsonify([req.to_dict() for req in helper_requests])

@events_bp.route('/events/<int:event_id>/helpers', methods=['POST'])
@cross_origin()
def create_helper_request(event_id):
    """Create a helper request for an event"""
    data = request.json
    
    helper_request = HelperRequest(
        event_id=event_id,
        title=data['title'],
        description=data.get('description', ''),
        helpers_needed=data.get('helpers_needed', 1),
        is_paid=data.get('is_paid', False),
        payment_amount=data.get('payment_amount'),
        skills_required=data.get('skills_required')
    )
    
    db.session.add(helper_request)
    db.session.commit()
    
    return jsonify(helper_request.to_dict()), 201

