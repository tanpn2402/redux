import React from 'react'
import config from '../../../core/config'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.list = config.settings
    }

    onChangeConfig(id, value) {
        switch (id) {
            case 'language':
                this.props.switchLanguage(value)
                break;
            case 'appearance':
                this.props.switchTheme(value)
                break;
        }
    }

    render() {
        let actived = {
            appearance: this.props.data.theme.title,
            language: this.props.data.language.title
        }
        return (
            <div className="setting-list">
                {
                    this.list.map(e => {
                        return (
                            <div>
                                <div style={{ display: 'table' }} data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                    <div style={{ display: 'table-cell', verticalAlign: 'middle' }} className="st-icon"><i className="material-icons md-36">{e.icon}</i></div>
                                    <label style={{ display: 'table-cell', verticalAlign: 'middle', paddingLeft: '10px' }} aria-expanded="true">
                                        {this.props.language.setting[e.id].title}
                                    </label>
                                </div>
                                <ul id={e.id} className="nav nav-list tree setting-item collapse" aria-expanded="true">
                                    {
                                        e.value.map(v => {
                                            return (
                                                <li  ><a onClick={() => { this.onChangeConfig(e.id, v) }} id={v} >
                                                    {this.props.language.setting[e.id][v]}
                                                    {
                                                        v === actived[e.id] ? <i className="material-icons md-18 selected">check_box</i> : ""
                                                    }
                                                </a></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch, props) => ({
    switchLanguage: (language) => {
        dispatch(actions.switchLanguage(language))
    },
    switchTheme: (theme) => {
        dispatch(actions.switchTheme(theme))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting)