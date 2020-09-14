import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Todo 
// Input / Buttons / TaskList 
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_input: "",
        };
    }
    render() {
        console.log(this.props)
        return (
            <input type="text" className="todo-app_input" placeholder="What needs to be done?" />
        )
    }
}

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <button>{this.props.children}</button>
        )
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        console.log(this.props)
        return <h1>Hello</h1>
    }
}


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: {
                item: [],
                finished: false
            }
            // this.addTodo = this.addTodo.bind(this)
        }
    }
    // 不一定要寫constructor
    // state = {
    //     todos: [2333]
    // }
    addTodo(todoitem) {
        // 展開array，重新讀取一次當前todolist
        const newTodos = [...this.state.todos.item];
        newTodos.push(todoitem)
        this.setState({
            todos: {
                item: newTodos,
                finished: false
            }
        });
    }
    render() {
        return (
            // jsx轉譯完會變成類似function的東西，funciton只能有一個跟目錄，可以最後用一個div包起來
            <div className="todo-app__root">
                <div className="todo-app__header">
                    <div className="todo-app__title">todos</div>
                </div>
                <section className="todo-app__main">
                    <Input addTodo={this.addTodo} />
                    <TaskList todolist={this.state.todos} />
                </section>
                <div className="todo-app__footer" id="todo-footer">
                    <div class="todo-app__total" id="todo-count">0 left</div>
                    <ul class="todo-app__view-buttons">
                        <li>
                            <Buttons onClick={this.state.todos}>All</Buttons>
                        </li>
                        <li>
                            <Buttons onClick={}>Active</Buttons>
                        </li>
                        <li>
                            <Buttons onClick={}>Completed</Buttons>
                        </li>
                    </ul>
                    <div class="todo-app__clean">
                        <button id="clean-done">Clear completed</button>
                    </div>

                </div>
            </div >

        )
    }
}


// ========================================
ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);
