import { Component } from 'react';

import AppInfo from '../app-info/app.info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {fullName: "John Smith", salary: 1500, increase: true, rise: true, id: 1},
                {fullName: "Eric Pauel", salary: 850, increase: false, rise: false, id: 2},
                {fullName: "Josh Walker", salary: 1200, increase: false, rise: false, id: 3}
            ],
            term: "",
            filterMethod: "all", filterSalaryNum: 1000,
            filter: ['all', 'rise', 'bySalary']
        };
        this.maxId = 3;
    }

    addItem = (name, salary) => {
        const newItem = {
            fullName: name,
            salary: salary,
            increase: false,
            rise: false,
            id: ++this.maxId
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    deleteItem = (id) => {
        this.setState( ({data}) => {
            // const index = data.findIndex(elem => elem.id === id); //find matching deleting elem and 
            // const before = data.slice(0, index);
            // const after  = data.slice(index + 1);
            // const newArr = [...before, ...after];

            return {
                data: data.filter(elem => elem.id !== id)
            } 
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => 
        // {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const oldItem = data[index];
        //     const updatedItem = {...oldItem, increase: !oldItem.increase};          
        //     const newArr = [...data.slice(0,index), updatedItem, ...data.slice(index+1)];
        //     return {
        //         data: newArr
        //     }
        // })
        ({
            data: data.map(item => {
                if(item.id === id)
                    return {...item, [prop]: !item[prop]};
                return item;
            })
        }))
    }

    updateSalary = (id, salary) => {
        if(!Number(salary))
            salary = salary.slice(0, -1)

        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id)
                    return {...item, salary: salary};
                return item;
            })
        }))
    }

    getMethodFilter = (filterMethod, filterSalaryNum) => {
        this.setState({filterMethod});
        this.setState({filterSalaryNum});
    }
    // onUpdateSearch = (e) => {
    //     this.setState(() => {
    //         console.log(e.target.value);
    //         return {
    //             term: e.target.value
    //         }
    //     })
    // }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    searchByName = (arr, term) => {
        const newArr = arr.filter(item => {
            return item.fullName.indexOf(term) > -1;
        })
        
        return newArr;
    }

    searchEmployees = (emp, term, method) => {
        let newListEmployees;

        switch(method) {
            case "all":
                newListEmployees = emp;
                break;
            case "rise":
                newListEmployees = emp.filter(item => item.rise);
                break;
            case "bySalary": 
                newListEmployees = emp.filter(item => item.salary>this.state.filterSalaryNum);
                break;
            default: 
                new Error();
        }

        if(term.length !== 0)
            newListEmployees = this.searchByName(newListEmployees, term);

        return newListEmployees;
    }

    render() {
        const {data, term, filterMethod: method} = this.state;
        const increased = data.filter(item => item.increase).length,
              totalEmployees = data.length;
        const visibleData = this.searchEmployees(data, term, method);

        return (
            <div className="app">
                <AppInfo
                    totalEmployees={totalEmployees}
                    getIncrease={increased} />
    
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        getMethodFilter={this.getMethodFilter} />
                </div>
    
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    updateSalary={this.updateSalary} />
                <EmployersAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;