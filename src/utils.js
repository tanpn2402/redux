import React from 'react'
const mvCurrencyUnit = 1000
const smallestScreenSize = 660

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

export function statusRenderer(text, status) {
    switch (status) {
        case 'NEW': // new
            return (
                <div style={{ backgroundColor: '#30d6b4', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'CAN': // canceled
            return (
                <div style={{ backgroundColor: '#de6fa2', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'REJ': // rejected 
            return (
                <div style={{ backgroundColor: '#da5555', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'FEX'://Fully Executed
            return (
                <div style={{ backgroundColor: '#1b5041', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'PEX':  // 
            return (
                <div style={{ backgroundColor: '#49dcb1', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'FLL': // fully filled
            return (
                <div style={{ backgroundColor: '#96ff96', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'WA':  // waiting
            return (
                <div style={{ backgroundColor: '#a0a0a0', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'Q':   // queue
            return (
                <div style={{ backgroundColor: '#ffc87d', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'WC':  // waiting cancle
            return (
                <div style={{ backgroundColor: '#ffc87d', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'WM':
            return (
                <div style={{ backgroundColor: '#6b5a19', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'IAT':
            return (
                <div style={{ backgroundColor: '#5a5a5a', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'SND':
            return (
                <div style={{ backgroundColor: '#aafac8', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'EXP':
            return (
                <div style={{ backgroundColor: '#5a5a5a', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'PXP':
            return (
                <div style={{ backgroundColor: '#5a5a5a', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'TRIG':
            return (
                <div style={{ backgroundColor: '#95c623', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        case 'CPD':
            return (
                <div style={{ backgroundColor: '#c3772e', color: '#FFF', width: '100%' }}>
                    {text}
                </div>
            )
        default:
            return text
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

export function importAll(r){
    let images = {}
    r.keys().map((item, index) => { images[item.replace('./','')] = r(item)})
    return images
}

export function round(number, precision) {
    var factor = Math.pow(10, precision);
    return parseFloat(Number(Math.round(number * factor) / factor).toFixed(precision));
}


export function randomInt(min, max) {
    if(max == undefined) {
        return Math.floor(Math.random() * Math.floor(min));
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export function checkIfMobile() {
    var windowWidth = window.screen.width
    var mobile = windowWidth <= smallestScreenSize
    return mobile
}


export function formatQty(num){
	if(!num || num.toString().length == 0){
      	return "0"
    }
  	num = num.toString()
  	if(num.indexOf(',') < 0){
      	let m = /(\d+)(?:(\.\d+)|)/.exec(num)
        let x = m[1].length > 3 ? m[1].length % 3 : 0;
    	let v = (x ? m[1].substr(0, x) + ',' : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g, "$1" + ',');
      	return v
    }
    let dot = num.indexOf('.')
    if(dot > 0){
       	num = num.replace(num.substring(dot, num.length), '')
    }
  	return num
}

export function formatCurrency(num, q){
	if(!num || num.toString().length == 0){
      return "0.00"
    }
  	num = num.toString()
  	if(num.indexOf(',') > 0 || num.indexOf('.') < 0){
     	num = parseFloat(num.replace(/\,/g, '')) / 1000
    }  	
    if(!q)
      	num = parseFloat(num).toFixed(parseInt(2)).toString()
  	else if(q && !isNaN(parseInt(q))){
      	num = parseFloat(num).toFixed(parseInt(q)).toString()
    }
    let m = /(\d+)(?:(\.\d+)|)/.exec(num + "")
    let x = m[1].length > 3 ? m[1].length % 3 : 0;
   	num = (x ? m[1].substr(0, x) + ',' : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g, "$1" + ',') + m[2];
    return num
}