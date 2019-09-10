import React from 'react';
import '../../../src/style/betbook/detailed-competitionlisting.scss';
import {Link} from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "../../../_old/src/app/components/common/betSlip/betSlip.component";
import Checkbox from "@material-ui/core/Checkbox";
import Loader from "../components/loader";

class User_Favourite_Leagues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            realData: [],
            loaded: false,
            remove:[]
        };
        this.sharedObj = props.sharedObj;
        this.countryId = props.match.params.countryid;
    }

    componentDidMount() {
        this.getAllLeagues();
        this.state.realData.forEach(league => {
            league['checked'] = true;
        })
    }

    addCheckboxState = (res) => {
        res.forEach(league => {
            league['checked'] = true;
        });
        this.setState({realData:res})
    };

    getAllLeagues = () => {
        this.sharedObj.apiHelper.home(localStorage.getItem('user_id'),(res) => {
            this.addCheckboxState(res);
            this.sharedObj.headerInstance.setTitle('Favourite Leagues');
            this.sharedObj.footerInstance.setActive('star');
            this.setState({loaded:true});
        });
    };


    handleRemoveClick = (data,index) => {
        let update = [...this.state.realData];
        if(data.checked){
            update[index].checked = false;
            this.sharedObj.apiHelper.favourites.delete(data.id);
            this.setState({realData: update})
        }

        else {
            update[index].checked = true;
            this.sharedObj.apiHelper.favourites.update(localStorage.getItem('user_id'),data.league.id);
            this.setState({realData: update})
        }
    };

    handleFirstTimeLogin = () => {
        return <><Link to={`/countries`}>
            <div className='hs_select-box'><span className='text26-white'>Select your favourite leagues and start your journey</span>
            </div>
        </Link></>
    };

    renderFavouriteLeagues = () => {

        //star class checked  - "star_checked" not checked - "star"

        return  <div className='leagues-container'>
            {this.state.realData.map((data,index) => <div key={data.id + '_'} className='league-field'>
                <div className='logo-container'>
                    {data.league && data.league.logo ? <img className='logo' src={'./assets/images/Logos/'+data.league.logo+''}  alt=''/> : <img className='logo' src={'./assets/images/alternative-logo.png'}  alt=''/>}
                    <img className='logo' src={'./assets/images/Logos/'+data.league.logo+''}  alt=''/>
                </div>
                <div className='leagues-info'>
                    <div className='league-name'><span className='text18-white'> {data.league.name}</span>

                        {/*<input type="checkbox" name="favourite" onClick={() => this.handleRemoveClick(data,index)} defaultChecked={true}/>*/}
                    </div>
                </div>
                <div className={'league_favorite_action'}>
                    <div className='star_checked'>
                                            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.2763 15.8151L26.5625 9.73236L17.985 9.12409C17.6776 9.09367 17.4009 8.91119 17.2779 8.63747L13.2812 0L9.28458 8.63747C9.1616 8.91119 8.88491 9.09367 8.57747 9.12409L0 9.73236L7.28624 15.8151C7.53219 16.028 7.65516 16.3625 7.56293 16.6667L5.19567 25L12.8508 20.1034C13.1275 19.9209 13.4965 19.9209 13.7731 20.1034L21.4283 25L19.0611 16.6363C18.9073 16.3625 19.0303 16.028 19.2763 15.8151Z" stroke="white"/>
                    </svg>
                    </div>
                </div>
            </div>)}
        </div>
    }

    render() {

        if (this.state.loaded) return (
            <div className='betbook_screen'>
                <div className='main-content'>
                    {this.state.realData.length == 0 ?
                    this.handleFirstTimeLogin()
                    :
                    this.renderFavouriteLeagues()}

                </div>
            </div>
        );
        else {
            return <Loader/>
        }

    }
}

export default User_Favourite_Leagues;