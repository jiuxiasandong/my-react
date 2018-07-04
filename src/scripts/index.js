//渲染组件
import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import IndexComponent from "./components";

const hotRender = Component => {
    render(
        <Provider store={store}>
            <Router>
                <Component />
            </Router>
        </Provider>,
        document.getElementById("app")
    )
}

hotRender(IndexComponent)