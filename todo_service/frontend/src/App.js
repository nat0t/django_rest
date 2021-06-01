import React from "react";
import './App.css';
import axios from 'axios';
import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import UserList from "./components/User.js";
import ProjectList from "./components/Projects.js";
import TodoList from "./components/Todos.js";

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

   render () {
       return (
           <div>
               <Menu />
               <UserList users={this.state.users} />
               <ProjectList projects={this.state.projects} />
               <TodoList todos={this.state.todos} />
               <Footer />
           </div>
       )
   }
}

export default App;
