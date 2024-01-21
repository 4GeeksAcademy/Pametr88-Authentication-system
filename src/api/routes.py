"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from datetime import timedelta
from flask_jwt_extended import  create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

CORS(api)

@api.route("/sign_up", methods=['POST'])
def create_User():
    try:
        body = request.get_json()
        print(body)
        required_fields=["userName", "email", "password"]
        for field in required_fields:
            if field not in body or not body[field]:
                return jsonify({"error": f"El campo '{field}' es requerido y no puede estar vacío"}), 400
            
        raw_password = body.get('password')        
        password_hash = bcrypt.generate_password_hash(body.get("password")).decode('utf-8')
    
        new_user = User(
            name = body.get("name"),
            user_name = body.get("userName"),
            address = body.get("address"),
            email = body.get("email"),
            password = password_hash,
            city = body.get("city"),
            state = body.get("state"),
            # date = body.get("date"),
            is_active = True
        )

        db.session.add(new_user)
        db.session.commit()
        
        return jsonify ({"msg": "Usuario creado exitosamente"}), 200
    
    except Exception as e:
        current_app.logger.error(f"Error al crear usuario: {str(e)}")

        return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500


@api.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"error": "Se requieren tanto el correo electrónico como la contraseña."}), 400
        
        email = data.get('email')
        password = data.get('password')

        # if not email or not password:
        #     return jsonify({"error": "Faltó algún dato en el cuerpo de la solicitud."}), 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Usuario no encontrado."}), 404

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Contraseña incorrecta."}), 401

        access_token = create_access_token(identity=user.id)

        return jsonify({"access_token": access_token, "user": user.serialize()}), 200

    except Exception as e:
        print(f"Error en la ruta /login: {str(e)}")

        return jsonify({"error": f"Ocurrió un error al procesar la solicitud: {str(e)}"}), 500

@api.route('/users', methods=['GET'])
def users():
    users = User.query.all()
    if users:
        serialized_users = [user.serialize() for user in users]
        return jsonify(serialized_users), 200
    else:
        return jsonify({"msg": "No users found"}), 404

@api.route('/isAuth', methods=['GET'])
@jwt_required()
def is_auth():
    user_id=get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return False, 404
    return jsonify(user.serialize()), 200


       
# @api.route('/user', methods=['GET'])
# def get_all_users():
#     users = User.query.all()                                        #trae todo
#     if len(users) < 1:                                              #verifica que no haya usuarios
#         return jsonify({"msg": "not found"}), 404
#     serialized_users = list(map(lambda x: x.serialize(), users))    #un mapeo de toda la informacion de user que encuentres
#     return serialized_users, 200



