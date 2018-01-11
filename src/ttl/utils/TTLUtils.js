
const { Variables } = require('./Variables')
var TTLUtils = {
    Version: 1.0
};

// function unformat number
TTLUtils.numUnFormat = function(v, s){

    if (!s) {
        s = '';
    }
    else {
        //var a = v.indexOf(s);	    	
        v = v.replace(s, "");
    }
    
    if (typeof(v) == "undefined") 
        return 0;
    var x = v.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    // format x1, remove decimal       
    var x1 = x1.replace(/[^\d|^\.|^\-]/gi, "");
    return x1 + x2;
};

TTLUtils.currencyFormatter = function(original, hasSpace, dp, dSeparator, tSeparator, symbol, rightPosition){
    
    if( !original ||  isNaN(original) || (original == "") )
    {
        original = 0;
    }
    
    var spaceText = hasSpace ? " " : "";
    dp = Math.abs(dp) + 1 ? dp : 2;
    dSeparator = dSeparator || ".";
    tSeparator = tSeparator || ",";
    symbol = symbol || "$";
    rightPosition = rightPosition || false;
    
    var m = /(\d+)(?:(\.\d+)|)/.exec(original + ""), x = m[1].length > 3 ? m[1].length % 3 : 0;
    
    var v = (original < 0 ? '-' : '') // preserve minus sign
    +
    (x ? m[1].substr(0, x) + tSeparator : "") +
    m[1].substr(x).replace(/(\d{3})(?=\d)/g, "$1" + tSeparator) +
    (dp ? dSeparator + (+m[2] || 0).toFixed(dp).substr(2) : "");
    
    return rightPosition ? v + spaceText + symbol : symbol + spaceText + v;
    
}

export function TTLlog(msg) {
    console.log(msg)
}

export function mergeObjectOmitNull(objA, objB) {
    // console.log("2 Object: ",objA,objB,Object.keys(objB))
    for (let i = 0; i< Object.keys(objB).length; i++) {
        let key = Object.keys(objA)[i]
        if (objB[key] != null) {
            // console.log("Scan_" + key)
            objA[key] = objB[key]
        }
    }
    return objA
}