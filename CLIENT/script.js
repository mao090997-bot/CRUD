const API = 'http://192.168.2.12:3000';

document.addEventListener('DOMContentLoaded', () => {

    cargarTareas();

    cargarSelectUsuarios();

    
    document.getElementById('formTarea')
        .addEventListener('submit', crearTarea);

    document.getElementById('tablaTareas')
        .addEventListener('click', eliminarTarea);

    document.getElementById('tablaTareas')
        .addEventListener('click', actualizarTarea);


});

async function cargarSelectUsuarios() {
    const res = await fetch(`${API}/users`);
    const usuarios = await res.json();

    const select = document.getElementById('taskUsuario');
    select.innerHTML = `<option value="">Seleccionar usuario</option>`;

    usuarios.forEach(u => {
        select.innerHTML += `
            <option value="${u.id}">${u.name}</option>
        `;
    });
}

//TAREAS
async function cargarTareas() {
    const res = await fetch(`${API}/tasks`);
    const tareas = await res.json();
    console.log('Tareas recibidas:', tareas);

    const tbody = document.getElementById('tablaTareas');
    tbody.innerHTML = '';

    tareas.forEach(t => {
        tbody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.title}</td>
                <td>${t.description || '-'}</td>
                <td>${t.userId}</td>
                <td>
                    <button class="btn-editar" data-id="${t.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${t.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// ¿En qué momento se transforman los datos JSON en elementos HTML?

// Los datos JSON se convierten en elementos HTML en el momento en que JavaScript los recorre y los inserta en la página usando innerHTML, donde se transforman en etiquetas visibles dentro del DOM.

//CREAR TAREA

async function crearTarea(e) {
    e.preventDefault() //Evita recargar la pagina

    const title = document.getElementById('taskTitulo').value;
    const description = document.getElementById('taskDesc').value;
    const userId = document.getElementById('taskUsuario').value;


    const nuevaTarea = {
        title,
        description,
        userId
    };

    await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaTarea)
    });

    
    document.getElementById('formTarea').reset();

    
    cargarTareas();


}

// ¿Qué ocurre primero: se actualiza el DOM o se envía la solicitud al servidor?

// El usuario envía el formulario y se ejecuta crearTarea.
// Se envían los datos al servidor con fetch (POST) y se guarda la tarea.
// Luego se vuelve a cargar la lista y se actualiza el DOM con los nuevos datos.

//Eliminar Tarea

async function eliminarTarea(e) {
    if (e.target.classList.contains('btn-eliminar')) {

        const id = e.target.getAttribute('data-id');

        await fetch(`${API}/tasks/${id}`, {
            method: 'DELETE'
        });

        cargarTareas(); // recargar lista
    }
}

// ¿Por qué es importante el id en esta operación?

// El id es lo más importante en esa operación porque es lo que permite decirle al servidor exactamente qué tarea borrar

//Actualizar Tarea

async function actualizarTarea(e) {
    e.preventDefault()
    if(e.target.classList.contains('btn-editar')) {

        const id = e.target.getAttribute('data-id')

        const nuevoTitulo = prompt("Nuevo nombre de la tarea")

        if (!nuevoTitulo) return; 

        await fetch(`${API}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: nuevoTitulo
            })
        })

        cargarTareas();
    }
    
}
