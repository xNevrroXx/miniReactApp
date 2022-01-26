import { Component } from 'react';

import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "all"
        }
    }

    getMethodFilter = (e) => {
        const method = e.currentTarget.getAttribute("data-method");
        this.setState({method});
        this.props.getMethodFilter(method);
    }

    render() {
        return (
            <div className="btn-group">
                <button 
                    className="btn btn-light"
                    type="button"
                    onClick={this.getMethodFilter}
                    data-method="all" >
                        Все сотрудники
                </button>
    
                <button 
                    className="btn btn-outline-light" //->надо поменять стили при нажатии
                    type="button"
                    onClick={this.getMethodFilter}
                    data-method="riseEmp" >
                        На повышение
                </button>
    
                <button 
                    className="btn btn-outline-light"
                    type="button"
                    onClick={this.getMethodFilter}
                    data-method="bySalary" >
                        З/П больше 1000$
                </button>
            </div>
        );
    }
}

export default AppFilter;