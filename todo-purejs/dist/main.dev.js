"use strict";

var applist = document.querySelector('.todo-app__list');
var input = document.querySelector('.todo-app__input');
var currentEventOrder = 0;
input.addEventListener('keypress', function () {
  if (event.key === 'Enter') {
    console.log(123); // why cant get input value with input.innerText?

    applist.insertAdjacentHTML('afterbegin', '<li class="todo-app__item"><div class="todo-app__checkbox">\
        <input type="checkbox" id=' + currentEventOrder + ' /></label><label for=' + currentEventOrder + '></div>\
        <h1 class="todo-app__item-detail">' + input.value + '</h1>\
        <img src="./img/x.png" alt="" class="todo-app__item-x" /></li>');
    currentEventOrder += 1;
  }
});