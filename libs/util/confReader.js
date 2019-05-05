"use strict";
/**
 * Config file reader class
 * - read json file and set the environment manager instance
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var _error_1 = require("@error");
var configuration_1 = require("@model/configuration");
var ConfigReader = /** @class */ (function () {
    function ConfigReader() {
        this.config = new configuration_1.Configuration();
    }
    ConfigReader.prototype.read = function (path) {
        try {
            // parse the configuration and save to the environment manager
            this.config = new configuration_1.Configuration(JSON.parse(fs_1.readFileSync(path).toString()));
        }
        catch (e) {
            console.error(e);
            _error_1.Error.showMessage(_error_1.Error.ERROR_CONFIG_MISSING);
            process.exit(_error_1.Error.ERROR_CONFIG_MISSING);
            // If read a configuration file with exception or error,
            // return empty configuration instance.
            this.config = new configuration_1.Configuration();
        }
        finally {
            return this.config;
        }
    };
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=confReader.js.map