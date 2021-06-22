import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        console.log('props')
        console.log(props)
        super(props);
        this.state = {
            text: '',
            project: props.projects[0].id,
        }
        console.log()
        console.log(this.state)
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    handleSubmit(event) {
        this.props.createProject(
            this.state.text,
            this.state.project
        )
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">Users</label>

                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>

                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        )
    }

}

export default TodoForm