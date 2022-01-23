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
                {fullName: "John Smith", salary: 1500, increase: true, id: 1},
                {fullName: "Eric Pauel", salary: 850, increase: false, id: 2},
                {fullName: "Josh Walker", salary: 1200, increase: false, id: 3}
            ]
        };
        this.maxId = 3;
    }

    addItem = (name, salary) => {
        const newItem = {
            fullName: name,
            salary: salary,
            increase: false,
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

    render() {
        const {data} = this.state;

        return (
            <div className="app">
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                    data={data}
                    onDelete={this.deleteItem}/>
                <EmployersAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;