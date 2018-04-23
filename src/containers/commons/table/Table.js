
import React from "react"
import SearchBar from "../SearchBar"
import Pagination from "../Pagination"
import DataTable from "./DataTable"

export default class Table extends React.Component {
	// language dung o muc page
	constructor(props) {
		super(props)
	}

	render() {
        
		let tableSearch = this.props.theme.table.tableSearch
		let tableHeader = this.props.theme.table.tableHeader
		let tableFooter = this.props.theme.table.tableFooter
		let tableBody = this.props.theme.table.tableBody
		
		let language = this.props.language[this.props.idParent ? this.props.idParent : this.props.id]
		return (
			<div className="destop-table" style={{ width: "100%", height: "100%", position: "relative" }}>

				<div className={"table-main"} style={tableBody} ref={e => this.rTable = e}>
					<DataTable
						theme={this.props.theme}
						key={this.props.id}
						id={this.props.id}
						defaultPageSize={this.props.pageSize}
						columns={this.props.columns}
						filterable={this.props.filterable}
						pivot={this.props.pivot}
						getPivotRowProps={this.props.getPivotRowProps}
						data={this.props.tableData}
						language={language ? language.header : undefined}
						onRowSelected={this.onRowSelected.bind(this)}
						maxRows={this.props.maxRows}
						onCellClick={this.props.onCellClick}
					/>
				</div>

				{
					!this.props.searchEnable ? null :
						(
							<div className="table-header" style={tableSearch}>
								<SearchBar
									id={this.props.id}
									onSearch={this.props.onSearch ? this.onSearch.bind(this) : undefined}
									buttonAction={this.props.searchActions}
									language={this.props.language.searchbar}
									theme={this.props.theme}
									data={this.props.searchData}
									param={this.props.searchParams}
									defaultParams={this.props.searchDefaultValues} />
							</div>
						)
				}
				{
					!this.props.footerEnable ? null :
						(
							<div className="table-footer" style={tableFooter}>
								<Pagination
									theme={this.props.theme}
									pageIndex={this.props.pageIndex}
									totalPage={this.props.totalPage}
									onPageChange={this.onPageChange.bind(this)}
									onExportExcel={this.props.onExportExcel ? this.onExportExcel.bind(this) : undefined}
								/>
							</div>
						)
				}


			</div>
		)
	}


	onPageChange(page) {
		if (this.props.onPageChange) {
			this.props.onPageChange(page)
		}
	}

	onExportExcel() {
		if (this.props.onExportExcel) {
			this.props.onExportExcel()
		}
	}

	onSearch(params) {
		if (this.props.onSearch) {
			this.props.onSearch(params)
		}
	}

	onRowSelected(rows) {
		if (this.props.onRowSelected) {
			this.props.onRowSelected(rows)
		}
	}

	componentDidMount() {
		if (!this.props.searchEnable) {
			this.rTable.classList.add('no-header')
		}
		if (!this.props.footerEnable) {
			this.rTable.classList.add('no-footer')
		}
	}
}

Table.defaultProps = {
	// search bar props
	searchParams: [],
	searchActions: [],
	searchData: [],  // { stockList: this.stockList }
	// onSearch: -> fn

	// pagination props
	pageIndex: 1,
	totalPage: 1,
	// onPageChange: -> fn
	// onExportExcel: -> fn

	// table props
	pageSize: 15,
	columns: [],
	filterable: false,
	tableData: [],
	searchEnable: true,
	footerEnable: true,
	pivot: "",
	// onRowSelected: -> fn

	// mobile
	searchMobileParams: [],
	searchDefaultValues: [],

	// mutual props
	id: "",
	theme: [],
	language: [],

}
