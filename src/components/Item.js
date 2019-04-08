import React from 'react';
import Context from '../context/Context';
import '../styles/Item.css';

class Item extends React.Component {
    static contextType = Context;

    componentWillMount() {
        if (this.context.results.length === 0) {
            this.props.history.push('/');
        }
    }

    outputContent = result => (
        <div className="grid-container">
            <div className="name">{result.FEATURE_NAME}</div>
            <div className="class-name">
            Classification: &nbsp;
            <em>{result.FEATURE_CLASS}</em>
            </div>
            <div className="map-name">{result.MAP_NAME}, {result.STATE_ALPHA}</div>
            <div className="description">
            <h3>Description:</h3>
            <p className="description-text">{result.DESCRIPTION}</p>
            </div>
            <div className="google-map">Google Map</div>
            <div className="history">{result.HISTORY}</div>
        </div>
    );

    render() {
        return (
            <Context.Consumer>
                {context => {
                    if (context.results.length !== 0) {
                        return (
                            <>
                                {this.outputContent(
                                    context.results.find(
                                        result =>
                                            result.FEATURE_ID ===
                                            this.props.match.params.id
                                    )
                                )}
                            </>
                        );
                    }
                }}
            </Context.Consumer>
        );
    }
}

export default Item;
