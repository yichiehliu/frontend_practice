const todoCount = document.getElementById("todo-count");

const btn_all = document.querySelector('#button-all');
const btn_act = document.querySelector('#button-act');
const btn_done = document.querySelector('#button-complete');
const clean_done = document.querySelector('#clean-done');

let input = document.querySelector('.todo-app__input');
let applist = document.querySelector('.todo-app__list');
let TaskList = []
let currentEventOrder = 0;

// let todo_all = []
// let todo_act = []
// let todo_done = []

// function taskDoneClick() {

// }

// 1. 不要直接對DOM操作，利用document fragment
// 在react的話因為已經有virtual dom，所以就比較少在用fragment

// const itemNode = document.createElement("LI");
// const wrapper = document.createElement("DIV");
// const checkbox = document.createElement("INPUT");

// checkbox.setAttribute("id", id);
// checkbox.setAttribute("onClick", () => {taskDoneClick()});
// wrapper.appendChild(checkbox);
// itemNode.appendChild(wrapper);
// 最後再把資料拉出來差到DOM裡面



function renderTaskHTML(id, input_content, isComplete) {
    const itemNode = document.createElement("LI")

    if(isComplete){
        console.log(isComplete)
        itemNode.classList.add("line-through")
    }
    itemNode.classList.add("todo-app__item")
    itemNode.setAttribute("id", "Li-"+id)

    itemNode.innerHTML = 
    `<div class="todo-app__checkbox">
    <input type="checkbox" id=${id}${isComplete ? ' checked' : ''} />
    </label><label for=${id}>
    </div>
    <h1 class="todo-app__item-detail">${input_content}</h1>
    <img src="./img/x.png" alt="" class="todo-app__item-x" />`

    return itemNode;
}
// 先執行一次 拿到return值之後  eventlistner才去做事件綁定，才去看地按個參數帶的是什麼，發現戴的是一個node不是function，於是掛掉
// input.addEventListener('keyup', renderTaskHTML())
input.addEventListener('keyup', () => {
    if (event.key === 'Enter'&& event.target.value !== '') {
        // why cant get input value with input.innerText?
        // todoListData = applist.querySelectorAll('li');
        TaskList.push({ id:currentEventOrder, input_content: input.value, isComplete: false });
        applist.appendChild(renderTaskHTML(currentEventOrder, input.value, false));
        // console.log(TaskList,todoListData)
        // [...vaiable] --> turn into array
        // filter結果true的才會被放到list裡面
        todoCount.innerHTML = TaskList.filter((ele) => !ele.isComplete).length + ' left';
        currentEventOrder += 1; 
    }});

applist.addEventListener('change', (event) => {
    // react event --> currentTarget 
    console.log(event.target.id, typeof(event.target.id))
    console.log( TaskList.find((ele) => ele.id == event.target.id))
    if(event.target.parentElement.parentElement.classList.toggle("line-through")) {
        TaskList.find((ele) => ele.id == event.target.id).isComplete = true;
    } else {
        TaskList.find((ele) => ele.id == event.target.id).isComplete = false;
    }
    todoCount.innerHTML = TaskList.filter((ele) => !ele.isComplete).length + ' left';
})

btn_act.addEventListener('click', () => {
    let tempTaskFilter = [];
    let fragment = new DocumentFragment();
    tempTaskFilter = TaskList.filter(ele => !ele.isComplete)
    for(let i = 0; i < tempTaskFilter.length; i++){
        fragment.appendChild(renderTaskHTML(tempTaskFilter[i].id, tempTaskFilter[i].input_content, tempTaskFilter[i].isComplete))
    }
    applist.innerHTML = ''
    applist.appendChild(fragment)
})

btn_all.addEventListener('click', () => {
    // applist.innerHTML = TaskList.filter(ele => !ele.isComplete)
    let fragment = new DocumentFragment();
    for(let i = 0; i < TaskList.length; i++){
        fragment.appendChild(renderTaskHTML(TaskList[i].id, TaskList[i].input_content, TaskList[i].isComplete))
    }
    applist.innerHTML = ''
    applist.appendChild(fragment)
})



btn_done.addEventListener('click', () => {
    let tempTaskFilter = [];
    let fragment = new DocumentFragment();
    tempTaskFilter = TaskList.filter(ele => ele.isComplete)
    for(let i = 0; i < tempTaskFilter.length; i++){
        fragment.appendChild(renderTaskHTML(tempTaskFilter[i].id, tempTaskFilter[i].input_content, tempTaskFilter[i].isComplete))
    }
    applist.innerHTML = ''
    applist.appendChild(fragment)
})

clean_done.addEventListener('click', () => {
    let tempTaskFilter = [];
    let fragment = new DocumentFragment();
    tempTaskFilter = TaskList.filter(ele => ele.isComplete)
    console.log(TaskList,tempTaskFilter)
    for(let i = 0; i < tempTaskFilter.length; i++){
        let delnode = TaskList.findIndex((ele) => ele.id === tempTaskFilter[i].id);
        TaskList.splice(delnode,1)
        console.log(TaskList);
        let tempNode = document.getElementById('Li-'+tempTaskFilter[i].id);
        console.log('tempNode',tempNode)
        applist.removeChild(tempNode)
    }
})

