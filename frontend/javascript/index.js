window.addEventListener('load',()=>{
    const URL_BACKEND = "http://localhost:5000/";
    // Index
    function index(){
        return fetch(URL_BACKEND,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
    }
    // GET ALL
    function getTodos(){
        return fetch((URL_BACKEND + "tarea"),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
    }
    // PUT estado
    function putEstado(id){
        let url = URL_BACKEND + "tarea-estado/"+id
        return fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
    }
    // PUT Titulo,Descripcion
    function putDatos(id,datos) {
        let url = URL_BACKEND+"tarea/"+id
        return fetch(url,{
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
    }
    // ID
    function peticionID(id,metodo) {
        let url = URL_BACKEND+"tarea/"+id
        return fetch(url,{
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
    }

    // Peticion fetch ----------------------
    let app = document.getElementById("app");
    // Index
    index()
    .then(data => data.json())
    .then(mensaje =>{
        let h1 = document.createElement("h1");
        h1.innerText = mensaje["mensaje"];
        app.append(h1);
        return getTodos();
    })
    // Tareas
    .then(data => data.json())
    .then(tareas => {
        tareasAll(tareas);
    })

    // Creacion de elementos -------------------
    // ver Todas las tareas fetch
    function tareasAll(tareas){
        // div tareas
        let div_todas_tareas = document.getElementById("div_todas_tareas");
        
        // for de tareas
        tareas.forEach(element => {
            // div tareas individual
            let indivual_tareas = document.createElement("div");
            indivual_tareas.className =  "indivual_tareas";
            div_todas_tareas.append(indivual_tareas)
    
            let titulo = document.createElement("h2")
            let fecha = document.createElement("p")
            let estado = document.createElement("button")
            let ver = document.createElement("button")

            indivual_tareas.id = element['_id']['$oid'];
            titulo.innerHTML =  element["titulo"];
            let aux = new Date(element['fecha_creacion']['$date']);
            fecha.innerHTML =  aux.getDate() + "/" + (aux.getMonth()+1)+ "/" + aux.getFullYear();
            estado.innerHTML = tipoEstado(element["estado"])
            ver.innerHTML = "Ver"
    
            indivual_tareas.append(titulo);
            indivual_tareas.append(fecha);
            // div button
            let div_button = document.createElement("div");
            div_button.className = "div_button";
            indivual_tareas.append(div_button);
    
            div_button.append(estado);
            div_button.append(ver);

            id = element['_id']['$oid']
            verDetalles(ver,id);
            cambioEstado(estado,id);
        });
    }
    
    // boton ver fetch
    function verDetalles(boton,id){
        boton.addEventListener('click', ()=>{
            peticionID(id,'GET')
            .then(data => data.json())
            .then(tarea => {
                let form = document.getElementById("putFormulario");
                form.className = "no_ver";
                let ver_tareas = document.getElementById("ver_tareas");
                ver_tareas.classList.remove("no_ver");
                let mensaje_fetch = document.getElementById("mensaje_fetch");
                mensaje_fetch.className = "no_ver";

                let titulo = document.getElementById("h2_titulo");
                let fecha = document.getElementById("span_fecha");
                let descripcion = document.getElementById("p_descripcion");
                let estado = document.getElementById("span_estado");
                let eliminar = document.getElementById("boton_eliminar");
                let editar = document.getElementById("boton_editar");

                titulo.innerHTML =  tarea['titulo'];
                let aux = new Date(tarea['fecha_creacion']['$date']);
                fecha.innerHTML =  aux.getDate() + "/" + aux.getMonth() + "/" + aux.getFullYear();
                descripcion.innerHTML = tarea['descripcion'];
                estado.innerHTML = tipoEstado(tarea["estado"]);
                eliminar.innerHTML = "Eliminar";
                editar.innerHTML = "Editar";

                id = tarea['_id']['$oid'];

                eliminarTarea(eliminar,id);
                editarTarea(editar,id);
            })
        })
    }

    // tipo de estado, activo o desactivado
    function tipoEstado(estado){
        if(estado){
            return "Activo";
        }else{
            return "Acabado";
        }
    }

    // Cambio de estado fetch
    function cambioEstado(boton,id){
        boton.addEventListener('click', ()=>{
            putEstado(id)
            .then(response => response.json())
            .then(respuesta => {
                boton.innerHTML = tipoEstado(respuesta['estado'])
            })
        })
    }
    
    // Eliminar fetch
    function eliminarTarea(boton,id) {
        boton.addEventListener('click', ()=>{
            peticionID(id,'DELETE')
            .then(response => response.json())
            .then(respuesta => {
                let mensaje_fetch = document.getElementById("mensaje_fetch");
                let tarea_vista = document.getElementById(id);
                let form = document.getElementById("putFormulario");
                form.className = "no_ver";
                tarea_vista.remove();
                mensaje_fetch.classList.remove("no_ver");
                mensaje_fetch.innerHTML = respuesta['mensaje'];
                let ver_tareas = document.getElementById("ver_tareas");
                ver_tareas.className = "no_ver";
            })
        })
    }

    // Editar
    const form = document.getElementById("putFormulario");
    function editarTarea(boton,id) {
        boton.addEventListener('click',()=>{
            let form = document.getElementById("putFormulario");
            peticionID(id,'GET')
            .then(data => data.json())
            .then(respuesta => {
                form.classList.remove = "no_ver";
                form.className = "formulario";
                document.getElementById("titulo_input").value = respuesta['titulo'];
                document.getElementById("descripcion_textarea").value = respuesta['descripcion'];
                document.getElementById("sumbitId").value = respuesta['_id']['$oid'];
            })
        });
    }
    // PUT edit
    form.addEventListener("submit",(e)=>{
        //e.preventDefault()
        if(document.getElementById("sumbitId").value != ""){
            let id = document.getElementById("sumbitId").value;
            let datos = {
                "titulo": document.getElementById("titulo_input").value,
                "descripcion": document.getElementById("descripcion_textarea").value
            }
            putDatos(id,datos);
        }
    })
});