import React from 'react';
import '../../../src/style/betbook/matchdetails.scss';
import '../../../src/style/app.scss';

class Match_Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data:null,
            loaded:false
        };
        this.sharedObj = props.sharedObj;
    }

    componentDidMount() {
        this.sharedObj.apiHelper.match.getByID(1, this.handleMatchLoaded);
    }

    handleMatchLoaded = (data) => {
        this.setState({data, loaded: true});
    }

    renderGameTip = (label, game, tip, bidfield) => {
        let className = bidfield;
        if (this.state.data.results && this.state.data.results[game + '_' + tip]) {
            className += ' won';
        }
        if (this.state.data.ticket) {
            if (this.state.data.ticket[game + '_tip'] == tip) {
                className += ' bided';
            }

            if (this.state.data.ticket[game + '_tip'] == tip && this.state.data.results != null) {
                if (this.state.data.results.finished) {
                    if (className.includes('won')) {
                        className += ' green'
                    } else className += ' red'
                }
            }
        }
        return <div className={className}>
            <div className='col-3_game-field'><span
                className={this.state.data.ticket ? (this.state.data.ticket[game + '_tip'] == tip ? 'text12-white' : 'text12') : 'text12'}>{label}</span></div>
            <div className='col-3_bid-field'><span
                className={this.state.data.ticket ? (this.state.data.ticket[game + '_tip'] == tip ? 'text12-white' : 'text12') : 'text12'}>{this.state.data.match[game + '_' + tip]}</span></div>
        </div>
    };


    renderStateCompopnent = () => {
        let classState ='betbook_screen';
        if(this.state.data.results){
            if(this.state.data.results.finished == false){
                classState += ' live'
            }
            else classState += ' finished'
        }
        else classState += ' upcoming';

        return <div className={classState}>
            <div className='match-details-field'>
                <div className='md_home-team-field'><img src={this.state.data.match.home_logo}/>
                    <div className='home-text-field'><span className='text18'>{this.state.data.match.club_home}</span>
                    </div>
                    <div className='place-field'><span className='text10'>1st place</span></div>
                </div>
                <div className='md_league-week-details'><span className='text12'>{this.state.data.competition.name + ' ' + this.state.data.week.name}</span></div>
                <div className='md_date-time-vs-field'>
                    <div className={this.state.data.results == null ? 'vs-datetime-field' : 'hidden'}><span
                        className='text18'>VS</span>
                    </div>
                    <div className={this.state.data.results != null ?
                        'vs-datetime-field-result' :
                        'hidden'}>
                        <span className='text25'>{this.state.data.match.upcoming == false ? this.state.data.results.goals_home_ft : ""} : {this.state.data.match.upcoming == false ? this.state.data.results.goals_away_ft : ""}</span>
                        <div><span className='text12'>({this.state.data.match.upcoming == false ? this.state.data.results.goals_home_ht : ""} : {this.state.data.match.upcoming == false ? this.state.data.results.goals_away_ht : ""})</span></div>
                    </div>
                    <div
                        className={(this.state.data.match.upcoming == false) ? 'minuteLive' : 'hidden'}><span
                        className={(this.state.data.match.upcoming == false && this.state.data.results.finished == false) ? 'text18' : 'hidden'}>'{this.state.data.results ? this.state.data.results.current_min : ''}<br/><span
                        className='text18-red-field'>* LIVE *</span></span></div>
                    <div className='time-date-field'><span
                        className={this.state.data.results == null ? 'text10' : 'hidden'}>{this.state.data.match.dateTime}</span>
                    </div>
                    <div className='location-field'><span className='text10'>{this.state.data.match.playground}</span>
                    </div>
                </div>
                <div className='md_away-team-field'>
                    <img src={this.state.data.match.away_logo}/>
                    <div className='home-text-field'><span
                        className='text18'>{this.state.data.match.club_away}</span></div>
                    <div className='place-field'><span
                        className='text10'>2nd place</span></div>
                </div>
            </div>
            <div className='scrolable-bids-field'>
                <div className='full-time-result-field'>
                    <div className='main-titlle-field'>
                        <div className='ft_text_position'><span className='text12'>Fulltime Result</span>
                        </div>
                    </div>
                    <div className='col-3-bid-field'>
                        {this.renderGameTip('1', 'game1', '1', 'bid-1-field')}
                        {this.renderGameTip('X', 'game1', 'x', 'bid-2-field')}
                        {this.renderGameTip('2', 'game1', '2', 'bid-1-field')}
                    </div>
                </div>
                <div className='match-goals-field'>
                    <div className='main-titlle-field'>
                        <div className='ft_text_position'><span className='text12'>Match Goals</span>
                        </div>
                    </div>
                    <div className='col-3-bid-field' style={{borderBottom: '0.5px solid #cfcfcf'}}>

                        {this.renderGameTip('0-1', 'game2', '1', 'bid-1-field')}
                        {this.renderGameTip('0-2', 'game2', '2', 'bid-2-field')}
                        {this.renderGameTip('0-3', 'game2', '3', 'bid-1-field')}
                    </div>
                    <div className='col-4-bid-field'>
                        {this.renderGameTip('2+HT', 'game2', '2ht', 'bid-1-field')}
                        {this.renderGameTip('2+FT', 'game2', '2ft', 'bid-2-field')}
                        {this.renderGameTip('3+FT', 'game2', '3ft', 'bid-3-field')}
                        {this.renderGameTip('4+FT', 'game2', '4ft', 'bid-1-field')}
                    </div>
                </div>
                <div className='both-teams-goals-field'>
                    <div className='main-titlle-field'>
                        <div className='ft_text_position'><span className='text12'>Both Team Goals</span>
                        </div>
                    </div>
                    <div className='col-2-bid-field'>
                        {this.renderGameTip('GG', 'game3', 'gg', 'bid-2-field')}
                        {this.renderGameTip('GG3+', 'game3', 'gg3p', 'bid-2-field')}
                    </div>
                </div>
                <div className='ht-ft-result-field'>
                    <div className='main-titlle-field'>
                        <div className='ft_text_position'><span className='text12'>Half / Full Time Result</span>
                        </div>
                    </div>
                    <div className='col-3-bid-field' style={{borderBottom: '1px solid #cfcfcf'}}>
                        {this.renderGameTip('1-1', 'game4', '11', 'bid-1-field')}
                        {this.renderGameTip('1-X', 'game4', '1x', 'bid-2-field')}
                        {this.renderGameTip('1-2', 'game4', '12', 'bid-1-field')}
                    </div>
                    <div className='col-3-bid-field' style={{borderBottom: '1px solid #cfcfcf'}}>
                        {this.renderGameTip('X-1', 'game4', 'x1', 'bid-1-field')}
                        {this.renderGameTip('X-X', 'game4', 'xx', 'bid-2-field')}
                        {this.renderGameTip('X-2', 'game4', 'x2', 'bid-1-field')}
                    </div>
                    <div className='col-3-bid-field' style={{borderBottom: '1px solid #cfcfcf'}}>
                        {this.renderGameTip('2-1', 'game4', '21', 'bid-1-field')}
                        {this.renderGameTip('2-X', 'game4', '2x', 'bid-2-field')}
                        {this.renderGameTip('2-2', 'game4', '22', 'bid-1-field')}
                    </div>
                </div>
            </div>
            {/*<div className='bet-slip-field-blue'>*/}
            {/*    <div className='bet-text-field'><span className='text14'>BIDS</span></div>*/}
            {/*    <div className='white-circle'>*/}
            {/*        <div className={'number-played-games-field'}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    }

    render() {
        return <div>{this.state.loaded == true ? this.renderStateCompopnent() : <div/>}</div>
    }
}

export default Match_Details;
