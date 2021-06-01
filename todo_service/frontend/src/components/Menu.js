import React from 'react'
import {NavLink} from "react-router-dom";


const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to='/' className="nav-link">Main</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/users' className="nav-link">Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/projects' className="nav-link">Projects</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/todo' className="nav-link">TODO</NavLink>
                    </li>
                    </ul>
            </span>
        </nav>
    )
}


export default Menu