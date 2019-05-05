//
// AbuseIPScanner
//
// Watching the log files and generate the events
// when suspicious ip tries to access to the server.
//

'use strict'

import 'module-alias/register'

import { ConfigReader } from '@util/confReader';
import { Env, envManager } from "@env";

(() => {
    // step 1. parse and handle arguments
    const ArgsParser = require('./libs/util/argsParser');
    ArgsParser.parse();

    // step 2. read the configuration file
    const reader : ConfigReader = new ConfigReader()
    const configPath : string = envManager.getEnv(Env.ENV_CONFIG_FULLPATH)

    envManager.setEnv(Env.ENV_CONFIG, reader.read(configPath))
})();

(() => {
    // step 3. start to file watcher
    const fsWatcher = require('@util/filewatcher')
    fsWatcher.startWatching()
})();