"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from datetime import timedelta
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)
bcrypt = Bcrypt()

CORS(api)

@api.route("/sign_up", methods=['POST'])
def create_User():
    
    body = request.get_json()

    password_hash = bcrypt.generate_password_hash(body.get("password")).decode('utf-8')

    new_user = User(
        name = body.get("name"),
        user_name = body.get("userName"),
        address = body.get("address"),
        email = body.get("email"),
        password = password_hash,
        city = body.get("city"),
        state = body.get("state"),
        date = body.get("date"),
        is_active = True
     )

    db.session.add(new_user)
    db.session.commit()
        
    return jsonify ({"msg": "Usuario creado exitosamente"}), 200

       
@api.route('/user', methods=['GET'])
def get_all_users():
    users = User.query.all()                                        #trae todo
    if len(users) < 1:                                              #verifica que no haya usuarios
        return jsonify({"msg": "not found"}), 404
    serialized_users = list(map(lambda x: x.serialize(), users))    #un mapeo de toda la informacion de user que encuentres
    return serialized_users, 200



