
import EmployersListItem from '../employers-list-item/employers-list-item';

import './employers-list.css';

const EmployersList = ({data, onDelete, onToggleProp, updateSalary}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;

        return (
            <EmployersListItem
                key={id} 
                {...itemProps}
                onDelete={() => onDelete(id)}
                /* onToggleIncrease={() => onToggleProp(id, 'increase')}
                onToggleRise={() => onToggleProp(id, 'rise') }*/ 
                onToggleProp={ (e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle')) }
                onUpdateSalary={ (e) => updateSalary(id, e.target.value)} />
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployersList;