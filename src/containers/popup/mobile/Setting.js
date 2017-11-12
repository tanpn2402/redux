import React from 'react'
import config from '../../../core/config'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import {getLanguage, getTheme } from '../../../utils'
import {Button, Modal} from 'react-bootstrap';
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
        let theme = getTheme(config.cache.theme)
        let language = getLanguage(config.cache.lang).page

        let actived = {
            appearance: config.cache.theme,
            language: config.cache.lang
        }
        return (
            <div>
                <Modal.Body>
                    <div className="setting-list">
                        {
                            this.list.map(e => {
                                return (
                                    <div>
                                        <div data-toggle="collapse" data-target={'#' + e.id} className="st-header">
                                            <div style={{ display: 'table-cell', verticalAlign: 'middle' }} className="st-icon">
                                                <i className="material-icons md-24" style={{position: "relative", top: "2px"}}>{e.icon}</i>
                                            </div>
                                            <label style={{ display: 'table-cell', verticalAlign: 'middle', paddingLeft: '10px' }} aria-expanded="true">
                                                {language.setting[e.id].title}
                                            </label>
                                        </div>
                                        <ul id={e.id} className="nav nav-list tree setting-item collapse" aria-expanded="true">
                                            {
                                                e.value.map(v => {
                                                    return (
                                                        <li  ><a onClick={() => { this.onChangeConfig(e.id, v) }} id={v} >
                                                            {language.setting[e.id][v]}
                                                            {
                                                                v !== actived[e.id] ? null :
                                                                <div className="bullet" style={{background: "#337ab7"}}></div>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={this.props.onHide}>{language.button.close}</Button>
                </Modal.Footer>
            </div>

            
        )
    }
}

const mapStateToProps = state => ({
    language: state.config.language,
    theme: state.config.style
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