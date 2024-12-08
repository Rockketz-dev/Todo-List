const ingresaTarea = document.querySelector("#input");
const botonAgregar = document.querySelector("#enviar");
const totalTareas = document.querySelector("#totalTareas");
const tareasCompletas = document.querySelector("#tareasListas");
const listaTareas = document.querySelector("#listaTareas");

let tareas = [
  { id: 1, tarea: "Estudiar", estado: false },
  { id: 2, tarea: "Repasar", estado: false },
  { id: 3, tarea: "Practicar", estado: false },
];

function actualizarTareas() {
  const total = tareas.length;
  const listas = tareas.filter((tarea) => tarea.estado).length;
  totalTareas.innerHTML = total;
  tareasCompletas.innerHTML = listas;
}

function renderizarTareas() {
  listaTareas.innerHTML = "";
  for (let tarea of tareas) {
    const itemTarea = document.createElement("li");

    itemTarea.innerHTML = `
            <span class="${tarea.estado ? "completed" : ""}">${tarea.id}. ${
      tarea.tarea
    }</span>
            <input type="checkbox" class="statusCheckbox" ${
              tarea.estado ? "checked" : ""
            } data-id="${tarea.id}">
            <button class="delete-btn" data-id="${
              tarea.id
            }"><i class="fa-solid fa-xmark"></i> Eliminar</button>
        `;

    listaTareas.appendChild(itemTarea);
  }
  actualizarTareas();
}

function agregarTarea() {
  const descripcionTarea = ingresaTarea.value.trim();
  if (descripcionTarea !== "") {
    const nuevaTarea = {
      id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
      tarea: descripcionTarea,
      estado: false,
    };
    tareas.push(nuevaTarea);
    ingresaTarea.value = "";
    renderizarTareas();
  }
}

function eliminarTarea(id) {
  const indiceParaEliminar = tareas.findIndex((tarea) => tarea.id === id);
  if (indiceParaEliminar !== -1) {
    tareas.splice(indiceParaEliminar, 1);
    renderizarTareas();
  }
}

function cambiarEstado(id) {
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.estado = !tarea.estado;
    renderizarTareas();
  }
}

botonAgregar.addEventListener("click", agregarTarea);

listaTareas.addEventListener("click", (evento) => {
  const idTarea = parseInt(evento.target.getAttribute("data-id"), 10);
  if (evento.target.classList.contains("statusCheckbox")) {
    cambiarEstado(idTarea);
  } else if (evento.target.classList.contains("delete-btn")) {
    eliminarTarea(idTarea);
  }
});

renderizarTareas();
