import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Head from "../head";
import { getMydiary, getTex, deleteItemById, showDel, showIcon } from "../../actions";
import "../../../styles/page/mydiary.scss";

@connect(
    state => (
        { ...state }
    )
)
export default class Diary extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(showIcon(true, false, false));
        getMydiary(dispatch);
    }
    render() {
        return (
            <div>
                <Head title="全部" />
                <MyList />
            </div>
        )
    }
}

@connect(
    state => (
        { ...state }
    )
)
class MyList extends Component {
    change = () => {
        const { dispatch } = this.props;
        dispatch(getTex());
    }
    render() {
        const { myList, dispatch } = this.props;
        var items = myList.map((item, index) => {
            return (
                <div key={index} className="myList" id={item._id}
                    onTouchMove={() => { showDel(index) }}
                >
                    <div className="line"></div>
                    <div className="left">
                        <div className="trigon"></div>
                        <div className="circle"></div>
                        <div className="top"><span>{item.time.day}</span><span>{item.time.week}</span></div>
                        <div className="bottom"><span>{item.time.year}.{item.time.month}</span></div>
                    </div>
                    <Link className="right"
                        to={"/diary/detail/" + item._id + "/" + index}
                    >
                        <p className="tex">{item.txt}</p>
                        <div className="location">{item.time.hours}:{item.time.minutes} {item.location}</div>
                    </Link>
                    <div className="delete iconfont icon-delete"
                        onClick={() => { deleteItemById(dispatch, item._id) }}
                    ></div>
                </div>
            )
        })

        return (
            <div className="allList">
                {items.length > 0 ? items : <h3 style={{ textAlign: "center" }}>无结果</h3>}
            </div>
        )
    }
}