"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = /** @class */ (function () {
    function Configuration(obj) {
        /**
         * files: List of files to watch (directory file or file)
         */
        this.files = [];
        /**
         * dbSite: List of sites to query
         * 1. The URL should be formed to query by ipaddress.
         *   If the URL has a form of 'https://www.abuseipdb.com/check/{ip_address}', you can add a site like
         *   "dbSite": [
         *   "https://www.abuseipdb.com/check/"
         *   ]
         * 2. Please see README.md file for detail
         */
        this.dbSite = [];
        /**
         * rules: List of rules to parse configuration file and find ip address
         *
         */
        this.rules = [];
        if (obj) {
            this.files = JSON.parse(JSON.stringify(obj.files));
            this.dbSite = JSON.parse(JSON.stringify(obj.dbSite));
            this.rules = JSON.parse(JSON.stringify(obj.rules));
        }
    }
    /**
     * Return rule object by rule's id
     * @param id    id of target rule
     */
    Configuration.getRuleById = function (obj, id) {
        var rvalue = new Rules();
        for (var i = 0; i < obj.rules.length; ++i) {
            if (obj.rules[i].id === id) {
                rvalue = obj.rules[i];
                break;
            }
        }
        return rvalue;
    };
    Configuration.getDbSiteByName = function (obj, name) {
        var rvalue = new DbSite();
        for (var i = 0; i < obj.dbSite.length; ++i) {
            if (obj.dbSite[i].name === name) {
                rvalue = obj.dbSite[i];
                break;
            }
        }
        return rvalue;
    };
    return Configuration;
}());
exports.Configuration = Configuration;
var Files = /** @class */ (function () {
    function Files() {
        this.filepath = "";
        this.rules = [];
    }
    return Files;
}());
exports.Files = Files;
var DbSite = /** @class */ (function () {
    function DbSite() {
        this.name = "";
        this.url = "";
        this.cheerio = "";
        this.suspicious = "";
        this.method = "get";
        this.payload = "";
    }
    return DbSite;
}());
exports.DbSite = DbSite;
var Rules = /** @class */ (function () {
    function Rules(name, id, token, index, regex_match) {
        this.name = "";
        this.id = "";
        this.token = "";
        this.index = "0";
        this.regex_match = "";
        this.commands = [];
        if (name && id && token && index && regex_match) {
            this.name = name;
            this.id = id;
            this.token = token;
            this.index = index;
            this.regex_match = regex_match;
        }
    }
    /**
     * return value after adjusting rule
     * @param str value adjusted the rule
     */
    Rules.adjustRule = function (obj, str) {
        return str.split(obj.token)[Number(obj.index)];
    };
    return Rules;
}());
exports.Rules = Rules;
//# sourceMappingURL=configuration.js.map