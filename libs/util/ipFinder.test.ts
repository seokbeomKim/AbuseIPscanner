import 'module-alias/register'

import { expect } from "chai"
import {Files} from "@model/configuration";
import {resolve} from "path";
import {Env, envManager} from "@env";
import IpFinder from "@util/ipFinder";
import {ConfigReader} from "@util/confReader";

describe('Parsing the ip address from test files', function () {

    let test1Filepath: string
    let test2Filepath: string

    before('initialize', () => {
        test1Filepath = resolve(__dirname, "../../logs/test_access_log_1")
        test2Filepath = resolve(__dirname, "../../logs/test_access_log_2")

        let confPath = resolve(__dirname, "../../.config.json.example")
        let confReader : ConfigReader = new ConfigReader()
        envManager.setEnv(Env.ENV_CONFIG, confReader.read(confPath))
    })

    it ('test_access_log_1', () => {
        let files = new Files()
        let line = "103.73.157.162 - - [05/May/2019:01:28:21 +0900] \"HEAD /xmlrpc.php HTTP/1.1\" 404 -"
        files.filepath = test1Filepath
        files.rules.push("apache_log")
        files.rules.push("test_log")

        expect(IpFinder.findIpFromLine(line, test1Filepath, files)).equal("103.73.157.162")
    })

    it ('test_access_log_2', () => {
        let files = new Files()
        let line = "This is test file-to test tokenizing-77.179.66.156-IPaddress should be third item when tokenized"
        files.filepath = test2Filepath
        files.rules.push("apache_log")
        files.rules.push("test_log")

        expect(IpFinder.findIpFromLine(line, test1Filepath, files)).equal("77.179.66.156")
    })

});