import './app-filter.css';

const AppFilter = ({checkRiseEmployees, checkSalaryFilter}) => {
    return (
        <div className="btn-group">
            <button 
                className="btn btn-light"
                type="button">
                    Все сотрудники
            </button>

            <button 
                className="btn btn-outline-light"
                type="button"
                onClick={checkRiseEmployees} >
                    На повышение
            </button>

            <button 
                className="btn btn-outline-light"
                type="button"
                onClick={checkSalaryFilter}>
                    З/П больше 1000$
            </button>
        </div>
    );
}

export default AppFilter;