window.addEventListener('load',()=>{
    // GET todos
    function getTodos(){
        return fetch("http://localhost:200/tarea",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
    }

    // Peticion index
    fetch("http://localhost:200",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
    .then(data => data.json())
    .then(tareas =>{
        console.log(tareas)
    })

    getTodos()
    .then(data => data.json())
    .then(tareas =>{
        console.log(tareas)
    })
    
});