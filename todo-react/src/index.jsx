import React from 'react';
import ReactDom from "react-dom"
import classNames from 'classnames'
import "./index.css"
import ximg from './img/x.png'
// import AppComponent from "./AppComponent.js"

function TaskList({ todos, mode, onChange, xClicked }) {

    let newTodo = []
    if (mode === "All") {
        newTodo = todos
    } else if (mode === "Active") {
        newTodo = todos.filter(eachTodo => !eachTodo.isCompleted)
    } else if (mode === "Completed") {
        newTodo = todos.filter(eachTodo => eachTodo.isCompleted)
    }
    return newTodo.map((eachTodo) => {
        const checkboxClass = classNames('todo-app__item-detail', eachTodo.isCompleted ? "line-through" : "")
        // const checkboxClass = classNames({
        //     'todo-app__checkbox': true,
        //     'line-through': eachTodo.isCompleted
        // })
        return (<li key={eachTodo.id} className="todo-app__item">
            <div className="todo-app__checkbox" >
                <input type="checkbox" onChange={() => onChange(eachTodo.id)} checked={eachTodo.isCompleted} id={eachTodo.id} />
                <label htmlFor={eachTodo.id}>
                </label>
            </div>
            <h1 className={checkboxClass}>{eachTodo.task}</h1>
            {/* 為什麼要加{}?? */}
            <img src={ximg} alt="" className="todo-app__item-x" onClick={() => xClicked(eachTodo.id)} />
        </li >)
    })


}


// class Button extends React.Component {

//     state = {

//     }
//     handleClick() {
//         console.log(this.props)
//     }
//     render() {
//         return (
//             <li>
//                 <button onClick={this.handleClick}>{this.props.name}</button>
//             </li >
//         )
//     }
// }

function Button(props) {
    return (
        <li>
            <button>{props.name}</button>
        </li>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            idCounter: 0,
            input: "",
            // 初始都在ALL mode
            mode: "All",
            todos: [
                // {
                //     // 初始值不用放??
                //     id: 0,
                //     task: "",
                //     isCompleted: false
                // }
            ]
        }
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value != '') {
            console.log(event.target.value)
            const value = event.target.value
            this.setState(prevState => {
                const idCounter = prevState.idCounter + 1
                return {
                    input: '',
                    idCounter: idCounter,
                    mode: prevState.mode,
                    todos: [...prevState.todos, {
                        id: idCounter,
                        task: value,
                        isCompleted: false
                    }]
                }
            })
        }
    }
    // 為什麼這樣可以不需要bind??
    handleInputChange = (e) => {
        const value = e.target.value
        this.setState({
            input: value
        })
    }
    handleClick = (event) => {
        this.setState({ mode: event.target.name })
    }

    handleXClicked = (id) => {
        let index = this.state.todos.findIndex(element => {
            return element.id === id;
        });
        const updatedTodo = [...this.state.todos]

        updatedTodo.splice(index, 1)
        console.log("xclicked", updatedTodo, this.state.todos)
        this.setState({
            todos: updatedTodo
        })


    }
    handleClear = (event) => {
        this.setState(prevState => {
            return {
                // 不知道能不能這樣改??
                todos: prevState.todos.filter(eachTodo => !eachTodo.isCompleted)
            }
        })

    }
    handleChecked = (id) => {
        // 只copy值 reference還是一樣
        let newTodos = [...this.state.todos];
        let index = this.state.todos.findIndex(element => {
            return element.id === id;
        });
        // new一個object
        // 可以不要用newTodos[index]，直接用...this.state.todos[index]?
        const updatedTodo = { ...newTodos[index], isCompleted: !newTodos[index].isCompleted };
        // 這裡可以直接assign?? renference不是依樣ㄇ
        newTodos[index] = updatedTodo;
        console.log("copy arrays", this.state.todos, newTodos, updatedTodo)
        this.setState({
            todos: newTodos
        })
    }
    render() {
        return (
            <div className="todo-app__root" >
                <div className="todo-app__header">
                    <div className="todo-app__title">todos</div>
                </div>
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} value={this.state.input} />
                    <ul className="todo-app__list">
                        {/* 有改state，會自動重新render */}
                        {/* 為什麼兩個都要要加... */}
                        {/* 要傳入很多的話是再另一個變數?? */}
                        <TaskList todos={this.state.todos} mode={this.state.mode} onChange={this.handleChecked} xClicked={this.handleXClicked} />
                    </ul>
                </section>
                <footer className="todo-app__footer">
                    <div className="todo-app__total">{this.state.todos.length} left</div>
                    <ul className="todo-app__view-buttons">
                        <button name="All" onClick={this.handleClick}>All</button>
                        <button name="Active" onClick={this.handleClick}>Active</button>
                        <button name="Completed" onClick={this.handleClick}>Completed</button>
                        {/* <Button name="Active" onClick={this.handleClick}></Button>
                        <Button name="Completed" onClick={this.handleClick}></Button> */}
                    </ul>
                    <div className="todo-app__clean">
                        <button name="clearAll" className="clean-done" onClick={this.handleClear}>Clear completed</button>
                    </div>

                </footer>
            </div>
        )
    }
}

export default App

ReactDom.render(
    <App />,
    document.getElementById("root")
)

