let taskList = [];

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

// Função para atualizar a lista de tarefas na tela
function updateTaskList() {
  taskListContainer.innerHTML = ''; // Limpa a lista atual

  taskList.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('item');
    taskElement.innerHTML = `
      <div class="info">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskStatus(${index})">
        <span contenteditable="true" onblur="updateTaskContent(${index}, this.innerText)">${task.name}</span>
      </div>
      <span class="badge ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
    `;
    taskListContainer.appendChild(taskElement);
  });

  // Atualiza contagem de tarefas urgentes
  const urgentTasks = taskList.filter(task => task.priority === 'urgente');
  totalUrgentes.textContent = `${urgentTasks.length} tarefas`;
  totalMercado.textContent = `${taskList.length} itens`;
}

// Função para adicionar nova tarefa
function addNewTask() {
  const taskName = taskInput.value.trim();
  const taskPriority = prioritySelect.value;

  if (taskName) {
    taskList.push({
      name: taskName,
      priority: taskPriority,
      completed: false
    });

    taskInput.value = ''; // Limpar input
    prioritySelect.value = 'urgente'; // Resetar select
    addTaskForm.style.display = 'none'; // Fechar formulário
    updateTaskList(); // Atualizar a lista de tarefas
  }
  console.log(taskList);
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

