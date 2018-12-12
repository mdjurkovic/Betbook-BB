import React from 'react';
import {render} from 'react-dom';

import './../scss/main.scss';

import User from './components/User.jsx';
import Test from './components/test';

class App extends React.Component {
    render() {
        return (
            <div className="home">
                <User/>
                <Test someparam={'hello test'}/>
                <p>Welcome to the ReactJS and ExpressJS generator</p>
                <p>Check out the <a
                    href="https://github.com/kevin-wynn/reactjs-express-generator/wiki">documentation</a> to get
                    started.</p>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
