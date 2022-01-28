import { Component } from 'react';

import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterMethod: "all",
            filterSalaryNum: 1000
        }
    }

    getNumber = (e) => {
        const filterSalaryNum = +e.target.value;
        this.setState({filterSalaryNum});
    }

    getMethodFilter = (e) => {
        const filterMethod = e.currentTarget.getAttribute("data-method");
        this.setState({filterMethod});
        this.props.getMethodFilter(filterMethod, this.state.filterSalaryNum);
    }

    getClassesOfBtn = (method) => {
        let classes = "btn";
        
        if(method === this.state.filterMethod)
            classes += " btn-light"
        else 
            classes += " btn-outline-light"

        return classes
    }

    render() {
        const buttonsData = [
            {name: "all", label: "Все сотрудники"},
            {name: "rise", label: "На повышение"},
            {name: "bySalary", label: "Все сотрудники"}
        ]

        const buttons = buttonsData.map(({name, label}) => {
            const className = this.getClassesOfBtn(name);

            if(name === "bySalary")
                return (
                    <button 
                        className={className}
                        type="button"
                        key={name}
                        onClick={this.getMethodFilter}
                        data-method={name} >
                            {label}
                            <input 
                                className = "salaryInput"
                                type = "text" 
                                value = {this.state.filterSalaryNum}
                                onChange = {this.getNumber} />
                    </button>
                )

            return (
                <button 
                    className={className}
                    type="button"
                    key={name}
                    onClick={this.getMethodFilter}
                    data-method={name} >
                        {label}
                </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
{/*                 <button 
                    className={buttonsData.methodAll}
                    type="button"
                    onClick={this.getMethodFilter}
                    data-method="all" >
                        Все сотрудники
                </button>
    
                <button 
                    className={buttonsData.methodRise} //->надо поменять стили при нажатии
                    type="button"
                    onClick={this.getMethodFilter}
                    data-method="rise" >
                        На повышение
                </button>
    
                <button 
                    className={buttonsData.methodBySalary}
                    type="button"
                    onClick={this.getMethodFilter}
                    data-method="bySalary" >
                        З/П больше 
                        <input 
                            className = "salaryInput"
                            type = "text" 
                            value = {this.state.filterSalaryNum}
                            onChange = {this.getNumber} />
                </button> */}
            </div>
        );
    }
}

export default AppFilter;