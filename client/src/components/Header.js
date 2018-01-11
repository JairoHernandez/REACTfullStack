import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return; // Dont want to show anything in Header.
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        //console.log('Header this.props:', this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        className="left-brand-logo" 
                        to={this.props.auth ? '/surveys' : '/'}
                    > Emaily
                    </Link>

                    <ul className="right">
                            {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// 'state' is entire state object out of redux store. It contains 'auth' object
// GOAL is to return a full object.
// function mapStateToProps(state) {
//     console.log('mapStateToProps:', state); // {auth: {__v: 0, _id: "123", googleId: "abc123"}}
//                                             // auth key comes reducers/index.js
//     return { auth: state.auth }; // returns exact object with curly braces.
// }

// REFACTOR(ES6 destructure)
function mapStateToProps({auth}) { // auth is being destructured by putting curly braces around it  
                                   // {auth} is equivalent to {auth: auth}
    console.log('mapStateToProps:', {auth}); // auth key comes reducers/index.js
    return { auth }; // returns exact object with curly braces, which is same as {auth: auth}.
}

export default connect(mapStateToProps)(Header);