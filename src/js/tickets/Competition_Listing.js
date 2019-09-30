import React from 'react';
import '../../../src/style/betbook/competitionlisting.scss';
import {Link} from "react-router-dom";
import Loader from "../components/loader";

class Competition_Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            realData: [],
            loaded: false,
        };
        this.sharedObj = props.sharedObj;
    }

    componentDidMount() {
        this.getAllCountries();
        setTimeout(() => {
            this.sharedObj.headerInstance.setItemRight('star');
            this.sharedObj.footerInstance.setActive('ball');
            this.sharedObj.headerInstance.setTitle('Countries');
        },1)
    }

    getAllCountries() {
        this.sharedObj.apiHelper.countries.getAllCurrent((res) =>{
            res.forEach((country,i) => {
                if(country.name == 'World'){
                    res.splice(i,1);
                    res.unshift(country);
                }
            });
            this.setState({realData: res, loaded: true});
     })
    }

    render() {

        if (this.state.loaded) return (
            <div className='betbook_screen'>
                <div className='main-content'>
                    <div className='countries-container'>
                        {this.state.realData.map((data) => <Link to={`country/${data.id}`} key={data.id + data.name}>
                            <div className='country-field' style={{height:(document.body.clientHeight-120)/6 - 3}}>
                                <div className='flag-container'><img className='flag' src={data.flag ? './assets/images/Countries/'+data.flag : './assets/images/alternative-logo.png'} alt=''/></div>
                                <div className='country-info'>
                                    <div className='leagues-info'><span className='text11-grey'>{data.leagues_count} {data.leagues_count == 1 ? 'League' : 'Leagues'}</span></div>
                                    <div className='dataname-info'><span className='text18-white'>{data.name}</span></div>
                                    <div className='number-matches-info'><span className='text11-grey'>{data.fixtures_count} {data.fixtures_count == 1 ? 'Match' : 'Matches'}</span></div>
                                </div>
                            </div>
                        </Link>)}
                    </div>
                </div>

            </div>
        );
        else {
            return <Loader/>
        }    }
}

export default Competition_Listing;