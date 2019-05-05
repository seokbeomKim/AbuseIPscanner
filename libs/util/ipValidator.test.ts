import 'module-alias/register'

import { expect } from "chai"
import {resolve} from "path";
import { WatchListener } from "@util/filewatcher";
import {ConfigReader} from "@util/confReader";
import {Env, envManager} from "@env";

describe('Testing validator works..', () => {

    before('initialize', () => {
        let confPath = resolve(__dirname, "../../.config.json.example")
        let confReader : ConfigReader = new ConfigReader()
        envManager.setEnv(Env.ENV_CONFIG, confReader.read(confPath))
    })

    it ('Testing on https://www.abuseipdb.com/check/45.63.8.143', () => {

        const validator = require('./ipValidator')
        validator.validate("45.63.8.143", (address: string) => {
            expect(address, '45.63.8.143')
        })

    })

})