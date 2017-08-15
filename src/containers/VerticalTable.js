import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
export default class VerticalTable extends Component {

	constructor(props) {
    		super(props)
    	}

	render() {
		console.log('VerticalTable', this.props)
		return(
			<Table bordered className={'vertical-table'}>
		    	<thead>
		      	<tr>
		      		{
		      			this.props.header.map(e => {
		      				return ( <th> {e} </th>)
		      			})
		      		}
		      	</tr>
		    	</thead>
		    	<tbody>
		    		{
		    			this.props.title.map(e => {
		    				return(
		    					<tr>
		    						<td className="vertical-table-title" key={e.accessor}> {e.Header} </td>
		    						{
		    							this.props.data[e.accessor] !== undefined ? 
			    							this.props.data[e.accessor].map(el => {
			    								return ( <td  className="vertical-table-value"> {el} </td>)
			    							})
			    						: (<td> </td>)
		    						}
		    					</tr>
		    				)
		    			})
		    		}
		    	</tbody>
		  </Table>
		)
	}
}