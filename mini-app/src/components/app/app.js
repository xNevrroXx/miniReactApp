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
            method: "all",
            filter: ['all', 'riseEmp', 'bySalary']
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
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }))
    }

    getMethodFilter = (method) => {
        this.setState({method})
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

    searchEmployees = (items, term, method) => {
        switch(method) {
            case "all":
                if(term.length === 0){
                    return items;
                } else {
                    return items.filter(item => {
                        return item.fullName.indexOf(term) > -1
                    });
                }

            case "riseEmp":
                if(term.length === 0) {
                    return items.filter(item => item.rise)
                } else {
                    return items.filter(item => item.rise) //фильтрует по должности, а потом....
                        .filter(item => {   //и по введенному имени
                        return item.fullName.indexOf(term) > -1
                    });
                }
                
            case "bySalary":
                if(term.length ===0) {
                    return items.filter(item => item.salary>1000);
                } else {
                    return items.filter(item => item.salary>1000) //фильтрует по зарплате, а потом...
                        .filter(item => {   //=и по введенному имени
                        return item.fullName.indexOf(term) > -1 
                    })
                }
            
            default: 
                new Error();
        }
    }

    render() {
        const {data, term, method} = this.state;
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
                    onToggleProp={this.onToggleProp} />
                <EmployersAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;