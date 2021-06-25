import React from 'react'
import {NavLink} from "react-router-dom";


class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/' className="nav-link">Main</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/users'
                                 className="nav-link">Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/projects'
                                 className="nav-link">Projects</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/todo' className="nav-link">TODO</NavLink>
                    </li>
                    <li className="nav-item">
                        {this.props.is_authenticated() ? <button
                                onClick={() => this.props.logout()}>Logout</button> :
                            <NavLink to='/login'
                                     className="nav-link">Login</NavLink>}
                    </li>
                    </ul>
            </span>
            </nav>
        )
    }
}


export default Menu