# To-do List 

> Aplicacion de tareas usando python para crear una rest api.

## Requisitos ✔️
Instala los modulos a utilizar

```bash
pip install Flask-PyMongo Flask
```

O si lo prefieres pues instalar los requisitos

```bash
pip install -r requirements.txt
```

## Rest api 🌎
### Rutas
> /index
***
![alt index](https://github.com/Luis-Blash/to-do-list/blob/master/images/backend/index.png "index")
> GET /tarea
***
![alt get_tarea](https://github.com/Luis-Blash/to-do-list/blob/master/images/backend/get_tarea.png "get_tarea")
> GET /tarea/<id>
***
![alt get_tarea1](https://github.com/Luis-Blash/to-do-list/blob/master/images/backend/get_tarea1.png "Get_tarea1")
> PUT /tarea/<id>
***
![alt put_tarea](https://github.com/Luis-Blash/to-do-list/blob/master/images/backend/put_tarea1.png "put_tarea")
> PUT /tarea-estado/<id>
***
![alt estado_tarea](https://github.com/Luis-Blash/to-do-list/blob/master/images/backend/estado.png "estado_tarea")
> DELETE /tarea/<id>
***
![alt delete_tarea](https://github.com/Luis-Blash/to-do-list/blob/master/images/backend/delete_tarea.png "Delete_tarea")

### Desplegar
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




