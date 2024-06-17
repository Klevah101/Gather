from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_servers():
    server1 = Server(
        name="Demo Server 1", admin=1, description="description",icon="placeholder icon")
    server2 = Server(
        name="Demo Sever 2", admin=2,description="description",icon="placeholder icon")
    server3 = Server(
        name="Demo Server 3", admin=3, description="description",icon="placeholder icon")

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
        
    db.session.commit()
