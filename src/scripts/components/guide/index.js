import React, { Component } from "react";
import { Carousel, Toast } from 'antd-mobile';
import p1 from "../../../assets/images/slide1.png";
import p2 from "../../../assets/images/slide2.png";
import p3 from "../../../assets/images/slide3.png";

export default class Guide extends Component {
    state = {
        data: [p1, p2, p3],
        imgHeight: 176,
        slideIndex: 0,
    }

    componentWillMount() {
        const { history } = this.props;
        if (localStorage.reactCount) {
            // 访问
            localStorage.reactCount++;
            history.push("/app/diary");
        } else {
            // 未访问
            localStorage.reactCount = 1;
        }
    }
    render() {
        const { history } = this.props;
        return (
            <Carousel
                autoplay={false}
                infinite
                selectedIndex={0}
                afterChange={index => {
                    if (index == 2) {
                        Toast.info("即将跳转登陆页面", 1);
                        setTimeout(() => {
                            history.push('/login')
                        }, 500)
                    }
                }}
            >
                {this.state.data.map((item, index) => (
                    <a
                        key={index}
                        href="javascript:;"
                        style={{ display: 'inline-block', width: '100%', }}
                    >
                        <img
                            key={index}
                            src={item}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }
} 