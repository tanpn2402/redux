const mvCurrencyUnit = 1000

export function numUnFormat(v, s){
    if (v){
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
    
    if (language == 'vi-VN'){
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

export function devideByCurrencyUnit(value){
    return value/mvCurrencyUnit
}

export function toTTLCurrencyFormat(original) {
    var original = numUnFormat(original, ",");
    return parseFloat(original/mvCurrencyUnit).toFixed(3);
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