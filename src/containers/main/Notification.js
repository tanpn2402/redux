import React from "react"
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import MessageBox from '../commons/MessageBox'
import FlashPopup from '../commons/FlashPopup'
import Popup from '../popup/Popup'
import * as actions from '../../actions'

export default class Notification extends React.Component {
	render() {
		return (
			<div id="notification-wrapper">
				<MessageBox theme={this.props.theme} language={this.props.language} />
				<FlashPopup language={this.props.language} />
				<Popup />
			</div>

		)
	}
}

