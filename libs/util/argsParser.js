'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var _error_1 = require("@error");
var _env_1 = require("@env");
/**
 * Handle following arguments
 * -h : show help message
 * -v : show version
 * -c : set config file path temporarily
 */
var ArgumentParser = /** @class */ (function () {
    function ArgumentParser() {
        this.handlers = {}; // option handlers
        this.options = [];
        this.handlers = {
            "-h": new ArgumentParser.HelpArgHandler(),
            "-v": new ArgumentParser.VersionArgHandler(),
            "-c": new ArgumentParser.ConfigArgHandler()
        };
    }
    ArgumentParser.prototype.isOption = function (arg) {
        return arg.charAt(0) === '-';
    };
    ArgumentParser.prototype.hasOptions = function () {
        return process.argv.length > 2;
    };
    ArgumentParser.prototype.parse = function () {
        // If there are some options as arguments,
        // make them as option objects and deal with by handlers
        if (this.hasOptions()) {
            this.options = this.parseOptions(process.argv);
        }
        this.handleOptions();
    };
    ArgumentParser.prototype.parseOptions = function (argv) {
        var opt = null;
        var rvalue = [];
        for (var i = 2; i < argv.length; ++i) {
            var targetArg = argv[i];
            if (this.isOption(targetArg)) {
                opt = new ArgumentParser.ArgOption(targetArg);
                rvalue.push(opt);
            }
            else {
                if (opt) {
                    opt.add(targetArg);
                }
                else {
                    _error_1.Error.showMessage(_error_1.Error.ERROR_UNKNOWN_OPTION);
                }
            }
        }
        return rvalue;
    };
    ArgumentParser.prototype.handleOptions = function () {
        for (var i = 0; i < this.options.length; ++i) {
            var option = this.options[i];
            if (option.name in this.handlers) {
                this.handlers[option.name].handle(option);
            }
            else {
                _error_1.Error.showMessage(_error_1.Error.ERROR_UNKNOWN_OPTION);
                process.exit(1);
            }
        }
    };
    return ArgumentParser;
}());
(function (ArgumentParser) {
    // Implements inner classes
    // classes to handle arguments are sort of simple..
    // so we don't separate files for them here
    /**
     * Class for commands option
     */
    var ArgOption = /** @class */ (function () {
        function ArgOption(name) {
            if (name === void 0) { name = ""; }
            this.name = name;
            this.args = [];
        }
        ArgOption.prototype.add = function (arg) {
            this.args.push(arg);
        };
        return ArgOption;
    }());
    ArgumentParser.ArgOption = ArgOption;
    /**
     * Help option handler
     * - show a message
     */
    var HelpArgHandler = /** @class */ (function () {
        function HelpArgHandler() {
            this.helpMessage = "Usage: node abuseipscanner [options] [args]\n\n" +
                "Options:\n" +
                "-h[elp]            show this help message\n" +
                "-c[onfiguration]   specify configuration file path\n" +
                "-v[ersion]         show the version\n\n" +
                "If you see more detail about the configuration file, please see .config.json.example file.";
        }
        HelpArgHandler.prototype.handle = function (option) {
            console.log(this.helpMessage);
            process.exit(_error_1.Error.NORMAL);
        };
        return HelpArgHandler;
    }());
    ArgumentParser.HelpArgHandler = HelpArgHandler;
    /**
     * Version option handler
     */
    var VersionArgHandler = /** @class */ (function () {
        function VersionArgHandler() {
        }
        VersionArgHandler.prototype.handle = function (option) {
            var pjson = require('../../package.json');
            console.log(pjson.version);
            process.exit(_error_1.Error.NORMAL);
        };
        return VersionArgHandler;
    }());
    ArgumentParser.VersionArgHandler = VersionArgHandler;
    /**
     * Configuration option handler
     * - set the config path as the argument
     */
    var ConfigArgHandler = /** @class */ (function () {
        function ConfigArgHandler() {
        }
        ConfigArgHandler.prototype.handle = function (option) {
            _env_1.envManager.setEnv(_env_1.Env.ENV_CONFIG_FULLPATH, option.args[0]);
        };
        return ConfigArgHandler;
    }());
    ArgumentParser.ConfigArgHandler = ConfigArgHandler;
})(ArgumentParser || (ArgumentParser = {}));
module.exports = new ArgumentParser();
//# sourceMappingURL=argsParser.js.map