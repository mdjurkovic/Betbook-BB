import React from 'react';
import '../../../style/components/objectcontrols/profileshort.scss';

class ProfileShort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.user
        };
    }

    render() {
        return (
            <div>
                <div className='ps_screen'>
                {/*<div className='ps_member-image'><img src='./assets/images/profile_pic-small.png'/></div>*/}
                <div className='ps_member-name'>
                    <div className='ps_name'><span className='text17-white'>{this.props.user.username}</span></div>
                    <div className='ps_points'><span className='text12-grey'>{this.props.user.country.name}</span></div>
                </div>
                </div>
            </div>
        )
    }
}

export default ProfileShort;