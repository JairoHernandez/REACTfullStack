import React, { Component } from 'react';
// BrowserRouter is the brains of react-router and tells it how to behave.
// It looks at current URL and changes set of components visible on the screen.
// Route component sets up a rule between user visited route and visible set of components.
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // bridges communication between the two.
import * as actions from '../actions';


/**Setup Dummy Components 
const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;*/

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
const SurveyNew = () => <h2>SurveyNew</h2>;

// const App = () => {
class App extends Component {

    // When App first boots action creator is called.
    // Executes after component has finished loading.
    componentDidMount() {
        // tied in with connect() below to allow seeing fetchUser from actions/index.js
        this.props.fetchUser(); 
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// 1st is map-state-to-prop function <-- null
// 2nd options is action creator(s) being passed
// 'actions' is now assigned to App component as this.props
// thus are accessible with this.props.
export default connect(null, actions)(App); 