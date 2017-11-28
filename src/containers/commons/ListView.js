import React from 'react'
import { ReactDOM } from 'react-dom'
import moment from 'moment'
import config from '../../core/config'
import Calendar from './CalendarPicker'

const { Contants } = require("../../core/constants")



class LVRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { col, addCol, language, action, maxWid } = this.props.dataObject
        let rowId = this.props.rowId
        let d = this.props.d
        return (
            <div className="lv-tr-group">
                <div data-toggle="collapse" data-target={"#" + rowId} className="lv-tr odd" onClick={e => this.props.onClick(rowId)}>
                    <div className="lv-td icon" style={{ width: "30px" }}>
                        <span className="lv-expand-icon" id={rowId + "-icon"}>+</span>
                    </div>
                    
                    {
                        col.map(hd => {
                            return (
                                <div key={hd.id} className="lv-td" style={Object.assign({ width: hd.width }, hd.style)}>
                                    {d[hd.accessor]}
                                    {hd.cell !== undefined ? hd.cell(d):null}
                                </div>
                            )
                        })
                    }

                </div>

                <div id={rowId} className="collapse">
                    <div className="lv-tr-add">
                        {
                            addCol.map((col, index) => {
                                return (
                                    <div key={col.id+'_'+index} className="lv-group">
                                        <div className="lv-hd" style={{ width: maxWid }}>
                                            {language.header[col.id]}
                                        </div>
                                        <div className="lv-vl" style={{ width: maxWid }}>
                                            {d[col.accessor]}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* List view actions */}
                    <div className="lv-action">
                        {action !== null ? action.Cell(d) : null}
                    </div>
                </div>
            </div>
        )
    }
}

class LVFooter extends React.Component {
    render() {
        let pageIndex = this.props.pageIndex
        if (this.props.totalPage == 0)
            pageIndex = 0
        return (
            <div className="lv-tfooter">
                <div className="-btn-prev" onClick={() => this.onPageChange(-1)}>
                    <button ref={r => this.refBtnPre = r}>
                        {"< Prev"}
                    </button>
                </div>
                <div className="-pager">
                    {"Page " + pageIndex + " of " + (this.props.totalPage)}
                </div>
                <div className="-btn-next" onClick={() => this.onPageChange(1)}>
                    <button ref={r => this.refBtnNex = r}>
                        {" Next >"}
                    </button>
                </div>
            </div>
        )
    }

    onPageChange(n) {
        if (this.props.pageIndex + n > 0 && this.props.pageIndex + n <= this.props.totalPage
            && this.props.onPageChange) {
            this.props.onPageChange(this.props.pageIndex + n)
        }

    }
    componentDidMount() {
        this.refBtnNex.classList.add("disabled")
        if (this.props.totalPage == 0 || this.props.totalPage == 1) {
            this.refBtnPre.classList.add("disabled")
        }
    }
    componentDidUpdate() {
        this.refBtnNex.classList.remove("disabled")
        this.refBtnPre.classList.remove("disabled")

        if (this.props.totalPage == 0 || this.props.totalPage == 1) {
            this.refBtnNex.classList.add("disabled")
            this.refBtnPre.classList.add("disabled")
        }
        else if (this.props.pageIndex == 1) {
            this.refBtnPre.classList.add("disabled")
        }
        else if (this.props.pageIndex == this.props.totalPage) {
            this.refBtnNex.classList.add("disabled")
        }
    }
}

class LVHeader extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let language = this.props.language
        let col = this.props.col
        return (
            <div className="lv-thead" ref={ref => this.props.setRefHeader(ref)}>
                <div className="lv-tr">
                    <div className="lv-th" style={{ width: "30px" }}></div>
                    {
                        col.map(hd => {
                            return (
                                <div key={hd.id} className="lv-th" style={Object.assign({ width: hd.width }, hd.style)}>
                                    {language.header[hd.id]}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

class LVBody extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let { data, rowStamp, row, col, addCol, action, maxWid, language, isPivot } = this.props.dataObject
        return (
            <div className="lv-tbody" ref={ref => this.props.setRefBody(ref)}>
                <div className="lv-tbody-b">
                    <div style={{height: "100%"}} ref={ref => this.props.setRefBodyWrapper(ref)}>
                    </div>
                    {
                        data.map(d => {
                            if(isPivot){
                                return (d.list.map((stock, i) => {
                                    let rowId = "r-" + rowStamp + "-" + (row++)
                                    return (
                                        <div key={rowId}>
                                            {
                                                i!=0? null:
                                                (
                                                    this.props.getPivotRowProps !== undefined ?
                                                    this.props.getPivotRowProps(d.pivotID)
                                                    :<div className='lv-pivot-group'><strong>{d.pivotID}</strong></div>
                                                )
                                            }
                                            <LVRow d={stock} rowId={rowId} dataObject={this.props.dataObject} onClick={rowId => this.props.onClick(rowId)} />
                                        </div>
                                    )
                                }))
                            }else{
                                let rowId = "r-" + rowStamp + "-" + (row++)
                                return (
                                    <div key={rowId}>
                                        <LVRow d={d} rowId={rowId} dataObject={this.props.dataObject} onClick={rowId => this.props.onClick(rowId)} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}



export default class ListView extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.state = {
            toRender: false,
            compoWid: 0
        }
        this.refTHead = undefined
        this.refTBody = undefined
        this.refTBodyWrapper = undefined
    }

    toggleIconExpand(icon) {
        if (icon == "+") {
            return "-"
        } else return "+"
    }

    onClick(id) {
        document.getElementById(id + "-icon").innerHTML = this.toggleIconExpand(document.getElementById(id + "-icon").innerHTML)
    }

    createColumns(columns) {
        let remainWid = this.state.compoWid - 45
        let i = 0
        let col = []

        while (remainWid > 0 && i < columns.length) {
            let column = columns[i]
            if (column.mobile !== false) {
                if (column.columns === undefined) {
                    if (column.width && remainWid > column.width * 0.7) {
                        if (remainWid > column.width) {
                            col.push({
                                id: column.id,
                                accessor: column.accessor,
                                width: column.width,
                                style: column.style,
                                cell: column.cell
                            })
                        }
                        else {
                            col.push({
                                id: column.id,
                                accessor: column.accessor,
                                width: remainWid,
                                style: column.style,
                                cell: column.cell
                            })
                        }

                        remainWid -= column.width
                        i += 1
                    } else {
                        col[col.length - 1].width += remainWid
                        remainWid = -1
                    }

                } else {
                    let tmp = this.whenHasChildCol(column.columns, remainWid, col)
                    remainWid = tmp.remainWid
                    col = (tmp.columns)
                    i++;
                }
            } else i++
        }

        return col
    }

    whenHasChildCol(columns, remainWid, col) {
        let i = 0

        while (remainWid > 0 && i < columns.length) {
            let column = columns[i]
            if (column.mobile !== false) {
                if (column.width && remainWid > column.width * 0.7) {
                    if (remainWid > column.width) {
                        col.push({
                            id: column.id,
                            accessor: column.accessor,
                            width: column.width,
                            style: column.style,
                            cell: column.cell
                        })
                    }
                    else {
                        col.push({
                            id: column.id,
                            accessor: column.accessor,
                            width: remainWid,
                            style: column.style,
                            cell: column.cell
                        })
                    }

                    remainWid -= column.width
                    i += 1
                } else {
                    col[col.length - 1].width += remainWid
                    remainWid = -1
                }
            } else i++
        }

        return {
            columns: col,
            remainWid: remainWid
        }
    }

    getMaxWid(columns, col) {
        let max = 0
        let addCol = []
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].columns !== undefined) {
                let subCol = columns[i].columns
                for (let j = 0; j < subCol.length; j++) {
                    let t = col.filter(f => f.id === subCol[j].id)
                    if (t.length > 0) {
                        continue
                    } else if (subCol[j].mobile !== false) {
                        addCol.push(subCol[j])
                        if (subCol[j].width > max) {
                            max = subCol[j].width
                        }
                    }
                }
            }
            else {
                let t = col.filter(f => f.id === columns[i].id)
                if (t.length > 0) {
                    continue
                } else if (columns[i].mobile !== false) {
                    addCol.push(columns[i])
                    if (columns[i].width > max) {
                        max = columns[i].width
                    }
                }
            }
        }
        return {
            maxWid: max,
            addCol: addCol
        }
    }

    onSearchChange(values) {
        // console.log(values)
        this.props.onSearch(values)
    }

    render() {
        let language = this.props.language[this.props.idParent ? this.props.idParent : this.props.id]
        let data = this.props.tableData
        let columns = this.props.columns

        // console.log(data)
        let width = window.innerWidth



        let col = this.createColumns(columns)
        let maxWid = this.getMaxWid(columns, col).maxWid
        let addCol = this.getMaxWid(columns, col).addCol

        // console.log(col)
        let rowStamp = (new Date()).getTime()
        let row = 1

        // actions
        let actions = columns.filter(e => e.id === "mobileaction")
        let action = null
        if (actions.length > 0) {
            action = actions[0]
        } else action = null

        let isPivot = false
        if (this.props.pivot !== undefined && this.props.pivot.length > 0) {
            let pivot = this.props.pivot
            isPivot = true
            data = data.reduce((pivotArr, d, i, data) => {
                if(d[pivot[0]] != undefined) {
                    let pivotID = d[pivot[0]].toUpperCase()
                    let marketObject = pivotArr.find(object => object.pivotID == pivotID)
                    if (marketObject){
                        marketObject.list = marketObject.list.concat(d)
                    }else{
                        pivotArr = pivotArr.concat({
                            pivotID: pivotID,
                            list: [].concat(d)
                        })
                    }
                    return pivotArr
                }
                return []
                
            }, [])
        }
        let dataObject = {
            data: data,
            language: language,
            col: col,
            maxWid: maxWid,
            addCol: addCol,
            rowStamp: rowStamp,
            row: row,
            action: action,
            isPivot: isPivot
        }
        return (
            <div className="listview-control" ref={node => this.lv = node}>
                <SearchListView ref={ref => this.lvSearch = ref} language={this.props.language.searchbar}
                    searchParams={this.props.searchMobileParams} searchDefaultValues={this.props.searchDefaultValues}
                    onChange={this.onSearchChange.bind(this)} />
                {
                    !this.state.toRender ? "" :
                        (
                            <div className="rt-lv" ref={ref => this.refListView = ref} style={{ height: "100%" }}>
                                <LVHeader setRefHeader={ref => this.refTHead = ref} language={language} col={col} />
                                <LVBody dataObject={dataObject} setRefBody={ref => this.refTBody = ref}
                                    setRefBodyWrapper={ref => this.refTBodyWrapper = ref} onClick={rowId => this.onClick(rowId)}
                                    getPivotRowProps={this.props.getPivotRowProps}/>
                                <LVFooter {...this.props} />
                            </div>
                        )
                }

            </div>
        )
    }

    componentDidMount() {
        this.setState({
            compoWid: this.lv.offsetWidth,
            toRender: true
        })

    }

    componentDidUpdate() {
        if (this.refTBody && this.refTHead) {
            this.refTBody.style.paddingTop = this.refTHead.offsetHeight + "px"
        }
        if (this.refListView) {
            this.refListView.style.paddingTop = this.lvSearch.getHeight() + "px"
        }

        if (this.props.totalPage == 0) {
            this.refTBodyWrapper.innerHTML =
                '<div class="lv-nodata">' +
                '<div>' +
                'no data' +
                '</div>' +
                '</div>'
            this.refTBodyWrapper.style.display = "block"
        }else{
            this.refTBodyWrapper.style.display = "none"
        }
    }
}



class SearchListView extends React.Component {
    constructor(props) {
        super(props)
        this.values = {}
        this.ref = {}

        this.onChange = this.onChange.bind(this)
    }

    render() {
        let language = this.props.language
        return (
            <div className="lv-search" ref={r => this.refLvSearch = r}>

                {
                    this.props.searchParams.map(e => {
                        return this.renderElement(e, language)
                    })
                }
            </div>
        )
    }

    renderElement(id, language) {
        switch (id) {
            case Contants.searchElement.STARTDATE:
            case Contants.searchElement.ENDDATE:
                return (
                    <SearchDate key={id} id={id} ref={ref => this.ref[id] = ref} language={language} onChange={this.onChange}
                        default={this.props.searchDefaultValues[id]} />
                )
                break
            case Contants.searchElement.TRADETYPE:
                return (
                    <Selector key={id} id={id} ref={ref => this.ref[id] = ref} language={language} onChange={this.onChange}
                        default={this.props.searchDefaultValues[id]} data={config.transtype} prefix="" />
                )
                break
            case Contants.searchElement.STATUS:
                return (
                    <Selector key={id} id={id} ref={ref => this.ref[id] = ref} language={language} onChange={this.onChange}
                        default={this.props.searchDefaultValues[id]} data={config.orderstatus} prefix="" />
                )
                break
            case Contants.searchElement.MARKET:
                return (
                    <Selector key={id} id={id} ref={ref => this.ref[id] = ref} language={language} onChange={this.onChange}
                        default={this.props.searchDefaultValues[id]} data={config.marketid} prefix="MARKET_" />
                )
                break
            case Contants.searchElement.CURRENCY:
                return (
                    <Selector key={id} id={id} ref={ref => this.ref[id] = ref} language={language} onChange={this.onChange}
                        default={this.props.searchDefaultValues[id]} data={config.currency} prefix="CURRENCY_" />
                )
                break
        }
    }

    getHeight() {
        if (this.refLvSearch) {
            return this.refLvSearch.offsetHeight
        }
        else return 0
    }

    getValues() {
        let values = {}
        this.props.searchParams.map(e => {
            values[e] = this.ref[e].getValue()
        })
        return values
    }

    onChange(value) {
        let values = Object.assign(this.getValues(), value)
        this.props.onChange(values)
    }
}

class TransType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }
    render() {
        let id = this.props.id + "-" + new Date().getTime()
        let defaultValue = this.props.default !== undefined ? this.props.default : ""

        return (
            <div className="" key={id} style={{ display: "table", width: "100%", marginBottom: "5px" }}>
                <div className="col-xs-5" style={{ textAlign: "left" }}>
                    <label>{this.props.language[this.props.id]}</label>
                </div>
                <div className="col-xs-7">

                    <select value={defaultValue} class="form-control" ref={ref => this.transtype = ref}
                        onChange={e => this.onChange(e.target.value)}>
                        {
                            config.transtype.map(e => {
                                return (
                                    <option value={e}>{this.props.language[e]}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }

    getValue() {
        return this.transtype.value
    }

    onChange(value) {
        this.setState({ value: value })
        let tmp = {}
        tmp[this.props.id] = this.getValue()
        this.props.onChange(tmp)
    }

}

class Selector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }
    render() {
        console.log("RENDER", this.state, this.props)
        let id = this.props.id + "-" + new Date().getTime()
        let defaultValue = this.props.default !== undefined ? this.props.default : this.state.value
        let data = this.props.data
        let prefix = this.props.prefix
        return (
            <div className="" key={id} style={{ display: "table", width: "100%", marginBottom: "5px" }}>
                <div className="col-xs-5" style={{ textAlign: "left" }}>
                    <label>{this.props.language[this.props.id]}</label>
                </div>
                <div className="col-xs-7">

                    <select value={defaultValue} className="form-control" ref={ref => this.selector = ref}
                        onChange={e => this.onChange(e.target.value)}>
                        {
                            data.map(e => {
                                return (
                                    <option key={e} value={e}>{this.props.language[prefix + e]}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }

    getValue() {
        return this.selector.value
    }

    onChange(value) {
        this.selector.value = value
        this.setState({ value: value })
        let tmp = {}
        tmp[this.props.id] = this.getValue()
        this.props.onChange(tmp)
    }

}

class SearchDate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            date: moment(this.props.default, 'DD/MM/YYYY')
        }
    }
    render() {
        let id = this.props.id + "-" + new Date().getTime()
        let defaultValue = this.props.default != undefined ? moment(this.props.default, 'DD/MM/YYYY') : moment()
        return (
            <div className="" key={id} style={{ display: "table", width: "100%", marginBottom: "5px" }}>
                <div className="col-xs-5" style={{ textAlign: "left" }}>
                    <label>{this.props.language[this.props.id]}</label>
                </div>
                <div className="col-xs-7">
                    <Calendar selected={defaultValue} onChange={this.handleDateChange.bind(this)} id={id}
                        onBlur={this.handleCalendarBlur.bind(this)} />
                </div>
            </div>
        )
    }

    getValue() {
        return this.state.date.format("DD/MM/YYYY")
    }

    handleCalendarBlur(_date) {
        this.setState({
            date: _date
        });
        let tmp = {}
        tmp[this.props.id] = _date.format("DD/MM/YYYY")
        this.props.onChange(tmp)
    }

    handleDateChange(_date) {
        this.setState({
            date: _date
        });
        let tmp = {}
        tmp[this.props.id] = _date.format("DD/MM/YYYY")
        this.props.onChange(tmp)
    }
}