# To-do List 

> Aplicacion de tareas usando python para crear una rest api.

## Requisitos ✔️
Instala los modulos a utilizar

```bash
pip install Flask-PyMongo Flask flask-cors python-dotenv
```

O si lo prefieres pues instalar los requisitos

```bash
pip install -r requirements.txt
```

## Rest api 🌎
### Iniciarlo
```bash
flask run --host 0.0.0.0
```
### Rutas
```bash
GET
/index
or
/
```
![alt index](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/index.png "index")

```bash
POST
/tarea
```
![alt insert_tarea](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/insert_tarea.png "post")


```bash
GET
/tarea
```
![alt get_tarea](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/get_tarea.png "get_tarea")


```bash
GET
/tarea/<id>
```
![alt get_tarea1](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/get_tarea1.png "Get_tarea1")


```bash
PUT
/tarea/<id>
```
![alt put_tarea](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/put_tarea.png "put_tarea")


```bash
PUT
/tarea-estado/<id>
```
![alt estado_tarea](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/estado.png "estado_tarea")


```bash
DELETE
/tarea/<id>
```
![alt delete_tarea](https://github.com/Luis-Blash/to-do-list/blob/main/images/backend/delete_tarea.png "Delete_tarea")

## FrontEnd 🖥
### Javascript 
Usando el metodo Fetch que de manera fácil y lógica de obtener recursos de forma asíncrona por la red.
En la carpeta */frontend/javascript*
Se encuentra un archivo el cual hace las peticiones de CRUD, no olvides cambiar el url de donde tomara las peticiones HTTP en los archivos *index.js* y *insertar.js*
```javascript
const URL_BACKEND = "http://localhost:5000/";
```
![alt Desde_js](https://github.com/Luis-Blash/to-do-list/blob/main/images/js/desde_js.png "Desde_js")

## Desplegar 🚀
#### Flask
Para poder desplegar el backend, es dirigir a la carpeta backend, en app.py.
Dar el siguiente comando

```bash
python app.py
```
## Construido con: 🛠

Las herramientas utilizas para su creacion

* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - MicroFramework de python
* [Mongo](https://www.mongodb.com/es) - Base de datos NNoSQL

## Autor
* **Luis Ocampo** - *Programacion backend* - [luisblash3](https://twitter.com/luisblash3)




