import React,{Component} from "react";
import {NavLink} from "react-router-dom";

export default class Foot extends Component{

    static defaultProps = {
        footList:[
            {path:"/app/diary",txt:"日记",icon:"icon-diary"},
            {path:"/app/find",txt:"过客",icon:"icon-list"},
            {path:"/app/mine",txt:"我的",icon:"icon-mine"},            
        ]
    }

    render(){
        const foots = this.props.footList.map((item,idx)=>{
            return (
                <div key={idx}>
                    <NavLink to={item.path} activeClassName="ft-active-1" >
                        <i className={"iconfont " + item.icon}> </i>
                        <span>{item.txt}</span>
                    </NavLink>
                </div>
            )
        })
        return(
            <footer>
                {foots}
            </footer>
        )
    }
} 