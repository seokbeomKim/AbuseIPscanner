"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _env_1 = require("@env");
var cheerio = require('cheerio');
var request = require('request');
var IpValidator = /** @class */ (function () {
    function IpValidator() {
    }
    IpValidator.prototype.validate = function (address, read, callback) {
        var conf = _env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG);
        var _loop_1 = function (i) {
            var site = conf.dbSite[i];
            var url = site.url;
            if (url[url.length - 1] !== '/') {
                url = url + "/";
            }
            if (site.method.toLowerCase() === 'get') {
                request.get(url + address, function (err, res, data) {
                    if (err) {
                        console.error(err);
                    }
                    var $ = cheerio.load(data);
                    var scrapped = eval("$('" + site.cheerio + "').text()");
                    var suspiciousPattern = new RegExp(conf.dbSite[i].suspicious);
                    if (suspiciousPattern.test(scrapped)) {
                        callback(address, read);
                    }
                });
            }
            else if (site.method.toLowerCase() === 'post') {
                var payload = {};
                payload[site.payload] = address;
                request.post(url, { form: payload }, function (err, res, data) {
                    if (err) {
                        console.error(err);
                    }
                    var $ = cheerio.load(data);
                    var scrapped = eval("$('" + site.cheerio + "').text()");
                    var suspiciousPattern = new RegExp(conf.dbSite[i].suspicious);
                    if (suspiciousPattern.test(scrapped)) {
                        callback(address);
                    }
                });
            }
        };
        for (var i = 0; i < conf.dbSite.length; ++i) {
            _loop_1(i);
        }
    };
    return IpValidator;
}());
module.exports = new IpValidator();
//# sourceMappingURL=ipValidator.js.map