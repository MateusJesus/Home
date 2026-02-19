let taskList = [];
let section = "sectionMercado"



// Elementos da página
const addTaskButton = document.getElementById('addTaskButton');
const addTaskForm = document.getElementById('addTaskForm');
const saveTaskButton = document.getElementById('saveTaskButton');
const cancelButton = document.getElementById('cancelButton');
const taskInput = document.getElementById('newTaskInput');
const prioritySelect = document.getElementById('prioritySelect');
const taskListContainer = document.getElementById('taskList');
const totalUrgentes = document.getElementById('totalUrgentes');
const totalMercado = document.getElementById('totalMercado');

const buttonSection = document.querySelectorAll(".setSection")

// Função para atualizar a lista de tarefas na tela
function updateTaskList() {

  taskListContainer.innerHTML = '';

  const filteredTasks = taskList.filter(task => task.section === section);

  filteredTasks.forEach((task,index) => {

    const taskElement = document.createElement('div');
    taskElement.classList.add('item');

    taskElement.innerHTML = `
      <div class="info">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span contenteditable="true">${task.name}</span>
      </div>
      <span class="badge ${task.priority}">
        ${(task.priority)}
      </span>      
      <span class="badge" onclick="deletTask(index)">
        lixo
      </span>
    `;

    // Toggle checkbox
    const checkbox = taskElement.querySelector('input');
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
    });

    // Editar texto
    const span = taskElement.querySelector('span');
    span.addEventListener('blur', (e) => {
      task.name = e.target.innerText;
    });

    taskListContainer.appendChild(taskElement);
  });
}


// Função para adicionar nova tarefa
function addNewTask() {
  const taskName = taskInput.value.trim();
  const taskPriority = prioritySelect.value;

  if (taskName) {
    taskList.push({
      name: taskName,
      priority: taskPriority,
      section: section,
      completed: false
    });

    taskInput.value = ''; // Limpar input
    prioritySelect.value = 'urgente'; // Resetar select
    addTaskForm.style.display = 'none'; // Fechar formulário
    updateTaskList(); // Atualizar a lista de tarefas
  }
}

// Função para alternar o status da tarefa (completa ou não)
function toggleTaskStatus(index) {
  taskList[index].completed = !taskList[index].completed;
  updateTaskList(); // Atualizar a lista
}

// Função para atualizar o conteúdo de uma tarefa editada
function updateTaskContent(index, newContent) {
  taskList[index].name = newContent;
  updateTaskList();
}

// Mostrar o formulário para adicionar uma nova tarefa
addTaskButton.addEventListener('click', () => {
  addTaskForm.style.display = 'flex';
});

// Salvar a nova tarefa
saveTaskButton.addEventListener('click', addNewTask);

// Cancelar a criação de nova tarefa
cancelButton.addEventListener('click', () => {
  addTaskForm.style.display = 'flex';
});


function setSection(params) {
  section = params.id

  buttonSection.forEach(btn => btn.classList.remove('gradiente'))
  params.classList.add("gradiente")

  updateTaskList()
}
