import React, {Component} from 'react';
import FooterPagination from "../components/FooterPagination";

export default class PageContent extends Component {

  /* constructor(){
     super()
   }
*/
  render () {
    return (
      <div>
        <div className='left'>
          <h2>Page Content</h2>
        </div>
        <div className='right'>
          < FooterPagination fixed/>
        </div>
      </div>
    )
  }
}
