import React from "react";
import './App.css';
import axios from 'axios';
import Menu from "./components/Menu.js";
import Footer from "./components/Footer.js";
import UserList from "./components/User.js";

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': []
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
   }

   render () {
       return (
           <div>
               <Menu />
               <UserList users={this.state.users} />
               <Footer />
           </div>
       )
   }
}

export default App;
