from app.models import db, Member, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_members():
    # server 1 channels
    member1a=Member(
        user_id=1, server_id=1)
    member1b=Member(
        user_id=1, server_id=2)
    member2a=Member(
        user_id=2, server_id=2)   
    member2b=Member(
        user_id=2, server_id=3)   
    member3a=Member(
        user_id=3, server_id=1)
    member3b=Member(
        user_id=3, server_id=3)
    
    db.session.add(member1a)
    db.session.add(member1b)
    db.session.add(member2a)
    db.session.add(member2b)
    db.session.add(member3a)
    db.session.add(member3b)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))
        
    db.session.commit()
