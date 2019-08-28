import React from 'react';
import MatchShort from '../components/match_short';
import {Link} from "react-router-dom";
import '../../style/betbook/week-games.scss';

class Week_games_Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            realData: [],
            loaded: false
        };
        this.sharedObj = props.sharedObj;
        this.leagudId = props.match.params.leagueid;
    }

    componentDidMount() {
        this.getAllFixtures();
    }

    getAllFixtures(){
        this.sharedObj.apiHelper.leagues.getByID(this.leagudId,(res) => this.setState({realData:res,loaded:true}));
    }

    renderGames = () => {
        this.sharedObj.headerInstance.setTitle(this.state.realData[0].league);
        return <div>
            <div className='game-week'><span className='text14'>{ this.state.realData[0].round.name}</span></div>
            {this.state.realData.map((fixture) => <Link to={`/fixture/${fixture.matches.id}`}> <MatchShort  match={fixture.matches}/></Link>)}
        </div>
    }

    render() {

        if(this.state.loaded) return (
            <div className='betbook_screen'>
                <div className='main-content'>
                    {this.state.loaded ? this.renderGames() : <div>Loading ... </div>}
                </div>
            </div>
        );

        else return <div>Loading...</div>
    }
}

export default Week_games_Listing;
