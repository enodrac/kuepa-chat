import React from 'react';
import {Route} from 'react-router-dom';

export default function App() {
    return (
        <div className="App">
            <Route exact path="/">
                <Landing />
            </Route>
        </div>
    );
}
