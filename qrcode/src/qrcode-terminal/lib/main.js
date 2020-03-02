var QRCode = require('./../vendor/QRCode'),
    QRErrorCorrectLevel = require('./../vendor/QRCode/QRErrorCorrectLevel'),
    repeat = function (color) {
        return {
            times: function (count) {
                return new Array(count).join(color);
            }
        };
    },
    fill = function(length, value) {
        var arr = new Array(length);
        for (var i = 0; i < length; i++) {
            arr[i] = value;
        }
        return arr;
    };

module.exports = {

    error: QRErrorCorrectLevel.L,

    generate: function (input, opts, cb) {
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }
    
        var char033 = String.fromCharCode(27);
        var black = opts.black ? opts.black : char033 + "[40m  " + char033 + "[0m";
        var white = opts.white ? opts.white : char033 + "[47m  " + char033 + "[0m";
        var toCell = function (isBlack) {
            return isBlack ? black : white;
        }

        var qrcode = new QRCode(-1, this.error);
        qrcode.addData(input);
        qrcode.make();

        var output = '';

        qrcode.modules.forEach(function (row) {
            output += row.map(toCell).join(''); 
            output += '\n';
        });

        if (cb) cb(output);
        else console.log(output);
    },

    setErrorLevel: function (error) {
        this.error = QRErrorCorrectLevel[error] || this.error;
    }

};
