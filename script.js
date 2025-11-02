const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')


let todos = []
let nextId = 1


function loadFromStorage() {
  const savedTodos = localStorage.getItem('todos')
  const savedNextId = localStorage.getItem('nextId')
  
  if (savedTodos) {
    todos = JSON.parse(savedTodos)
  }
  if (savedNextId) {
    nextId = parseInt(savedNextId)
  }
}


function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
  localStorage.setItem('nextId', nextId.toString())
}


function newTodo() {
  const todoText = prompt('Введіть нове завдання:')
  
  if (todoText && todoText.trim() !== '') {
    const todo = {
      id: nextId++,
      text: todoText.trim(),
      checked: false
    }
    
    todos.push(todo)
    console.log('Поточні справи:', todos)
    
    saveToStorage() 
    render()
    updateCounter()
  }
}


function renderTodo(todo) {
  const checkedAttr = todo.checked ? 'checked' : ''
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : ''
  
  return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="${todo.id}" 
        ${checkedAttr}
        onchange="checkTodo(${todo.id})"
      />
      <label for="${todo.id}">
        <span class="${textClass}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">
        delete
      </button>
    </li>
  `
}


function render() {
  if (todos.length === 0) {
    list.innerHTML = '<li class="list-group-item text-muted">Немає справ. Додайте нову!</li>'
  } else {
    const todosHTML = todos.map(todo => renderTodo(todo)).join('')
    list.innerHTML = todosHTML
  }
}


function updateCounter() {

  const totalCount = todos.length
  

  const uncheckedCount = todos.filter(todo => !todo.checked).length
  

  
  itemCountSpan.textContent = totalCount
  uncheckedCountSpan.textContent = uncheckedCount
}


function deleteTodo(id) {

  const index = todos.findIndex(todo => todo.id === id)
  
  if (index !== -1) {

    todos.splice(index, 1)
    console.log('Справу видалено. Поточні справи:', todos)
    
    saveToStorage() 
    render()
    updateCounter()
  }
}


function checkTodo(id) {

  const todo = todos.find(todo => todo.id === id)
  
  if (todo) {
    todo.checked = !todo.checked
    console.log('Статус змінено:', todo)
    
    saveToStorage() 
    render()
    updateCounter()
  }
}


function init() {
  loadFromStorage() 
  

  if (todos.length === 0) {
    todos = [
      { id: nextId++, text: 'Вивчити HTML', checked: true },
      { id: nextId++, text: 'Вивчити CSS', checked: true },
      { id: nextId++, text: 'Вивчити JavaScript', checked: false }
    ]
    saveToStorage()
  }
  
  render()
  updateCounter()
}


init()