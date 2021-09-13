import React from 'react';

export default function Chat() {
    return (
        <div>
            <h1>CHAT</h1>
            <button onClick={() => sessionStorage.clear()}>logout</button>
        </div>
    );
}
