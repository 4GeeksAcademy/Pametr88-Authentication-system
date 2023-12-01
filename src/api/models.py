from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    state = db.Column(db.String(50), unique=True, nullable=False)
    city = db.Column(db.String(50), unique=True, nullable=False)
    date_of_birth = db.Column(db.Date, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_name": self.user_name,
            "address": self.address,
            "email": self.email,
            "date_of_birth": self.date_of_birth.strftime('%Y-%m-%d %H:%M:%S'),
            "state": self.state,
            "city": self.city,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }