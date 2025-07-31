#!/usr/bin/env python3
"""
Database seeding script for Eventa application
Populates the database with sample data for testing and demonstration
"""

import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.models.user import db, User
from src.models.event import Event, RSVP, HelperRequest
from src.models.social import UserProfile, Friendship, Bookmark
from datetime import datetime, timedelta
import random

def seed_users():
    """Create sample users"""
    users_data = [
        {'username': 'alice_events', 'email': 'alice@example.com'},
        {'username': 'bob_organizer', 'email': 'bob@example.com'},
        {'username': 'charlie_music', 'email': 'charlie@example.com'},
        {'username': 'diana_tech', 'email': 'diana@example.com'},
        {'username': 'eve_artist', 'email': 'eve@example.com'},
        {'username': 'frank_foodie', 'email': 'frank@example.com'},
        {'username': 'grace_sports', 'email': 'grace@example.com'},
        {'username': 'henry_social', 'email': 'henry@example.com'},
    ]
    
    users = []
    for user_data in users_data:
        # Check if user already exists
        existing_user = User.query.filter_by(email=user_data['email']).first()
        if not existing_user:
            user = User(**user_data)
            db.session.add(user)
            users.append(user)
        else:
            users.append(existing_user)
    
    db.session.commit()
    return users

def seed_user_profiles(users):
    """Create user profiles"""
    profiles_data = [
        {
            'display_name': 'Alice Johnson',
            'bio': 'Event enthusiast and community organizer. Love bringing people together!',
            'location': 'Sydney, Australia',
            'interests': 'music,social,food'
        },
        {
            'display_name': 'Bob Smith',
            'bio': 'Professional event organizer with 10+ years experience.',
            'location': 'Melbourne, Australia',
            'interests': 'tech,business,networking'
        },
        {
            'display_name': 'Charlie Brown',
            'bio': 'Music lover and DJ. Always looking for the next great concert!',
            'location': 'Brisbane, Australia',
            'interests': 'music,art,culture'
        },
        {
            'display_name': 'Diana Prince',
            'bio': 'Tech professional passionate about innovation and startups.',
            'location': 'Sydney, Australia',
            'interests': 'tech,education,networking'
        },
        {
            'display_name': 'Eve Adams',
            'bio': 'Contemporary artist and gallery curator.',
            'location': 'Melbourne, Australia',
            'interests': 'art,culture,education'
        },
        {
            'display_name': 'Frank Wilson',
            'bio': 'Food blogger and culinary enthusiast.',
            'location': 'Adelaide, Australia',
            'interests': 'food,culture,social'
        },
        {
            'display_name': 'Grace Lee',
            'bio': 'Fitness instructor and sports enthusiast.',
            'location': 'Perth, Australia',
            'interests': 'sports,wellness,social'
        },
        {
            'display_name': 'Henry Davis',
            'bio': 'Community builder and social connector.',
            'location': 'Canberra, Australia',
            'interests': 'social,networking,community'
        }
    ]
    
    for i, profile_data in enumerate(profiles_data):
        if i < len(users):
            existing_profile = UserProfile.query.filter_by(user_id=users[i].id).first()
            if not existing_profile:
                profile = UserProfile(user_id=users[i].id, **profile_data)
                db.session.add(profile)
    
    db.session.commit()

def seed_events(users):
    """Create sample events"""
    events_data = [
        {
            'title': 'Late Night Dinner Experience',
            'description': 'Join us for an unforgettable late night dining experience with live music, gourmet food, and great company. This unique event combines culinary excellence with entertainment in a magical outdoor setting.',
            'date': 'Friday, May 8th 2025',
            'time': '10:00 PM - 2:00 AM',
            'location': 'Wollongong Cemetery',
            'price': '$50',
            'category': 'Music',
            'organizer_name': 'Event Masters',
            'helpers_needed': False,
            'attendees_count': 245
        },
        {
            'title': 'Mother\'s Day Brunch',
            'description': 'Celebrate Mother\'s Day with a special brunch featuring local vendors, family activities, live music, and a beautiful outdoor setting. Perfect for families to come together and honor the special women in their lives.',
            'date': 'Sunday, May 11th 2025',
            'time': '11:00 AM - 3:00 PM',
            'location': 'Wollongong Cemetery',
            'price': 'Free',
            'category': 'Food',
            'organizer_name': 'Community Events',
            'helpers_needed': True,
            'attendees_count': 67
        },
        {
            'title': 'Tech Innovation Summit 2025',
            'description': 'Discover the latest in technology innovation with industry leaders, startup pitches, networking opportunities, and hands-on workshops. Perfect for tech professionals, entrepreneurs, and students.',
            'date': 'Saturday, May 9th 2025',
            'time': '9:00 AM - 6:00 PM',
            'location': 'Innovation Hub, Sydney',
            'price': 'Free',
            'category': 'Tech',
            'organizer_name': 'Tech Community',
            'helpers_needed': True,
            'attendees_count': 156
        },
        {
            'title': 'Contemporary Art Exhibition',
            'description': 'Explore contemporary artworks from emerging and established artists in an elegant gallery setting. Features interactive installations, artist talks, and wine reception.',
            'date': 'Sunday, May 10th 2025',
            'time': '7:00 PM - 11:00 PM',
            'location': 'Modern Art Gallery, Melbourne',
            'price': '$25',
            'category': 'Art',
            'organizer_name': 'Art Collective',
            'helpers_needed': False,
            'attendees_count': 89
        },
        {
            'title': 'Startup Pitch Night',
            'description': 'Watch promising startups pitch their ideas to investors and industry experts. Network with entrepreneurs, learn about new technologies, and discover investment opportunities.',
            'date': 'Thursday, May 15th 2025',
            'time': '6:00 PM - 9:00 PM',
            'location': 'Innovation Hub, Sydney',
            'price': '$15',
            'category': 'Tech',
            'organizer_name': 'Startup Community',
            'helpers_needed': False,
            'attendees_count': 123
        },
        {
            'title': 'Jazz & Wine Evening',
            'description': 'An intimate evening of smooth jazz music paired with premium wines and gourmet appetizers. Featuring local jazz musicians and wine tastings from regional vineyards.',
            'date': 'Friday, May 16th 2025',
            'time': '8:00 PM - 12:00 AM',
            'location': 'Riverside Venue, Brisbane',
            'price': '$45',
            'category': 'Music',
            'organizer_name': 'Jazz Society',
            'helpers_needed': True,
            'attendees_count': 78
        },
        {
            'title': 'Community Sports Day',
            'description': 'Join us for a fun-filled day of sports activities for all ages. Includes basketball, soccer, tennis, and family-friendly games with prizes and refreshments.',
            'date': 'Saturday, May 17th 2025',
            'time': '10:00 AM - 4:00 PM',
            'location': 'Central Park, Adelaide',
            'price': 'Free',
            'category': 'Sports',
            'organizer_name': 'Sports Club',
            'helpers_needed': True,
            'attendees_count': 134
        },
        {
            'title': 'Cooking Workshop: Italian Cuisine',
            'description': 'Learn to cook authentic Italian dishes with professional chef Marco Rossi. Hands-on workshop includes pasta making, sauce preparation, and wine pairing.',
            'date': 'Sunday, May 18th 2025',
            'time': '2:00 PM - 6:00 PM',
            'location': 'Culinary Institute, Perth',
            'price': '$85',
            'category': 'Food',
            'organizer_name': 'Culinary Institute',
            'helpers_needed': False,
            'attendees_count': 24
        },
        {
            'title': 'Wellness Retreat Weekend',
            'description': 'Rejuvenate your mind and body with yoga sessions, meditation workshops, healthy cooking classes, and nature walks in a peaceful mountain setting.',
            'date': 'Saturday-Sunday, May 24-25th 2025',
            'time': '9:00 AM - 5:00 PM',
            'location': 'Mountain Retreat Center, Blue Mountains',
            'price': '$150',
            'category': 'Wellness',
            'organizer_name': 'Wellness Center',
            'helpers_needed': True,
            'attendees_count': 45
        },
        {
            'title': 'Local Business Networking Mixer',
            'description': 'Connect with local business owners, entrepreneurs, and professionals. Includes speed networking, guest speakers, and collaborative opportunities.',
            'date': 'Wednesday, May 21st 2025',
            'time': '6:00 PM - 9:00 PM',
            'location': 'Business Center, Canberra',
            'price': '$20',
            'category': 'Social',
            'organizer_name': 'Business Network',
            'helpers_needed': False,
            'attendees_count': 92
        }
    ]
    
    events = []
    for i, event_data in enumerate(events_data):
        organizer = users[i % len(users)]  # Cycle through users as organizers
        
        existing_event = Event.query.filter_by(title=event_data['title']).first()
        if not existing_event:
            event = Event(
                organizer_id=organizer.id,
                **event_data
            )
            db.session.add(event)
            events.append(event)
        else:
            events.append(existing_event)
    
    db.session.commit()
    return events

def seed_rsvps(users, events):
    """Create sample RSVPs"""
    statuses = ['interested', 'going', 'not_going']
    
    for event in events:
        # Create RSVPs for random users
        num_rsvps = min(random.randint(5, 15), len(users))
        selected_users = random.sample(users, num_rsvps)
        
        for user in selected_users:
            existing_rsvp = RSVP.query.filter_by(user_id=user.id, event_id=event.id).first()
            if not existing_rsvp:
                status = random.choice(statuses)
                rsvp = RSVP(
                    user_id=user.id,
                    event_id=event.id,
                    status=status
                )
                db.session.add(rsvp)
    
    db.session.commit()

def seed_helper_requests(events):
    """Create sample helper requests"""
    helper_requests_data = [
        {
            'title': 'Event Setup Crew',
            'description': 'Help with setting up tables, chairs, and decorations before the event.',
            'helpers_needed': 3,
            'is_paid': False,
            'skills_required': 'Physical work, attention to detail'
        },
        {
            'title': 'Registration Desk Assistant',
            'description': 'Assist with guest check-in and registration at the event entrance.',
            'helpers_needed': 2,
            'is_paid': True,
            'payment_amount': '$20/hour',
            'skills_required': 'Customer service, communication skills'
        },
        {
            'title': 'Photography Assistant',
            'description': 'Help capture event moments and assist the main photographer.',
            'helpers_needed': 1,
            'is_paid': True,
            'payment_amount': '$50',
            'skills_required': 'Basic photography knowledge, own camera preferred'
        },
        {
            'title': 'Food Service Helper',
            'description': 'Assist with food preparation and serving during the event.',
            'helpers_needed': 4,
            'is_paid': False,
            'skills_required': 'Food handling experience preferred'
        }
    ]
    
    # Add helper requests to events that need helpers
    helper_events = [event for event in events if event.helpers_needed]
    
    for event in helper_events[:4]:  # Add to first 4 events that need helpers
        for i, req_data in enumerate(helper_requests_data):
            if i < 2:  # Add 2 helper requests per event
                existing_req = HelperRequest.query.filter_by(
                    event_id=event.id, 
                    title=req_data['title']
                ).first()
                
                if not existing_req:
                    helper_request = HelperRequest(
                        event_id=event.id,
                        **req_data
                    )
                    db.session.add(helper_request)
    
    db.session.commit()

def seed_friendships(users):
    """Create sample friendships"""
    # Create some accepted friendships
    friendship_pairs = [
        (0, 1), (0, 2), (1, 3), (2, 4), (3, 5), (4, 6), (5, 7), (6, 0), (7, 1)
    ]
    
    for requester_idx, addressee_idx in friendship_pairs:
        if requester_idx < len(users) and addressee_idx < len(users):
            existing = Friendship.query.filter(
                db.or_(
                    db.and_(
                        Friendship.requester_id == users[requester_idx].id,
                        Friendship.addressee_id == users[addressee_idx].id
                    ),
                    db.and_(
                        Friendship.requester_id == users[addressee_idx].id,
                        Friendship.addressee_id == users[requester_idx].id
                    )
                )
            ).first()
            
            if not existing:
                friendship = Friendship(
                    requester_id=users[requester_idx].id,
                    addressee_id=users[addressee_idx].id,
                    status='accepted'
                )
                db.session.add(friendship)
    
    db.session.commit()

def seed_bookmarks(users, events):
    """Create sample bookmarks"""
    for user in users[:5]:  # First 5 users bookmark some events
        num_bookmarks = random.randint(2, 5)
        selected_events = random.sample(events, min(num_bookmarks, len(events)))
        
        for event in selected_events:
            existing_bookmark = Bookmark.query.filter_by(
                user_id=user.id, 
                event_id=event.id
            ).first()
            
            if not existing_bookmark:
                bookmark = Bookmark(user_id=user.id, event_id=event.id)
                db.session.add(bookmark)
    
    db.session.commit()

def main():
    """Main seeding function"""
    print("Starting database seeding...")
    
    # Seed users
    print("Seeding users...")
    users = seed_users()
    
    # Seed user profiles
    print("Seeding user profiles...")
    seed_user_profiles(users)
    
    # Seed events
    print("Seeding events...")
    events = seed_events(users)
    
    # Seed RSVPs
    print("Seeding RSVPs...")
    seed_rsvps(users, events)
    
    # Seed helper requests
    print("Seeding helper requests...")
    seed_helper_requests(events)
    
    # Seed friendships
    print("Seeding friendships...")
    seed_friendships(users)
    
    # Seed bookmarks
    print("Seeding bookmarks...")
    seed_bookmarks(users, events)
    
    print("Database seeding completed successfully!")
    print(f"Created {len(users)} users and {len(events)} events")

if __name__ == '__main__':
    from flask import Flask
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        main()

