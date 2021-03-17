window.addEventListener('load', ()=>{
    const URL_BACKEND = "http://localhost:5000/";
    // Formulario
    let form = document.getElementById("postFormulario");
    // Evento de formulario
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        let insertJson = {
            "titulo": document.getElementById("titulo_input").value,
            "descripcion":document.getElementById("descripcion_textarea").value
        };
        // Funcion para insertar
        insertForm(insertJson);
        form.reset();
    });
    // Mandar datos fetch
    function insertForm(json) {
        fetch((URL_BACKEND+"tarea"),{
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then((json))
        .then(respuesta => {
            console.log(respuesta)
        });
    }
})