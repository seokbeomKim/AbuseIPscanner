import 'module-alias/register'

import { expect } from "chai"
const argsHandler = require('@util/argsParser')
const { Env, envManager } = require('@env')

describe ('Version check', () => {
    it ('Check the version information', () => {
        const pjson = require('../../package.json')
        try {
            expect(pjson.version).equal('0.0.1')
        } catch (e) {
            throw new Error('The version should be updated')
        }
    })
})

describe('Parsing options test', () => {

    it ('Init argument handler and check length of option as zero', () => {
        expect(argsHandler.options).length(0)
    })

    it ('No options', () => {
        let testArgv: string[] = []
        expect(argsHandler.parseOptions(testArgv)).eql([])
    })

    it ('Testing options: -h', () => {
        let testArgv: string[] = [
            "node",
            "abuseipscanner",
            "-h"
        ]
        expect(argsHandler.parseOptions(testArgv)).length(1)
    })

    it ('Testing options: -h -c config.json.example', () => {
        let testArgv: string[] = [
            "node",
            "abuseipscanner",
            "-h",
            "-c",
            "config.json.example"
        ]
        let r = argsHandler.parseOptions(testArgv)
        expect(r).length(2)
        expect(r[1].args.length).equal(1)
        expect(r[1].args[0]).equal('config.json.example')
    })

    it ('Testing options: -h -c config.json.example -v', () => {
        let testArgv: string[] = [
            "node",
            "abuseipscanner",
            "-h",
            "-c",
            "config.json.example",
            "-v"
        ]
        expect(argsHandler.parseOptions(testArgv)).length(3)
    })

    it ('Testing options: -v', () => {
        let testArgv: string[] = [
            "node",
            "abuseipscanner",
            "-v"
        ]
        expect(argsHandler.parseOptions(testArgv)).length(1)
    })

    it ('Testing unknown options: -g', () => {
        // it should be added to the option list, it is unknown option, though.
        let testArgv: string[] = [
            "node",
            "abuseipscanner",
            "-g"
        ]
        expect(argsHandler.parseOptions(testArgv)).length(1)
    })

    it ('Check whether config file path is changed correctly', () => {
        // 설정 파일의 경로가 정상적으로 변경되었는지 확인
        let testArgv: string[] = [
            "node",
            "abuseipscanner",
            "-c",
            ".config.json.example"
        ]
        argsHandler.options = argsHandler.parseOptions(testArgv)
        argsHandler.handleOptions()
        expect(envManager.getEnv(Env.ENV_CONFIG_FULLPATH)).equal('.config.json.example')
    })

})
