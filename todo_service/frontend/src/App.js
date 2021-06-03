import React from "react";
import './App.css';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import UserList from "./components/User.js";
import ProjectList from "./components/Projects.js";
import TodoList from "./components/Todos.js";
import ProjectTodoList from "./components/Project.js";

const NotFound404 = ({location}) => {
        return (
            <div>
                <h1>Страница по адресу '{location.pathname}' не найдена</h1>
            </div>
        )
    }

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo_lists/')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route path="/projects/:id"><ProjectTodoList items={this.state.todos} /></Route>
                        <Redirect from='/' to='/projects' />
                        <Route component={NotFound404} />
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
