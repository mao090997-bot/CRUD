const API = 'http://192.168.2.12:3000';

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarTareas();
});

// ===== USUARIOS =====
async function cargarUsuarios() {
    const res = await fetch(`${API}/users`);
    const usuarios = await res.json();
    console.log('Usuarios recibidos:', usuarios);

    const tbody = document.getElementById('tablaUsuarios');
    tbody.innerHTML = '';

    const select = document.getElementById('taskUsuario');

    usuarios.forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>
                    <button class="btn-editar" data-id="${u.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${u.id}">Eliminar</button>
                </td>
            </tr>
        `;

        select.innerHTML += `<option value="${u.id}">${u.name}</option>`;
    });
}

// ===== TAREAS =====
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
