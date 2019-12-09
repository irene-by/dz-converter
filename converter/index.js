let request  = require('sync-request');
let url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR2ym_1JdP9amiJLliYaB96SRCQkPbj_FQKllz5PYQzMWb04Zl9hO0RQlnc';

class Converter {
    constructor() {
    }

    static roundTwoDecimals(amount) {
        return Math.round(amount * 100) / 100;
    }

    convertToUa(currency) {
        let response = request('GET', url);
        let json = JSON.parse(response.getBody('utf8'));
        let uaRate = 0;
        for (let i = 0; i < json.length; i++) {
            if (json[i].ccy === 'USD') {
                uaRate = json[i].buy;
            }
        }
        console.log(uaRate);
        let result = Converter.roundTwoDecimals(currency * uaRate);
        return result;
    }

    convertToUs(currency) {
        let response = request('GET', url);
        console.log(response.getBody('utf8'));
        let json = JSON.parse(response.getBody('utf8'));
        console.log(json);
        let usdRate = 0;
        for (let i = 0; i < json.length; i++) {
            if (json[i].ccy === 'USD') {
                usdRate = json[i].buy;
            }
        }
        console.log(usdRate);
        let result = Converter.roundTwoDecimals(currency / usdRate);
        return result;
    }
}

module.exports = Converter;



