// Elements
const d = document,
    clearBtn = d.querySelector('.clear'),
    dateElement = d.getElementById('date'),
    list = d.getElementById('list'),
    input = d.getElementById('input')

// Classes names
const check = 'fa-circle',
        uncheck = 'fa-check-circle',
        lineThrough = 'lineThrough'
        
// Dates
const today = new Date(),
options = {weekday:'long', month:'short', day:'numeric'}

dateElement.innerHTML = today.toLocaleDateString('es', options)

// Variables
let LIST = [],
    id = 0
    
    
// Local Storage
    const LS = localStorage
    const data = LS.getItem('TODO')

if(data){
    LIST = JSON.parse(data)
    id = LIST.length //Set the id to the lastone on the list, para que el id sea igual a la cantidad de elementos, y la proxima tarea que agreguemos tenga el id siguiente.
    loadList(LIST) // load the list to the user interface
}else{
    LIST = []
    id = 0
}

// Functions
function addToDo(toDo, id, done, trash){

    if(trash) return;

    const DONE = done ? uncheck : check,
        LINE = done ? lineThrough : ""

    const item = `<li class="item">
        <i class="far ${DONE}  co"  job="complete" id="${id}"></i>
        <p class="text  ${LINE}">${toDo}</p>
        <i class="fas fa-trash  de"  job="delete"  id="${id}"></i>
        </li>`,
        position = 'beforeend'

    list.insertAdjacentHTML(position, item)

}
// addToDo('drink coffe')
// addToDo('program something')

function completeToDo(el){
    el.classList.toggle(check)
    el.classList.toggle(uncheck)
    el.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[el.id].done = LIST[el.id].done ? false : true
}

function removeToDo(el){
    el.parentNode.parentNode.removeChild(el.parentNode);
    LIST[el.id].trash = true;
}

function loadList(array){
    array.forEach(el => {
        addToDo(el.name, el.id, el.done, el.trash)
    });
}
// Events

d.addEventListener('keyup', e => {
    if(e.keyCode === 13){
        const toDo = input.value
        if(toDo){
            addToDo(toDo, id, false, false)
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            id++
            LS.setItem('TODO', JSON.stringify(LIST))
        }
        input.value= ''
    }
})


list.addEventListener('click', e => {
    // console.log(e.target.parentNode)
    // console.log('true', e.target)
    
    const elementJob = e.target.attributes.job.value

    if(elementJob === 'complete'){
        completeToDo(e.target)
    }else if( elementJob === 'delete'){
        removeToDo(e.target)
    }else{
        return;
    }

    LS.setItem('TODO', JSON.stringify(LIST))
})


clearBtn.addEventListener('click', e => {
    LS.clear()
    location.reload()
    console.log('clear done')
})

