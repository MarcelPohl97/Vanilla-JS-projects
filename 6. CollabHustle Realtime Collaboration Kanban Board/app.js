const kanban_Items = document.querySelectorAll('.draggable')
const kanban_Board = document.querySelectorAll('.container')
const kanban_Container = document.querySelector('.kanban__container');

kanban_Container.addEventListener('dragstart', event => {
  if(event.target.classList.contains('draggable')){
    event.target.classList.add('dragging');
  }
})

kanban_Container.addEventListener('dragend', event => {
  if(event.target.classList.contains('draggable')){
    event.target.classList.remove('dragging');
  }
})

kanban_Container.addEventListener('dragover', event => {
  event.preventDefault();
  if(event.target.classList.contains('.container')){
    const afterElement = getDragAfterElement(event, event.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  }
})

/*kanban_Board.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})*/

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

class KanbanBoard {
    constructor(title) {
        this.title = title;
        this.template = `
        <div class="kanban__board">
            <header class="kanban__title">
                <div class="kanban__name" contenteditable="true">${this.title}</div>
            </header>
            <div class="container">
                <div draggable="true" class="draggable" contenteditable="true">test1</div>
                <div draggable="true" class="draggable" contenteditable="true">test2</div>
                <div draggable="true" class="draggable" contenteditable="true">test3</div>
                <div draggable="true" class="draggable" contenteditable="true">test4</div>
            </div>
        </div>
        `
        this.render = () => {
            kanban_Container.innerHTML += this.template;
        }
        this.render();
    }
}

const test = new KanbanBoard("test");

