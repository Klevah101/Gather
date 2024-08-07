from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels():
    # server 1 channels
    channel1=Channel(
        server_id=1, label="Demo Channel 1")
    channel2=Channel(
        server_id=1, label="Demo Channel 2")    
    channel3=Channel(
        server_id=1, label="Demo Channel 3")
    
    channel4=Channel(
        server_id=2, label="server 2 Demo Channel 1")
    channel5=Channel(
        server_id=3, label="server 2 Demo Channel 1")
    
    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))
        
    db.session.commit()
