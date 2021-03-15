from cgi import print_environ
from datetime import date, datetime
from itertools import count
from flask import Flask, jsonify, Response, request
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

app.config["MONGO_URI"] = "mongodb://mongo:27017/todolist"
mongo = PyMongo(app)

# Bienvenida
@app.route("/index", methods=['GET'])
@app.route("/", methods=['GET'])
@cross_origin(supports_credentials=True)
def index():
    return jsonify({"mensaje":"Bienvenido a To-do List"})

#POST
@app.route("/tarea", methods=['POST'])
@cross_origin(supports_credentials=True)
def insert_tarea():
    """
    titulo
    descripcion
    estado
    fecha_creacion
    """
    titulo = request.json["titulo"]
    descripcion = request.json["descripcion"]
    estado = True
    fecha = datetime.strptime(datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z"), "%Y-%m-%dT%H:%M:%S.000Z")
    print(fecha)
    fecha_creacion = fecha

    if titulo and descripcion and estado:
        # insertar mongo
        mongo.db.tarea.insert_one({
            "titulo": titulo,
            "descripcion": descripcion,
            "estado": estado,
            "fecha_creacion": fecha_creacion
        })
    
        respuesta =  jsonify({
            "titulo": titulo,
            "descripcion": descripcion,
            "estado": estado,
            "fecha_creacion": fecha_creacion
        })
        respuesta.status_code = 201
        return respuesta
    else:
        return jsonify({"mensaje":"Dato no guardado"})

# GET todos
@app.route("/tarea", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_tareas():
    consulta = mongo.db.tarea.find()
    respuesta = json_util.dumps(consulta)
    return Response(respuesta, mimetype='application/json')

#GET uno
@app.route("/tarea/<id>", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_tarea(id):
    tarea = mongo.db.tarea.find_one({"_id":ObjectId(id)})
    respuesta = json_util.dumps(tarea)
    return Response(respuesta, mimetype='application/json')

# PUT titulo y descripcion
@app.route("/tarea/<id>", methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_tarea(id):
    # consulta 
    titulo =  request.json['titulo']
    descripcion = request.json['descripcion']

    if titulo and descripcion:
        mongo.db.tarea.update_one({'_id': ObjectId(id)}, {'$set':{
            "titulo": titulo,
            "descripcion": descripcion
        }})
        respuesta = jsonify({"mensaje":"tarea modificada"})
        return respuesta
    else:
        return jsonify({"mensaje":"No se pudo actualizar"})

# PUT estado
@app.route("/tarea-estado/<id>", methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_estado(id):
    estado = mongo.db.tarea.find_one({'_id': ObjectId(id)},{"estado":1, "_id":0})
    if estado['estado']:
        estado['estado'] = False
    else: 
        estado['estado'] = True
    mongo.db.tarea.update_one({'_id': ObjectId(id)}, {'$set':{
        "estado": estado['estado']
    }})
    return jsonify({"mensaje":"estado modificado","estado":estado['estado']})

# DELETE tarea
@app.route("/tarea/<id>", methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_tarea(id):
    mongo.db.tarea.delete_one({"_id": ObjectId(id)})
    respuesta = jsonify({"mensaje": "Tarea eliminado "})
    return respuesta

# http 404
@app.errorhandler(404)
@cross_origin(supports_credentials=True)
def not_found(error=None):
    respuesta = jsonify({
        "mensaje":"No se encontro: " + request.url,
        "estado":404
    })
    respuesta.status_code = 404
    return respuesta

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

