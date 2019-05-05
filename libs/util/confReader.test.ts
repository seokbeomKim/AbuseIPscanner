import 'module-alias/register'

import { Env, envManager } from "@env";
import {ConfigReader} from "./confReader";
import {resolve} from "path";
import {expect} from "chai";
import {Configuration, DbSite, Files, Rules} from '@model/configuration'

describe('Check to parse configuration file', () => {

    let reader: ConfigReader = new ConfigReader()

    before('initialize', () => {

        // setting environment value with log file for test
        let tempFilename = '.config.json.example'
        let tempFullPath = resolve(__dirname,
            '../../', tempFilename)
        envManager.setEnv(Env.ENV_CONFIG_FULLPATH, tempFullPath)


    })

    it ('Check test log file path', () => {
        let expectPath = resolve(__dirname, '../../.config.json.example')
        expect(envManager.getEnv(Env.ENV_CONFIG_FULLPATH))
            .equal(expectPath)
    })

    it ('Check configuration object after parsing the file', () => {
        let configPath = envManager.getEnv(Env.ENV_CONFIG_FULLPATH)
        let config : Configuration = reader.read(configPath)

        expect(config.files.length).equal(1)
        expect(config.dbSite.length).equal(2)
        expect(config.rules.length).equal(2)

        let testFileObj : Files = config.files[0]
        expect(testFileObj.filepath).equal('./logs')
        expect(testFileObj.rules[0]).equal('apache_log')

        let testDbSiteObj : DbSite = config.dbSite[0]
        expect(testDbSiteObj.name).equal('abuseipdb')
        expect(testDbSiteObj.url).equal('https://www.abuseipdb.com/check/')

        testDbSiteObj = config.dbSite[1]
        expect(testDbSiteObj.name).equal('ipvoid.com')
        expect(testDbSiteObj.url).equal('https://www.ipvoid.com/ip-blacklist-check/')

        let testRuleObj : Rules = config.rules[0]
        expect(testRuleObj.id).equal('apache_log')
        expect(testRuleObj.name).equal('Apache access log')
        expect(testRuleObj.token).equal(' ')
        expect(testRuleObj.index).equal('0')

        testRuleObj = config.rules[1]
        expect(testRuleObj.id).equal('test_log')
        expect(testRuleObj.name).equal('Test access log')
        expect(testRuleObj.token).equal('-')
        expect(testRuleObj.index).equal('2')

    })
})