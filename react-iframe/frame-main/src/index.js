import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import AM from './3.539c640e.chunk.js'

const app = import('./App');
require('./3.539c640e.chunk.js').then(res=>{
    console.log(res);
})
// const Test = lazy(() => import('./3.539c640e.chunk'));
app.then(res => {
    console.log(res);
    const C = res.default;
    ReactDOM.render((
        <Suspense fallback="loading...">
            <div>
                <C />
            
            </div>
        </Suspense>
    ), document.getElementById('root'));
})
