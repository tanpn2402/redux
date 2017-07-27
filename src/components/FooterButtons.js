import React from "react";
import ReactDOM from "react-dom";
import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";

export default class FooterButtons extends React.Component {
  render() {
    return (
      <ButtonToolbar >
        <ButtonGroup>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}
