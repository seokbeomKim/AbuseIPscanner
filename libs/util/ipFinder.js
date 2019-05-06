"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _error_1 = require("@error");
var configuration_1 = require("@model/configuration");
var _env_1 = require("@env");
var path_1 = require("path");
/**
 * Find a IP address with specified rule
 * - Parse a last line and adjust a proper rule from configuration
 */
var IpFinder = /** @class */ (function () {
    function IpFinder() {
    }
    IpFinder.findIpFromLine = function (read, filepath, file) {
        var config = _env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG);
        var rules = [];
        for (var i = 0; i < file.rules.length; ++i) {
            rules.push(configuration_1.Configuration.getRuleById(config, file.rules[i]));
        }
        var candidates = [];
        for (var i = 0; i < rules.length; i++) {
            var pattern = new RegExp(rules[i].regex_match);
            if (pattern.test(path_1.basename(filepath))) {
                var adjusted = configuration_1.Rules.adjustRule(rules[i], read);
                if (adjusted) {
                    // check the result is ip address
                    var ipPattern = /[0-9]+.[0-9]+.[0-9]+.[0-9]/;
                    if (ipPattern.test(adjusted)) {
                        candidates.push(adjusted);
                        _env_1.envManager.setEnv(_env_1.Env.ENV_CONFIG_COMMANDS, rules[i].commands);
                    }
                    else {
                        _error_1.Error.showMessage(_error_1.Error.ERROR_WRONG_IP_PATTERN);
                    }
                }
            }
        }
        if (candidates.length === 1) {
            return candidates[0];
        }
        else {
            return "";
        }
    };
    return IpFinder;
}());
exports.default = IpFinder;
//# sourceMappingURL=ipFinder.js.map