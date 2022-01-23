import { Component } from 'react';

import './employers-add-form.css';

class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameEmployee: '',
            salaryEmployee: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {nameEmployee, salaryEmployee} = this.state;
        if(nameEmployee !== "" && salaryEmployee !== "") {
            this.props.onAdd(this.state.nameEmployee, this.state.salaryEmployee);
            this.setState(() => ({
                nameEmployee: "",
                salaryEmployee: ""
            }))
        }
    }

    render() {
        let {nameEmployee, salaryEmployee} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" 
                        value={nameEmployee}
                        name="nameEmployee"
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        value={salaryEmployee}
                        name="salaryEmployee"
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;