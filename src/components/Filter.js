import React, {Component} from 'react';
import FeatureClass from './FeatureClass';
import Context from '../context/Context';
import '../styles/Filter.css';

export class Filter extends Component {
    static contextType = Context;

    render() {
        return (
            <div>
                <h1>Filter Results</h1>
                {this.context.results.length > 0 && (
                    <>
                        <h2>Classes</h2>    
                        <ul className="filter-classes-ul">
                            <li className="clear-all-facets">
                                <button onClick={this.context.clearAllCheckedFacets}>
                                    Clear all
                                </button>
                            </li>
                            {this.context.filterClasses.map((fc, i) => (
                                <FeatureClass
                                    name={fc.name}
                                    count={fc.count}
                                    key={fc.id}
                                    id={fc.id}
                                    checked={fc.checked}
                                />
                            ))}
                        </ul>

                        <h2>Location</h2>
                    </>
                )}
            </div>
        );
    }
}

export default Filter;



// function arraysEqual(arr1, arr2) {
//     if(arr1.length !== arr2.length)
//         return false;
//     for(var i = arr1.length; i--;) {
//         if(arr1[i] !== arr2[i])
//             return false;
//     }

//     return true;
// }


// builtFilter = (color, category, priceFrom, priceTo) => {
//     let filter = `&$filter=discontinueDate eq null`;
//     if (color) {
//         filter += ` and color eq ${color}`;
//     }
//     if (category) {
//         filter += ` and categoryName eq ${category}`;
//     }
//     if (priceFrom) {
//         filter += ` and listPrice ge ${100}`;
//     }
//     if (priceTo && priceTo > 0) {
//         filter += ` and listPrice le ${200}`;
//     }
//     return filter;
// };