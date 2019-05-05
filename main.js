//
// AbuseIPScanner
//
// Watching the log files and generate the events
// when suspicious ip tries to access to the server.
//
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var confReader_1 = require("@util/confReader");
var _env_1 = require("@env");
(function () {
    // step 1. parse and handle arguments
    var ArgsParser = require('./libs/util/argsParser');
    ArgsParser.parse();
    // step 2. read the configuration file
    var reader = new confReader_1.ConfigReader();
    var configPath = _env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG_FULLPATH);
    _env_1.envManager.setEnv(_env_1.Env.ENV_CONFIG, reader.read(configPath));
})();
(function () {
    // step 3. start to file watcher
    var fsWatcher = require('@util/filewatcher');
    fsWatcher.startWatching();
})();
//# sourceMappingURL=main.js.map