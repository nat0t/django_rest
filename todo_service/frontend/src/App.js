import React from "react";
import "./App.css";
import axios from 'axios';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import UserList from "./components/User.js";
import ProjectList from "./components/Projects.js";
import TodoList from "./components/Todos.js";
import ProjectTodoList from "./components/Project.js";
import LoginForm from "./components/Auth.js";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


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
        this.is_authenticated = this.is_authenticated.bind(this)
        this.logout = this.logout.bind(this)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({'users': []})
        })
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
        })
        axios.get('http://127.0.0.1:8000/api/todo_lists/', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({'todos': []})
        })
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(name, repoLink, user) {
        const headers = this.get_headers()
        const data = {
            name: name,
            repoLink: repoLink,
            users: [user, ],
        }
        console.log('posting')
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                let newProject = response.data
                const user = this.state.users[0].filter((item) => item.id === newProject.users[0])[0]
                newProject.users[0] = user
                this.setState({projects: [...this.state.projects, newProject]})
            }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo_lists/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

        createTodo(text, project) {
        const headers = this.get_headers()
        const data = {
            text: text,
            project: project,
        }
        console.log('posting')
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/todo_lists/', data, {headers})
            .then(response => {
                let newTodo = response.data
                const project = this.state.projects.filter((item) => item.id === newTodo.project)[0]
                newTodo.project = project
                this.setState({todos: [...this.state.todos, newTodo]})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Menu is_authenticated={this.is_authenticated} logout={this.logout}/>
                    <Switch>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, repoLink, user) => this.createProject(name, repoLink, user)}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects} createProject={(text, project) => this.createTodo(text, project)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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
