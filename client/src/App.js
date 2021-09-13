import React from 'react';
import {Route} from 'react-router-dom';
import Chat from './components/chat/Chat';
import Landing from './components/landing/Landing';

export default function App() {
    return (
        <div className="App">
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/chat">
                <Chat />
            </Route>
        </div>
    );
}
