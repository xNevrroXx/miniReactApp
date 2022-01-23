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
            ]
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

    onToggleIncrease = (id) => {
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
                    return {...item, increase: !item.increase};
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, rise: !item.rise};
                }

                return item;
            })
        }))
    }

    checkRiseEmployees = () => {
        return this.state.data.filter(item => item.rise)
    }

    checkSalaryFilter = () => {
        return this.state.data.filter(item => item.salary>1000)
    }

    render() {
        const {data} = this.state;
        const increased = data.filter(item => item.increase).length,
              totalEmployees = data.length;

        return (
            <div className="app">
                <AppInfo
                    totalEmployees={totalEmployees}
                    getIncrease={increased} />
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter
                        filterRise={this.checkRiseEmployees}
                        filterSalary={this.checkSalaryFilter} />
                </div>
    
                <EmployersList 
                    data={data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployersAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;