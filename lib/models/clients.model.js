'use strict';

module.exports = Client;

function Client(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}
