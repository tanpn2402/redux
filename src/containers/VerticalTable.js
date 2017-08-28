import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
export default class VerticalTable extends Component {

	constructor(props) {
    		super(props)
    	}

	render() {
		console.log('VerticalTable', this.props)
		return(
			<table className={'table table-bordered vertical-table'}>
				{
					this.props.showHeader !== undefined ? '' : 
						this.props.showHeader === false ? '' :
							(
						    	<thead>
							      	<tr>
							      		{
							      			this.props.header.map(e => {
							      				return ( <th> {e} </th>)
							      			})
							      		}
							      	</tr>
						    	</thead>
							)
				}
		    	<tbody style={{ height:'200px', overflowY:'auto' }}>
		    		{
		    			this.props.title.map(e => {
		    				return(
		    					<tr>
		    						<td className="vertical-table-title" key={e.accessor}> {e.Header} </td>
		    						{
		    							this.props.data[e.accessor] !== undefined ? 
			    							this.props.data[e.accessor].map(el => {
			    								return ( <td  className="vertical-table-value" style={{minWidth: '80px'}}> {el} </td>)
			    							})
			    						: (<td style={{minWidth: '80px'}}> </td>)
		    						}
		    					</tr>
		    				)
		    			})
		    		}
		    	</tbody>
		  	</table>
		)
	}
}