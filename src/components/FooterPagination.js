import React from "react";
import { Pagination } from "react-bootstrap";

export default class FooterPagination extends React.Component {
  render() {
    return (
       <Pagination
          bsSize="medium"
          items={4}
           />
        
    );
  }
}
