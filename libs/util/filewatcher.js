'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path_1 = require("path");
var _env_1 = require("@env");
var configuration_1 = require("@model/configuration");
var readline = __importStar(require("readline"));
var ipFinder_1 = __importDefault(require("@util/ipFinder"));
var WatchListener = /** @class */ (function () {
    function WatchListener(file) {
        if (file) {
            this.file = file;
        }
        else {
            this.file = new configuration_1.Files();
        }
    }
    /**
     * Listener method for file watcher
     *  - Invoked when the file I/O event occured on target file.
     * @param eventType     event type
     * @param fileName      file name
     */
    WatchListener.prototype.listen = function (eventType, fileName) {
        if (this.file) {
            var pathOfModifiedFile = path_1.join(this.file.filepath, fileName);
            if (fileName && fs.existsSync(pathOfModifiedFile)) {
                // read last line and find ip address
                this.readLastLineOfFile(pathOfModifiedFile, ipFinder_1.default.findIpFromLine);
            }
        }
    };
    WatchListener.prototype.readLastLineOfFile = function (filePath, callback) {
        var _this = this;
        try {
            var read_1 = "";
            var fileStream = fs.createReadStream(filePath);
            var rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            rl.on('line', function (line) {
                read_1 = line;
            });
            rl.on('close', function () {
                var ipAddress = callback(read_1, filePath, _this.file);
                _this.requestValidate(ipAddress, read_1);
            });
        }
        catch (e) {
            console.error(e);
        }
    };
    WatchListener.prototype.requestValidate = function (address, read) {
        console.log('requestValidate');
        var validator = require('@util/ipValidator');
        validator.validate(address, read, function (address, read) {
            var commands = _env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG_COMMANDS);
            for (var i = 0; i < commands.length; i++) {
                var shelljs = require('shelljs');
                shelljs.exec(commands[i]);
            }
        });
    };
    return WatchListener;
}());
exports.WatchListener = WatchListener;
var FileWatcher = /** @class */ (function () {
    function FileWatcher() {
        this.config = _env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG);
    }
    /**
     * Start to watch the access log file.
     * When the file is changed, following steps will be executed.
     */
    FileWatcher.prototype.startWatching = function () {
        this.addFileWatcher();
    };
    FileWatcher.prototype.addFileWatcher = function () {
        for (var i = 0; i < this.config.files.length; ++i) {
            var filePath = path_1.resolve(this.config.files[i].filepath);
            var listener = new WatchListener(this.config.files[i]);
            fs.watch(filePath, { encoding: 'utf-8' }, listener.listen);
        }
    };
    FileWatcher.prototype.removeFileWatcher = function () {
        for (var i = 0; i < this.config.files.length; ++i) {
            fs.unwatchFile(this.config.files[i].filepath);
        }
    };
    return FileWatcher;
}());
exports.FileWatcher = FileWatcher;
module.exports = new FileWatcher();
//# sourceMappingURL=filewatcher.js.map