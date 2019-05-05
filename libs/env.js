"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
/**
 * Environment manager class for the application
 */
var Env = /** @class */ (function () {
    function Env() {
        this.env = {};
        // Set default environment value
        // file name
        this.setEnv(Env.ENV_CONFIG_FILENAME, '.abuseipscanner');
        // file path
        var home = "$HOME";
        if (process.env.HOME) {
            home = process.env.HOME;
        }
        var newPath = path_1.default.join(home, this.env[Env.ENV_CONFIG_FILENAME]);
        // Set filename and default full poath
        this.setEnv(Env.ENV_CONFIG_FULLPATH, newPath);
    }
    /**
     * Return environment variable by id
     * @param id environment variable id
     */
    Env.prototype.getEnv = function (id) {
        if (id in this.env) {
            return this.env[id];
        }
        else {
            return "";
        }
    };
    /**
     * Set environment variable
     * @param id        env id
     * @param value     value
     */
    Env.prototype.setEnv = function (id, value) {
        this.env[id] = value;
    };
    // A list of environmental keys
    Env.ENV_CONFIG_FILENAME = 'filename';
    Env.ENV_CONFIG_FULLPATH = 'fullpath';
    Env.ENV_CONFIG_COMMANDS = 'commands';
    Env.ENV_CONFIG = 'configuration';
    return Env;
}());
exports.Env = Env;
exports.envManager = new Env();
//# sourceMappingURL=env.js.map