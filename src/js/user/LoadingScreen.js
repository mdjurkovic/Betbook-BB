import React from 'react';
import '../../../src/style/betbook/user/loading-screen.scss'

class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

        return (
            <div className='betbook-screen-loading'>
                <div className='betbook-logo-box'><img src='./assets/images/betbook---logo.png'/></div>
            </div>
        )
    }
}

export default LoadingScreen;
