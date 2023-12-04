"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from datetime import timedelta
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify, url_for, send_from_directory

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)

@api.route("/sign_up", methods=['POST'])
def create_User():
    try:
        # Obtener los datos del cuerpo de la solicitud
        body = request.get_json()

        # Verificar si se proporciona el campo 'password' en la solicitud
        if 'password' not in body or not body['password']:
            return jsonify({"error": "El campo 'password' es requerido y no puede estar vacío"}), 400

        raw_password = body.get('password')
        password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')

        # Crear el nuevo usuario con la contraseña hasheada
        new_user = User(
            name = body["name"],
            user_name = body["user_name"],
            address = body["address"],
            email = body["email"],
            password = password_hash,
            city = body["city"],
            state = body["state"],
            date = body["date"],
            is_active = True
        )

        # Guardar el nuevo usuario en la base de datos
        db.session.add(new_user)
        db.session.commit()
        
        ok_to_share = {
            "name": body["name"],
            "user_name": body["user_name"],
            "address": body["address"],
            "email": body["email"],
            "city": body["city"],
            "state": body["state"],
            "date": body["date"],
            "is_active": True
        }
        return jsonify ({"msg": "Usuario creado exitosamente", "user_added": ok_to_share}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



