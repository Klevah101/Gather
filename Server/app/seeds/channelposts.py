from app.models import db, ChannelPost, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channelposts():
    # server 1 channels
    channelpost1=ChannelPost(
        user_id=1,channel_id=1 ,content="Channel 1 content")
    channelpost2=ChannelPost(
        user_id=1,channel_id=2 ,content="More Channel content")    
    channelpost3=ChannelPost(
        user_id=2,channel_id=3, content="Funny channel content")
    
    db.session.add(channelpost1)
    db.session.add(channelpost2)
    db.session.add(channelpost3)
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
