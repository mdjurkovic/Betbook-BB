import React from 'react';
import '../../../src/style/betbook/matchdetails.scss';
import '../../../src/style/app.scss';
import ticketHelper from "../data/ticketHelper";
class Match_Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded:false,
            realData:[]
        };
        this.sharedObj = props.sharedObj;
        this.fixtureId = props.match.params.fixtureid;
    }

    componentDidMount() {
        this.getFixtureById();
    };

    getFixtureById(){
        this.sharedObj.apiHelper.fixture.getByID(this.fixtureId,(res) => {
            this.setState({realData:res,loaded:true})
        });
    };

    handleBidClick = (game,tip,className) => {
        if(this.state.realData.ticket) {

            let data = this.state.realData['ticket'];
            let updated = this.state.realData;
            let id = this.state.realData.ticket['id'];

            if (className != 'bid-field bided') {
                data[game + '_tip'] = tip;
                data[game + '_odd'] = this.state.realData[game + '_' + tip];
            } else {
                data[game + '_tip'] = null;
                data[game + '_odd'] = 0;
            }

            updated['ticket'] = data;
            this.setState({realData: updated});
            this.sharedObj.apiHelper.bids.updateFixtureBids(id, {updated});
        }

        else {
            let ticket = this.handleReturnTicket();
            ticket.fixture_id = this.state.realData.id;
            ticket.user_id = 7;
            ticket[game + '_tip'] = tip;
            ticket[game + '_odd'] = this.state.realData[game + '_' + tip];

            this.handleCreateTicket(ticket);
        }
    };

    handleReturnTicket = () => {
        let ticket = {
            user_id: null,
            fixture_id: null,
            game1_tip: null,
            game1_odd: 0,
            game2_tip: null,
            game2_odd: 0,
            game3_tip: null,
            game3_odd: 0,
            game4_tip: null,
            game4_odd: 0,
            bid_score: 0,
            final_score: 0
        }
        return ticket;
    };

    handleCreateTicket = (ticket) => {
        console.log(ticket)

        this.sharedObj.apiHelper.bids.createFixtureBids({ticket},(id) => {
            console.log(ticket)
            ticket['id'] = id;

            this.setState(prevState => ({
                realData:{
                    ...prevState.realData,
                    ticket: ticket,
                }
            }));
        });
    };

    handleBidState = (game,tip,bidfield) => {
        let className = bidfield;
        if (this.state.realData.result && this.state.realData.result[game + '_' + tip] == 1) {
            className += ' won';
        }
        if (this.state.realData.ticket) {
            if (this.state.realData.ticket[game + '_tip'] == tip) {
                className += ' bided';
            }

            if (this.state.realData.ticket[game + '_tip'] == tip && this.state.realData.result) {
                if (this.state.realData.result.is_finished == 1) {
                    if (className.includes('won')) {
                        className += ' green'
                    } else className += ' red'
                }
            }
        }
        return className;
    };

    handleBidType = (label, game, tip, bidfield) => {//OVDE PROMENI !THIS.STATE.REALDATA.RESULT

        let className = this.handleBidState(game,tip,bidfield);

        return <div className={className} onClick = {this.state.realData.result ? () => this.handleBidClick(game,tip,className) : () =>{}}>
            <div className='game-bid-align'>
            <div className='game-text'><span className='text11-grey'>{label}</span></div>
            <div className='bid-text'><span className='text15-white'>{this.state.realData[game + '_' + tip]}</span></div>
            </div>
        </div>
    };

    renderMatchDetails = () => {
        return <div className='match-details-field'>
            <div className='md_league-week-details'><span className='text11-grey'>{this.state.realData.date}</span></div>
            <div className='md_league_match_fixture'>
                <div className='md_home-team-field'><img className='logo' src={'./assets/images/Teams/' + this.state.realData.team_home.logo} />
                    <div className='home-text-field'><span className='text18-white'>{this.state.realData.team_home.name}</span>

                    </div>
                </div>

                <div className='md_vs-field'>
                    <div className={this.state.realData.result ? 'result' : 'hidden'}>
                        <div className='text18-white result'>{this.state.realData.result ? this.state.realData.result.ft_home_goals : "4"} : {this.state.realData.result ? this.state.realData.result.ft_away_goals : "1"}</div>
                        <div><span className='text12-white ht-result'>{this.state.realData.result ? this.state.realData.result.ht_home_goals : "0"} : {this.state.realData.result ? this.state.realData.result.ht_away_goals : "1"}</span></div>
                    </div>
                    <div
                        className={(this.state.realData.result && this.state.realData.result.is_finished == false) ? 'minuteLive' : 'hidden'}><span
                        className={(this.state.realData.result && this.state.realData.result.is_finished == false) ? 'text18' : 'hidden'}>'{this.state.realData.result ? this.state.realData.result.elapsed : ''}<br/><span
                        className='text18-red-field'>* LIVE *</span></span>
                    </div>
                    <div className='time-date-field'><span
                        className={!this.state.realData.result ? 'text11-grey' : 'hidden'}>{this.state.realData.dateTime}</span>
                    </div>
                </div>
                <div className='md_away-team-field'>
                    <img className='logo' src={'./assets/images/Teams/' + this.state.realData.team_away.logo}/>
                    <div className='home-text-field'><span
                        className='text18-white'>{this.state.realData.team_away.name}</span></div>
                </div>
            </div>
        </div>
    };

    renderBidFieldDetails = () => {
        return <div className='scrolable-bids-field'>
            <div className='full-time-result-field'>
                <div className='main-titlle-field'>
                    <div className='ft_text_position'><span className='text12-grey'>Match Outcome</span></div>
                    <div className='game-underline'/>
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('1', 'game1', '1', 'bid-field')}
                    {this.handleBidType('X', 'game1', 'x', 'bid-field')}
                    {this.handleBidType('2', 'game1', '2', 'bid-field')}
                </div>
            </div>
            <div className='match-goals-field'>
                <div className='main-titlle-field'>
                    <div className='ft_text_position'><span className='text12-grey'>Match Goals</span></div>
                    <div className='game-underline'/>
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('0-1', 'game2', '1', 'bid-field')}
                    {this.handleBidType('0-2', 'game2', '2', 'bid-field')}
                    {this.handleBidType('0-3', 'game2', '3', 'bid-field')}
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('2+HT', 'game2', '2ht', 'bid-field')}
                    {this.handleBidType('2+FT', 'game2', '2ft', 'bid-field')}
                    {this.handleBidType('3+FT', 'game2', '3ft', 'bid-field')}
                    {this.handleBidType('4+FT', 'game2', '4ft', 'bid-field')}
                </div>
            </div>
            <div className='both-teams-goals-field'>
                <div className='main-titlle-field'>
                    <div className='ft_text_position'><span className='text12-grey'>Both Team Goals</span>
                        <div className='game-underline'/>
                    </div>
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('YES', 'game3', 'gg', 'bid-field')}
                    {this.handleBidType('NO', 'game3', 'notgg', 'bid-field')}
                </div>
            </div>
            <div className='ht-ft-result-field'>
                <div className='main-titlle-field'>
                    <div className='ft_text_position'><span className='text12-grey'>Half / Full Time Result</span>
                        <div className='game-underline'/>
                    </div>
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('1-1', 'game4', '11', 'bid-field')}
                    {this.handleBidType('1-X', 'game4', '1x', 'bid-field')}
                    {this.handleBidType('1-2', 'game4', '12', 'bid-field')}
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('X-1', 'game4', 'x1', 'bid-field')}
                    {this.handleBidType('X-X', 'game4', 'xx', 'bid-field')}
                    {this.handleBidType('X-2', 'game4', 'x2', 'bid-field')}
                </div>
                <div className='md_bid-box'>
                    {this.handleBidType('2-1', 'game4', '21', 'bid-field')}
                    {this.handleBidType('2-X', 'game4', '2x', 'bid-field')}
                    {this.handleBidType('2-2', 'game4', '22', 'bid-field')}
                </div>
            </div>
        </div>
    };


    renderStateCompopnent = () => {
        this.sharedObj.headerInstance.setTitle(this.state.realData.round.name);

        let classState ='betbook_screen';

        if(this.state.realData.result){
            if(this.state.realData.result.is_finished == false){
                classState += ' live'
            }
            else classState += ' finished'
        }
        else classState += ' upcoming';

        return(
        <div className='betbook-context'>
            <div className={classState}>

            {this.renderMatchDetails()}
            {this.renderBidFieldDetails()}

            </div>
        </div>
        )
    };

    render() {
        return <>{this.state.loaded == true ? this.renderStateCompopnent() : <div/>}</>
    }
}

export default Match_Details;
