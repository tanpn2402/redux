import React from "react";
import ReactDOM from "react-dom";
import { NavDropdown } from "react-bootstrap";
import { NavItem } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../actions";
import PageContent from "../components/PageContent";


var menu_items = [
  {
    id: "1",
    text: "Trading Platform",
    link: "",
    subitems: [
      {
        id: "1.1",
        text: "Enter Order",
        link: ""
      },
      {
        id: "1.2",
        text: "Stock Market Inform",
        link: ""
      },
      {
        id: "1.3",
        text: "Watch List",
        link: ""
      },
      {
        id: "1.4",
        text: "Oder Journal",
        link: ""
      },
      {
        id: "1.5",
        text: "Account No",
        link: ""
      },
      {
        id: "1.6",
        text: "Portfolio",
        link: ""
      },
      {
        id: "1.7",
        text: "Technical Analysis",
        link: ""
      },
      {
        id: "1.8",
        text: "Orders Confirmation",
        link: ""
      }
    ]
  },
  {
    id: "2",
    text: "Account",
    link: "",
    subitems: [
      {
        id: "2.1",
        text: "Matching Orders History",
        link: ""
      },
      {
        id: "2.2",
        text: "Cash Transaction History",
        link: ""
      },
      {
        id: "2.3",
        text: "Cash Statement",
        link: ""
      },
      {
        id: "2.4",
        text: "Stock Statement",
        link: ""
      },
      {
        id: "2.5",
        text: "Margin loan Statement",
        link: ""
      },
      {
        id: "2.6",
        text: "Personal Profile",
        link: ""
      }
    ]
  },
  {
    id: "3",
    text: "Other Service",
    link: "",
    subitems: [
      {
        id: "3.1",
        text: "Cash Transfer",
        link: ""
      },
      {
        id: "3.2",
        text: "Cash Advance",
        link: ""
      },
      {
        id: "3.3",
        text: "Cash Advance (Bank)",
        link: ""
      },
      {
        id: "3.4",
        text: "Odd Lot Trading",
        link: ""
      },
      {
        id: "3.5",
        text: "Entitlement",
        link: ""
      },
      {
        id: "3.6",
        text: "Loan Refund",
        link: ""
      }
    ]
  },
  {
    id: "4",
    text: "Help",
    link: "",
    subitems: [
      {
        id: "4.1",
        text: "Available",
        link: ""
      }
    ]
  },
  {
    id: "5",
    text: "Default Group",
    link: "",
    subitems: []
  }
];

function renderMenuItems() {
  return menu_items.map(item => {
    return (
      <NavDropdown eventKey={item.id} title={item.text} id="nav-dropdown">
        {renderSubItem(item, item.id)}
      </NavDropdown>
    );
  });
}

function renderSubItem(item, parentId) {
  return item.subitems.map(sub => {
    return (
      <MenuItem
        eventKey={sub.id}
        onSelect={eventKey => {
          ReactDOM.render(<PageContent />, document.getElementById("content")), 
          ReactDOM.render(<h2>Clicked {sub.id}</h2>, document.getElementById("content"));
        }}> {sub.text}
      </MenuItem>
    );
  });
}


const toggleOnLeft={

}

class MenuBar extends React.Component {
  render () {
    return (
      <Navbar fluid collapseOnSelect>
        <div className='left'>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Nav>
            {renderMenuItems()}
            <NavItem eventKey='6' title='Item'>
              Save Layout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}


const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch, props) => ({
  onClick: id => {
    dispatch(actions.clicked(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
