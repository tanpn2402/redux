import React from 'react'
import { connect } from 'react-redux'
import {Col} from 'react-bootstrap'
import * as actions from '../../actions'
import config from '../../core/config'
import $ from 'jquery'
export default class PageContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-actions">
                    <button className="glyphicon glyphicon-envelope chat-head">
                    </button>
                    <button className="glyphicon glyphicon-menu-up to-top" onClick={e => this.scrollToTop()}>
                    </button>
                </div>
                <div className="footer-links">
                    <Col xs={6}>
                        <ul>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">Download</a></li>
                            <li><a href="">Sitemap</a></li>
                        </ul>
                    </Col>
                    <Col xs={6}>
                        <ul>
                            <li><a href="">Contact us</a></li>
                            <li><a href="">...</a></li>
                        </ul>
                    </Col>
                </div>
                
                <div className="footer-info">
                    <ul>
                        <li><a href="">User Agreement</a></li>
                        <li><a href="">Privacy policy</a></li>
                        <li><a href="">Disclaimer</a></li>
                    </ul>

                    <ul>
                        <li style={{fontSize: "12px"}}>©TTL 2018 Transaction Technology Services Limited - Copyrignt - All right reserved</li>
                    </ul>
                </div>
            </div>
        )
    }

    scrollToTop() {
        $("#page-wrapper").animate({scrollTop: 0})
    }

}