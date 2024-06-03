from app.models import db, ChannelPost, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channelposts():
    channel1post1=ChannelPost(
        user_id=1,channel_id=1 ,content="Channel 1 content")
    channel1post2=ChannelPost(
        user_id=1,channel_id=1 ,content="More Content for Channel 1")
    channel1post3=ChannelPost(
        user_id=2,channel_id=1 ,content="Content for Channel 1 from a 2nd user")
    
    channel2post1=ChannelPost(
        user_id=1,channel_id=2 ,content="More Channel content")   
     
    channel3post1=ChannelPost(
        user_id=2,channel_id=3, content="Funny channel content")
    
    channel4post1=ChannelPost(
        user_id=2,channel_id=4, content="Funner channel content")
    
    db.session.add(channel1post1)
    db.session.add(channel1post2)
    db.session.add(channel1post3)

    db.session.add(channel2post1)
    
    db.session.add(channel3post1)

    db.session.add(channel4post1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channelposts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channelposts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channelposts"))
        
    db.session.commit()
