import React from 'react'
const mvCurrencyUnit = 1000

export function numUnFormat(v, s) {
    if (v) {
        v = v + "";
    } else {
        return 0;
    }
    if (!s) {
        s = '';
    } else {
        // var a = v.indexOf(s);
        v = v.replace(s, "");
    }

    if (typeof (v) == "undefined")
        return 0;
    var x = v.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';

    x1 = x1.replace(/[^\d|^\.^\-]/gi, "");
    var tam = parseFloat(x1 + x2);
    return tam;
}

export function currencyShowFormatter(original, separator, language) {

    if (language == 'vi_VN') {
        var original = numUnFormat(original, ",") * mvCurrencyUnit; //chuyen sang don vi dong
        if (!original || isNaN(original)
            || (original == "")) {
            original = 0;
        }
        separator = separator || ",";							//dau phan cach hang nghin voi hang tram

        var m = /(\d+)(?:(\.\d+)|)/.exec(original + ""), x = m[1].length > 3 ? m[1].length % 3
            : 0;
        var n = parseFloat(m[1]).toFixed(0);
        var v = (original < 0 ? '-' : '') // preserve
            //minus sign
            + (x ? n.substr(0, x) + separator : "")
            + n.substr(x).replace(/(\d{3})(?=\d)/g,
                "$1" + separator);

        return v;
    } else {
        var original = numUnFormat(original, ",") * mvCurrencyUnit; //chuyen sang don vi dong
        if (!original || isNaN(original)
            || (original == "")) {
            original = 0;
        }
        separator = separator || ",";							//dau phan cach hang nghin voi hang tram

        var m = /(\d+)(?:(\.\d+)|)/.exec(original + ""), x = m[1].length > 3 ? m[1].length % 3
            : 0;
        var n = parseFloat(m[1]).toFixed(0);
        var v = (original < 0 ? '-' : '') // preserve
            //minus sign
            + (x ? n.substr(0, x) + separator : "")
            + n.substr(x).replace(/(\d{3})(?=\d)/g,
                "$1" + separator);

        return v;
    }

}

export function devideByCurrencyUnit(value) {
    return value / mvCurrencyUnit
}

export function toTTLCurrencyFormat(original) {
    var original = numUnFormat(original, ",");
    return parseFloat(original / mvCurrencyUnit).toFixed(3);
}

export function numFormat(v, s) {
    if (!s) {
        s = '';
    }

    if (isNaN(v)) {
        v = '0';
    }

    v = (Math.round((v - 0) * 1000)) / 1000;
    v = (v == Math.floor(v)) ? v + ".00"
        : ((v * 10 == Math.floor(v * 10)) ? v + "0"
            : v);
    v = String(v);
    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? '.' + ps[1] : '.00';
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }
    v = whole + sub;
    if (v.charAt(0) == '-') {
        return '-' + v.substr(1) + s;
    }

    return v + s;
}

export function quantityShowFormatter(original, separator) {
    var original = numUnFormat(original, ",");
    if (!original || isNaN(original)
        || (original == "")) {
        original = 0;
    }
    separator = separator || ",";                           //dau phan cach hang nghin voi hang tram

    var m = /(\d+)(?:(\.\d+)|)/.exec(original + ""), x = m[1].length > 3 ? m[1].length % 3
        : 0;
    var v = (x ? m[1].substr(0, x) + separator : "")
        + m[1].substr(x).replace(/(\d{3})(?=\d)/g,
            "$1" + separator);

    return v;
}

export function formatDate(input, interval) {
    if (input != null) {
        var datePart = input.match(/\d+/g),
            year = datePart[0],
            month = datePart[1], day = datePart[2];
        switch (interval) {
            case "ddmmyyyy": return day + '/' + month + '/' + year;
            case "mmddyyyy": return month + '/' + day + '/' + year;
        }
    }
}

export function statusRenderer(status) {
    switch (status) {
        case 'New':
            return (
                <div style={{ backgroundColor: '#30d6b4', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Cancelled':
            return (
                <div style={{ backgroundColor: '#881600', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Rejected':
            return (
                <div style={{ backgroundColor: '#001011', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Fully Executed':
            return (
                <div style={{ backgroundColor: '#1b5041', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Partially Filled':
            return (
                <div style={{ backgroundColor: '#49dcb1', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Fully Filled':
            return (
                <div style={{ backgroundColor: '#36a181', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Waiting':
            return (
                <div style={{ backgroundColor: '#e6e8e6', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Queued':
            return (
                <div style={{ backgroundColor: '#e6e8e6', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Waiting Cancel':
            return (
                <div style={{ backgroundColor: '#eac435', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Waiting Modify':
            return (
                <div style={{ backgroundColor: '#6b5a19', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Inactive':
            return (
                <div style={{ backgroundColor: '#5a5a5a', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Sending':
            return (
                <div style={{ backgroundColor: '#aafac8', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Expired':
            return (
                <div style={{ backgroundColor: '#5a5a5a', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Partially Expired':
            return (
                <div style={{ backgroundColor: '#5a5a5a', color: '#FFF' }}>
                    {status}
                </div>
            )
        case 'Trigger Order':
            return (
                <div style={{ backgroundColor: '#95c623', color: '#000' }}>
                    {status}
                </div>
            )
        case 'Completed':
            return (
                <div style={{ backgroundColor: '#6320ee', color: '#FFF' }}>
                    {status}
                </div>
            )
        default:
            return status
    }
}

export function getLanguage(lang){
    let language
    try {
        language = require('./languages/' + lang).default
    } catch(ex) {
        try {
            language = require('./languages/en_US').default
        }catch(ex) {
            language = require('./languages/vi_VN').default
        }
    }

    return language
}

export function getTheme(theme){
    let t
    try {
        t = require('./themes/' + theme).default
    } catch(ex) {
        try {
            t = require('./themes/light').default
        }catch(ex) {
            t = require('./themes/dark').default
        }
    }

    return t
}