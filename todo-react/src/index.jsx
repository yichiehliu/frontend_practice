import React from 'react';
import ReactDom from "react-dom"
import "./index.css"
// import AppComponent from "./AppComponent.js"

function TaskList(props) {
    console.log("props", props, "modes", props.handleChecked)

    let newTodo = []
    if (props.state.mode === "All") {
        newTodo = props.state.todos
    } else if (props.state.mode === "Active") {
        newTodo = props.state.todos.filter(eachTodo => !eachTodo.isCompleted)
    } else if (props.state.mode === "Completed") {
        newTodo = props.state.todos.filter(eachTodo => eachTodo.isCompleted)
    }
    return newTodo.map((eachTodo) => {
        return (<li key={eachTodo.id} className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" onClick={props.handleChecked} />
                <label>
                </label>
            </div>
            <h1 className="todo-app__item-detail">{eachTodo.task}</h1>
            <img src="./img/x.png" alt="" className="todo-app__item-x" />
        </li>)
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
        if (event.key === 'Enter') {
            console.log(event.target.value)
            const value = event.target.value
            this.setState(prevState => {
                return {
                    input: value,
                    mode: prevState.mode,
                    todos: [...prevState.todos, {
                        id: prevState.todos.length,
                        task: value,
                        isCompleted: false
                    }]
                }
            })
        }
    }
    handleClick = (event) => {
        this.setState({ mode: event.target.name })
        console.log(this.state.mode)
    }
    handleClear = (event) => {
        this.setState(prevState => {
            return {
                // 不知道能不能這樣改??
                todos: prevState.todos.filter(eachTodo => !eachTodo.isCompleted)
            }
        })

    }
    handleChecked = (event) => {
        console.log(123)
    }
    render() {
        let props = {
            state: { ...this.state },
            // handleChecked: { () => this.handleChecked }
        }
        return (
            <div className="todo-app__root" >
                <div className="todo-app__header">
                    <div className="todo-app__title">todos</div>
                </div>
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyPress={this.handleKeyPress} />
                    <ul className="todo-app__list">
                        {/* 有改state，會自動重新render */}
                        {/* 為什麼兩個都要要加... */}
                        <TaskList  {...props} />
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

