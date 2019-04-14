import React, {Component} from 'react';
import FeatureClass from './FeatureClass';
import Context from '../context/Context';
import '../styles/Filter.css';
import uniqid from 'uniqid';

export class Filter extends Component {
    static contextType = Context;

    render() {
        return (
            <>
                <h1>Filter Results</h1>
                <>
                    <h2>Classes</h2>
                    <ul className="filter-classes-ul">
                        <li className="clear-all-facets">
                            <button
                                onClick={this.context.clearAllCheckedFacets}
                            >
                                Clear all
                            </button>
                        </li>

                        {this.context.checkedFacets.length > 0 && (
                            <>
                                <h3><em>Checked Facets</em></h3>
                                {this.context.checkedFacets.map(
                                    (checkedFacet, i) => (
                                        <li className="checked-facets-display" key={i}><button onClick={this.context.clearCheckedFacet.bind(this, checkedFacet)}><span>&times;</span></button>{checkedFacet}</li>
                                    )
                                )}
                            </>
                        )}

                        {this.context.featureClasses.map((fc, i) => (
                            <FeatureClass
                                featureClass={fc}
                                key={uniqid()}
                            />
                        ))}
    
                    </ul>

                    <h2>Location</h2>
                </>
            </>
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
