window.addEventListener("load", () => {
    const URL_BACKEND = "http://localhost:5000/";
    const MENSAJE_FETCH = document.getElementById('mensaje_fetch');
    //Index
    fetch(URL_BACKEND, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    .then((data) => data.json())
    .then((respuesta) => {
        let titulo_api = document.getElementById("titulo_api");
        titulo_api.innerHTML = respuesta["mensaje"];
    }).catch((error) => console.log(error));

    // Insertar fetch
    let formulario_post = document.getElementById("postFormulario");
    formulario_post.addEventListener("submit", (e) => {
        e.preventDefault();
        let datos_formulario = JSON.stringify({
            titulo: document.getElementById("titulo_post").value,
            descripcion: document.getElementById("descripcion_post").value,
        });
        fetch(URL_BACKEND + "tarea", {
            method: "POST",
            body: datos_formulario,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then(data => data.json())
        .then(respuesta => {
            MENSAJE_FETCH.innerHTML = "Se Inserto a la base";
            formulario_post.reset();
        })
        .catch((error) => console.log(error));
    });

    // GET todas las tareas
    fetch(URL_BACKEND+'tarea', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    .then(data => data.json())
    // Aqui se crea la etiquetas de las tareas individuales
    .then(respuesta => {
        respuesta.forEach(element => {
            //id 
            let id = element['_id']['$oid'];
            // Detectar id de la etiqueta todas las tareas 
            let todas_las_tareas = document.getElementById('todas_las_tareas');
            let tareas_individuales = document.createElement('div');
            tareas_individuales.className = 'tareas_individuales';
            tareas_individuales.id = id+"tarea";
            // Agregar tareas individuales a todas_las_tareas
            todas_las_tareas.append(tareas_individuales);
            // Creando etiquetas div
            let titulo_tareas = document.createElement('div');
            titulo_tareas.className = 'titulo_tareas';
            let descripcion_tareas = document.createElement('div');
            descripcion_tareas.className = 'descripcion_tareas';
            let botones = document.createElement('div');
            botones.className = 'botones';
            // Agregar las etiquetas creadas a todas las tareas_individuales
            tareas_individuales.append(titulo_tareas);
            tareas_individuales.append(descripcion_tareas);
            tareas_individuales.append(botones);

            // crear etiquetas que estaran en div titulo tareas
            let h2 = document.createElement('h2');
            let span1 = document.createElement('span');
            // crear etiquetas que estaran en div descripcion tareas
            let p = document.createElement('p');
            // crear etiquetas que estaran en div botones
            let button1 = document.createElement('button');
            let button2 = document.createElement('button');
            let button3 = document.createElement('button');

            h2.innerHTML = element['titulo'];
            let aux = new Date(element['fecha_creacion']['$date']);
            span1.innerHTML = aux.getDate() + "/" + (aux.getMonth()+1)+ "/" + aux.getFullYear();
            // Metodo para poner activado o finalizado
            p.innerHTML = element['descripcion'];

            let estado = tipoEstado(respuesta['estado']);
            button1.innerHTML = "Editar";
            button1.id = id+"1";
            button1.addEventListener('click',()=>{crearFormularioParaEditar(id)});

            button2.id = id+"2";
            button2.innerHTML = estado;
            button2.classList = estado;
            button2.addEventListener('click',()=>{cambioEstado(id)});

            button3.className = "eliminar-boton";
            button3.innerHTML = "Eliminar";
            button3.addEventListener("click",()=>{eliminarTarea(id)});

            
            // agrego a etiquetas a sus respectivos div
            titulo_tareas.append(h2);
            titulo_tareas.append(span1);
            descripcion_tareas.append(p);
            botones.append(button1);
            botones.append(button2);
            botones.append(button3);
        });
    }).catch((error) => console.error(error));


    // Detecta que tipo de estado y en vez de decir true o false, pone un texto
    function tipoEstado(estado){
        if(estado){
            return "Activo";
        }else{
            return "Acabado";
        }
    }

    // Cambio de estado fetch
    function cambioEstado(id){
        fetch(URL_BACKEND+'tarea-estado/'+id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        .then(response => response.json())
        .then(respuesta => {
            let estado = tipoEstado(respuesta['estado']);
            let boton = document.getElementById((id+"2"));
            boton.innerHTML = estado;
            boton.className = estado;
        }).catch((error) => console.error(error));
    }
    // Crear Formulario Editar
    function crearFormularioParaEditar(id){
        fetch(URL_BACKEND+'tarea/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        .then(data => data.json())
        .then(respuesta => {
            // Donde se crear el formulario
            let tareas_individual = document.getElementById((id+"formulario"));
            if(document.getElementById(id+'put') == null){
                // Crear etiquetas
                let formulario_put = document.createElement('form');
                let titulo_put =  document.createElement('input');
                let descripcion_put =  document.createElement('input');
                let boton_put =  document.createElement('button');
                // detalles
                formulario_put.id = id+"put";
                titulo_put.id = id+"titulo";
                descripcion_put.id = id+"descripcion";
                titulo_put.type = 'text';
                titulo_put.value = respuesta['titulo'];
                descripcion_put.type = 'text';
                descripcion_put.value = respuesta['descripcion'];
                boton_put.type = "submit";
                boton_put.innerHTML = "Editar";
                formulario_put.addEventListener('submit',(e)=>{editarTarea(id)});
                // agregar a la etiqueta
                formulario_put.append(titulo_put);
                formulario_put.append(descripcion_put);
                formulario_put.append(boton_put);
                tareas_individual.append(formulario_put);
            }else{
                tareas_individual.removeChild(document.getElementById(id+'put'));
            }
        }).catch((error) => console.error(error));
    }
    // editar Fetch
    function editarTarea(id){
        let datos_formulario = JSON.stringify({
            titulo: document.getElementById(id+"titulo").value,
            descripcion: document.getElementById(id+"descripcion").value,
        });
        fetch(URL_BACKEND+"tarea/"+id,{
            method: 'PUT',
            body: datos_formulario,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        .then(data => data.json())
        .then(respuesta => {
            MENSAJE_FETCH.innerHTML = respuesta['mensaje'];
        }).catch((error) => console.error(error));
    }

    // Eliminar fetch
    function eliminarTarea(id) {
        fetch(URL_BACKEND+"tarea/"+id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then(data => data.json())
        .then(respuesta => {
            MENSAJE_FETCH.innerHTML = respuesta['mensaje'];
            let eliminar = document.getElementById(id+"tarea");
            eliminar.remove();
        }).catch((error) => console.error(error));
    }
});
