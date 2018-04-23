import React from "react"
import {checkIfMobile} from "../../../utils"
import ListView from "./ListView"
import Table from "./Table"

export default class index extends React.Component {
	render() {
		if ( checkIfMobile() ) {
			// mobile render to ListView
			return (
				<ListView  {...this.props} />
			)
		}
		else {
			// desktop render to DataTable
			return (
				<Table {...this.props} />
			)
		}
	}
}