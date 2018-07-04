import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Diary from "../diary";
import Find from "../find";
import Mine from "../mine";
import Foot from "../foot";

export default class App extends Component {
    render() {
        return (
            <div className="section">
                <Switch>
                    <Route path="/app/diary" component={Diary} />
                    <Route path="/app/find" component={Find} />
                    <Route path="/app/mine" component={Mine} />
                    <Route render={
                        ({ match }) => <Redirect to="/app/diary" />
                    } />
                </Switch>
                <Foot />
            </div>
        )
    }
}