import React from 'react';
import { Row, Col, Table, Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions'

class StatusBar extends React.Component {
	constructor() {
		super()
	}

	componentWillMount() {
	}

	render() {
        return(
            <div id="status-bar">
                <div className="connection-status open">
                    <span className="glyphicon glyphicon-signal"></span>
                </div>
                <div className="widget-search">
                    <input type="text" className="form-control" placeholder="Menu" />
                </div>


                <div className="user-action">
                    <span className="glyphicon glyphicon-user"></span>
                    <span className="glyphicon glyphicon-cog" onClick={this.openSetting.bind(this)}></span>
                    <span className="glyphicon glyphicon-log-out"></span>
                   
                </div>
            </div>

        )
	}

	componentDidMount() {
    }
    
    openSetting(e){
        document.getElementById('settingnav').classList.toggle("open")
    }

}


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch, props) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)