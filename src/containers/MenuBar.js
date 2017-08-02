import React from 'react'
import { NavDropdown, NavItem, Nav, Navbar, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PageContent from '../components/PageContent'
import FooterPagination from './FooterPagination'


var menu_items = [
  {
    id: '1',
    text: 'Trading Platform',
    link: '',
    subitems: [
      {
        id: 'signorder',
        text: 'Enter Order',
        link: ''
      },
      {
        id: 'orderhistory',
        text: 'Stock Market Inform',
        link: ''
      },
      {
        id: 'oddlot',
        text: 'Watch List',
        link: ''
      },
      {
        id: 'buystock',
        text: 'Oder Journal',
        link: ''
      },
      {
        id: 'orderenquiry',
        text: 'Account No',
        link: ''
      },
      {
        id: 'porfolio',
        text: 'Portfolio',
        link: ''
      }
    ]
  },
  {
    id: '2',
    text: 'Account',
    link: '',
    subitems: [
      {
        id: '2.1',
        text: 'Matching Orders History',
        link: ''
      },
      {
        id: '2.2',
        text: 'Cash Transaction History',
        link: ''
      },
      {
        id: '2.3',
        text: 'Cash Statement',
        link: ''
      },
      {
        id: '2.4',
        text: 'Stock Statement',
        link: ''
      },
      {
        id: '2.5',
        text: 'Margin loan Statement',
        link: ''
      },
      {
        id: '2.6',
        text: 'Personal Profile',
        link: ''
      }
    ]
  },
  {
    id: '3',
    text: 'Other Service',
    link: '',
    subitems: [
      {
        id: '3.1',
        text: 'Cash Transfer',
        link: ''
      },
      {
        id: '3.2',
        text: 'Cash Advance',
        link: ''
      },
      {
        id: '3.3',
        text: 'Cash Advance (Bank)',
        link: ''
      },
      {
        id: '3.4',
        text: 'Odd Lot Trading',
        link: ''
      },
      {
        id: '3.5',
        text: 'Entitlement',
        link: ''
      },
      {
        id: '3.6',
        text: 'Loan Refund',
        link: ''
      }
    ]
  },
  {
    id: '4',
    text: 'Help',
    link: '',
    subitems: [
      {
        id: '4.1',
        text: 'Available',
        link: ''
      }
    ]
  },
  {
    id: '5',
    text: 'Default Group',
    link: '',
    subitems: []
  }
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
          title={item.text}
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
        {sub.text}
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
    console.log("Menubar")
    console.log(this.props);

    const data = this.props.data;
    
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
              <NavItem eventKey={6} href="#">{ data.savelayout } </NavItem>
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

