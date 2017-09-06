//render modal body + footer
import React, { Component } from 'react';
import MenuItem from '../SideMenu/MenuItem';
import config from '../../core/config';
import { connect } from "react-redux";
import * as actions from '../../actions';
import { Button, Modal, } from 'react-bootstrap';

class SettingNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuitem : config.menu_items
        }

    }

    render() {
        return (
          <div className="modalbody">
            <Modal.Body>
            <div className="setting-user-info">
              <ul>
                <li>77C086378</li>
                <li>Nguyễn Văn Sự</li>
              </ul>
            </div>
            <hr/>

            <div className='setting-panel'>
              <div className="setting-title">
                Cài đặt
              </div>

              <div className="setting-language">
                <div className="col-xs-4">
                  Ngôn ngữ
                </div>
              <div className="col-xs-8">
                <span>
                <img onClick={e => this.onChangeConfig(e, 'en', 'light')}
                  className="setting-btn btn-language"
                  id="en"
                  src={require('../../assets/images/en.png')}/>

                <img onClick={e => this.onChangeConfig(e, 'vi', 'light')}
                  className="setting-btn btn-language selected"
                  id="vi"
                  src={require('../../assets/images/vi.png')}/>


                </span>
              </div>
              <div className="clearfix"></div>

            </div>

            <div className="setting-theme">
              <div className="col-xs-4">
                Giao diện
              </div>

              <div className="col-xs-8">
                <div>
                  <img onClick={e => this.onChangeConfig(e, 'en', 'light')}
                    className="setting-btn btn-theme selected"
                    id="light"
                    src={require('../../assets/images/dark.png')}/>

                  <img onClick={e => this.onChangeConfig(e, 'vi', 'light')}
                    className="setting-btn btn-theme"
                    id="dark"
                    src={require('../../assets/images/white.png')}/>
                </div>

                <div>
                  <img onClick={e => this.onChangeConfig(e, 'en', 'light')}
                    className="setting-btn btn-theme"
                    id="blue"
                    src={require('../../assets/images/green.png')}/>

                  <img onClick={e => this.onChangeConfig(e, 'vi', 'light')}
                    className="setting-btn btn-theme"
                    id="brown"
                    src={require('../../assets/images/red.png')}/>
                </div>

              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Cancel</Button>
          </Modal.Footer>
        </div>
        );
    }

    onChangeConfig(e, language, style){
        let tmp = e.target.className.split(' ')
        let selected = tmp[tmp.length - 1]
        if(selected === 'selected')
            return

        var classList = document.getElementsByClassName(selected)

        for(var i = 0; i < classList.length; i++){

            document.getElementById(classList[i].id).className =
                document.getElementById(classList[i].id).className.replace(' selected', '')
        }

        document.getElementById(e.target.id).className =
                document.getElementById(e.target.id).className + ' selected'
        this.props.changeConfig(language, style)
    }
}

const mapStateToProps = state => ({
    language: state.config.language,
    style: state.config.style,
});

const mapDispatchToProps = (dispatch, props) => ({
    changeConfig: (lang, theme) => {dispatch(actions.changeConfig(lang,theme))},
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingNav)
