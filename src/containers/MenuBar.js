import React from 'react'
import { NavDropdown, NavItem, Nav, Navbar, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PageContent from '../components/PageContent'
import FooterPagination from './FooterPagination'


var menu_items = [
  {
    id: 'tradingplatform',
    text: 'tradingplatform',
    link: '',
    subitems: [
      {
        id: 'enterorder',
        text: "enterorder",
        link: ''
      },
      {
        id: 'stockmarketinform',
        text: 'stockmarketinform',
        link: ''
      },
      {
        id: 'watchlist',
        text: 'watchlist',
        link: ''
      },
      {
        id: 'oderjournal',
        text: 'oderjournal',
        link: ''
      },
      {
        id: 'accountno',
        text: 'accountno',
        link: ''
      },
      {
        id: 'porfolio',
        text: 'portfolio',
        link: ''
      }
    ]
  },
  {
    id: 'account',
    text: 'account',
    link: '',
    subitems: [
      {
        id: 'matchingordershistory',
        text: 'matchingordershistory',
        link: ''
      },
      {
        id: 'cashtransactionhistory',
        text: 'cashtransactionhistory',
        link: ''
      },
      {
        id: 'cashstatement',
        text: 'cashstatement',
        link: ''
      },
      {
        id: 'stockstatement',
        text: 'stockstatement',
        link: ''
      },
      {
        id: 'marginloanstatement',
        text: 'marginloanstatement',
        link: ''
      },
      {
        id: 'personalprofile',
        text: 'personalprofile',
        link: ''
      }
    ]
  },
  {
    id: 'otherservice',
    text: 'otherservice',
    link: '',
    subitems: [
      {
        id: 'cashtransfer',
        text: 'cashtransfer',
        link: ''
      },
      {
        id: 'cashadvance',
        text: 'cashadvance',
        link: ''
      },
      {
        id: 'cashadvance(bank)',
        text: 'cashadvance(bank)',
        link: ''
      },
      {
        id: 'oddlottrading',
        text: 'oddlottrading',
        link: ''
      },
      {
        id: 'entitlement',
        text: 'entitlement',
        link: ''
      },
      {
        id: 'loanrefund',
        text: 'loanrefund',
        link: ''
      }
    ]
  },
  {
    id: 'help',
    text: 'help',
    link: '',
    subitems: [
      {
        id: 'available',
        text: 'available',
        link: ''
      }
    ]
  }
  // },
  // {
  //   id: 'defaultgroup',
  //   text: 'defaultgroup',
  //   link: '',
  //   subitems: []
  // }
]

class MenuBar extends React.Component {

  constructor (props) {
    super(props);
  }

  

  renderMenuItems () {
    
    return menu_items.map(item => {
      return (
        <NavDropdown
          className='pad20'
          eventKey={item.id}
          key={item.id}
          title={this.props.data[item.text]}
          id='nav-dropdown'>
          {this.renderSubItem(item, item.id)}
        </NavDropdown>
      )
    })
  }

  renderSubItem (item, parentId) {
    return item.subitems.map(sub => {
      return (
        <MenuItem key={sub.id} eventKey={sub.id} onSelect={this.onMenuSelected.bind(this)}>
        {this.props.data[sub.text]}
        </MenuItem>

      )
    })
  }

  onRemove (e) {
    this.props.onRemoveTab(e.target.id, this.props.pageId, this.props.tabList, this.props.reload)
  }

  onMenuSelected(eventKey){
    var isExist = false

    for(var i = 1; i <= this.props.tabList.length; i++){
      if(this.props.tabList[i] !== undefined && this.props.tabList[i].filter(el => el === eventKey ).length === 1){
        isExist = true
        break
      }
    }

    if(!isExist)
      this.props.onSelect(eventKey, this.props.pageId, this.props.tabList, this.props.reload)
    else
      console.log('Exist')
  }

  onPageClicked(e){
    var pageId = e.target.id
    this.props.onPageClicked(pageId, this.props.tabList)
  }
  
  
  render () {
    return (
      <div>
        <Navbar fluid collapseOnSelect >
          <div className='left'>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Nav>
              {this.renderMenuItems()}
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={6} href="#">{ this.props.data.savelayout } </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <FooterPagination tabList={this.props.tabList[this.props.pageId]} 
                    page={this.props.pageId}
                    onRemove={this.onRemove.bind(this)} 
                    onPageClicked={this.onPageClicked.bind(this)}
                    />

                     
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tabList: state.menuSelected.tabList,
    pageId: state.menuSelected.page,
    reload: state.menuSelected.reload
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onSelect: (menuid, pageid, tabList, reload) => {
    dispatch(actions.menuSelected(menuid, pageid, tabList, reload))
  },

  onRemoveTab: (menuid,pageid, tabList, reload) => {
    dispatch(actions.menuRemoved(menuid, pageid, tabList, reload))
  },

  onPageClicked: (pageid, tabList) => {
    dispatch(actions.onPageClicked(pageid, tabList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)

