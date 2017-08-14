import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import PageContent from "./PageContent";
import FooterPagination from "./FooterPagination";
import MenuItem from "./MenuBar/MenuItem"
import ToggleButton from './MenuBar/ToggleButton'
import config from '../core/config'

class MenuBar extends React.Component {
  constructor(props) {
    super(props)
    this.menuitem = config.menu_items
  }
  
  onRemove(e) {
    this.props.onRemoveTab(
      e.target.id,
      this.props.pageId,
      this.props.tabList,
      this.props.reload
    );
  }

  onPageClicked(e) {
    var pageId = e.target.id;
    this.props.onPageClicked(pageId, this.props.tabList);
  }

  onMenuSelected(e){
    console.log(e.target.id)
    var eventKey = e.target.id
    var isExist = false;

    for (var i = 1; i <= this.props.tabList.length; i++) {
      if (
        this.props.tabList[i] !== undefined &&
        this.props.tabList[i].filter(el => el === eventKey).length === 1
      ) {
        isExist = true;
        break;
      }
    }

    if (!isExist)
      this.props.onSelect(
        eventKey,
        this.props.pageId,
        this.props.tabList,
        this.props.reload
      );
    else console.log("Exist");
  }

  render() {
    console.log('menu bar',  this.props);
    return (
      <div>
        <nav className="navbar navbar-default" style={this.props.theme.background}>
          <div className="container-fluid">
            <ToggleButton/>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <MenuItem 
              menu_items={this.menuitem} 
              theme={this.props.theme} 
              language={this.props.language} 
              onMenuSelected={this.onMenuSelected.bind(this)}/>
              <ul className="nav navbar-nav navbar-right">
                <li><a style={this.props.theme.normal} href="#">{this.props.language.savelayout}</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <FooterPagination
            tabList={this.props.tabList[this.props.pageId]}
            page={this.props.pageId}
            onRemove={this.onRemove.bind(this)}
            onPageClicked={this.onPageClicked.bind(this)}
            title={this.props.language}
            theme={this.props.theme}
        />  
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabList: state.menuSelected.tabList,
  pageId: state.menuSelected.page,
  reload: state.menuSelected.reload,
});

const mapDispatchToProps = (dispatch, props) => ({
  onSelect: (menuid, pageid, tabList, reload) => {
    dispatch(actions.menuSelected(menuid, pageid, tabList, reload));
  },

  onRemoveTab: (menuid, pageid, tabList, reload) => {
    dispatch(actions.menuRemoved(menuid, pageid, tabList, reload));
  },

  onPageClicked: (pageid, tabList) => {
    dispatch(actions.onPageClicked(pageid, tabList));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
