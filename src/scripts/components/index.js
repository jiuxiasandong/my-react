import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import App from "./app"
import Register from "./register"
import Login from "./login"
import AddDiary from "./addDiary"
import Detail from "./detail"
import Guide from "./guide"

export default class IndexComponent extends Component {
    render() {
        return (
            <div>
                <Route
                    render={
                        ({ location, history }) => (
                            <Switch location={location}>
                                <Route path="/guide" exact  component={Guide} />
                                <Route path="/app/:tab?" component={App} />
                                <Route path="/diary/add" component={AddDiary} />
                                <Route path="/diary/detail/:id?/:index?" component={Detail} />
                                <Route path="/register" component={Register} />
                                <Route path="/login" component={Login} />
                                <Route render={
                                    () => {
                                        return <Redirect to="/login" />
                                    }
                                } />
                            </Switch>
                        )
                    }
                />
            </div>
        )
    }
}
