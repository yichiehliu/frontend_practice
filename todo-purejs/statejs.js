
const todoCount = document.getElementById("todo-count");
const btn_all = document.querySelector('#button-all');
const btn_act = document.querySelector('#button-act');
const btn_done = document.querySelector('#button-complete');
const clean_done = document.querySelector('#clean-done');
const queryl = document.querySelector('.todo-app__item-x')

let input = document.querySelector('.todo-app__input');
let applist = document.querySelector('.todo-app__list');
let taskList = []
// for assigning id 
let currentEventOrder = 0;
let id = 0;



// use function to manage rendering
function renderer(tasksToRender) {
    applist.innerHTML = ''
    let fragRender = new DocumentFragment;
    for(let i = 0; i < tasksToRender.length; i++){
        let itemNode = document.createElement("LI");
        if(tasksToRender[i].isComplete){
            itemNode.classList.add("line-through");
        }
        itemNode.classList.add("todo-app__item");
        const wrapper = document.createElement("DIV");
        const checkbox = document.createElement("INPUT");
        itemNode.setAttribute("id", "Li-"+tasksToRender[i].id);
        // itemNode.setAttribute("class")


        // innerHTML version
        itemNode.innerHTML = 
        `<div class="todo-app__checkbox">
        <input type="checkbox" id=${tasksToRender[i].id}${tasksToRender[i].isComplete ? ' checked' : ''} />
        </label><label for=${tasksToRender[i].id}>
        </div>
        <h1 class="todo-app__item-detail">${tasksToRender[i].input_content}</h1>
        <img src="./img/x.png" alt="" class="todo-app__item-x" />`;
        applist.appendChild(itemNode);
    }
    todoCount.innerHTML = taskList.filter((ele) => !ele.isComplete).length + ' left';
    // error handler? -->renderer不用特別寫
}

input.addEventListener('keyup', () => {
    if (event.key === 'Enter'&& event.target.value !== '') {
        taskList.push({ id:currentEventOrder, input_content: input.value, isComplete: false });
        renderer(taskList);
        currentEventOrder += 1; 
        input.value = '';
    }
})
// event 要傳進去才可以使用這個event object
applist.addEventListener('change', (event) => {
    console.log(event.target.id)
    
    let findChangedItem = taskList.find((ele) => ele.id == event.target.id);
    if(event.target.parentElement.parentElement.classList.toggle("line-through")) {
        findChangedItem.isComplete = true;
    } else {
        findChangedItem.isComplete = false;
    }
    renderer(taskList);
});

applist.addEventListener('click', (event) => {
    // 觸發這個事件的id跟哪個task id 一樣
    // why event 可以直接印出classname但是input那個不行
    // console.log(event.target.className, event.target.parentElement.childNodes[1], typeof(event.target.parentElement))
    if(event.target.className === "todo-app__item-x") {
        // 要整個重新render嗎？ 還是直接刪掉那個被觸發的節點？
        taskList = taskList.filter((ele) => 'Li-'+ele.id !== event.target.parentElement.id);
        renderer(taskList)
    }
    // let findClickedItem = event.target.parentElement.parentElement.childElement.className === "todo-app__item-x";
})

btn_act.addEventListener('click', () => {
    let tempTaskFilter = taskList.filter(ele => !ele.isComplete)
    renderer(tempTaskFilter)
});

btn_all.addEventListener('click', () => {
    renderer(taskList);
});

btn_done.addEventListener('click', () => {
    let tempTaskFilter = taskList.filter(ele => ele.isComplete)
    renderer(tempTaskFilter)
});

clean_done.addEventListener('click', () => {
    taskList = taskList.filter(ele => !ele.isComplete)
    renderer(taskList)
});


