"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var chai_1 = require("chai");
var argsHandler = require('@util/argsParser');
var _a = require('@env'), Env = _a.Env, envManager = _a.envManager;
describe('Version check', function () {
    it('Check the version information', function () {
        var pjson = require('../../package.json');
        try {
            chai_1.expect(pjson.version).equal('0.0.1');
        }
        catch (e) {
            throw new Error('The version should be updated');
        }
    });
});
describe('Parsing options test', function () {
    it('Init argument handler and check length of option as zero', function () {
        chai_1.expect(argsHandler.options).length(0);
    });
    it('No options', function () {
        var testArgv = [];
        chai_1.expect(argsHandler.parseOptions(testArgv)).eql([]);
    });
    it('Testing options: -h', function () {
        var testArgv = [
            "node",
            "abuseipscanner",
            "-h"
        ];
        chai_1.expect(argsHandler.parseOptions(testArgv)).length(1);
    });
    it('Testing options: -h -c config.json.example', function () {
        var testArgv = [
            "node",
            "abuseipscanner",
            "-h",
            "-c",
            "config.json.example"
        ];
        var r = argsHandler.parseOptions(testArgv);
        chai_1.expect(r).length(2);
        chai_1.expect(r[1].args.length).equal(1);
        chai_1.expect(r[1].args[0]).equal('config.json.example');
    });
    it('Testing options: -h -c config.json.example -v', function () {
        var testArgv = [
            "node",
            "abuseipscanner",
            "-h",
            "-c",
            "config.json.example",
            "-v"
        ];
        chai_1.expect(argsHandler.parseOptions(testArgv)).length(3);
    });
    it('Testing options: -v', function () {
        var testArgv = [
            "node",
            "abuseipscanner",
            "-v"
        ];
        chai_1.expect(argsHandler.parseOptions(testArgv)).length(1);
    });
    it('Testing unknown options: -g', function () {
        // it should be added to the option list, it is unknown option, though.
        var testArgv = [
            "node",
            "abuseipscanner",
            "-g"
        ];
        chai_1.expect(argsHandler.parseOptions(testArgv)).length(1);
    });
    it('Check whether config file path is changed correctly', function () {
        // 설정 파일의 경로가 정상적으로 변경되었는지 확인
        var testArgv = [
            "node",
            "abuseipscanner",
            "-c",
            ".config.json.example"
        ];
        argsHandler.options = argsHandler.parseOptions(testArgv);
        argsHandler.handleOptions();
        chai_1.expect(envManager.getEnv(Env.ENV_CONFIG_FULLPATH)).equal('.config.json.example');
    });
});
//# sourceMappingURL=argsParser.test.js.map