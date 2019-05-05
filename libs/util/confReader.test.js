"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var _env_1 = require("@env");
var confReader_1 = require("./confReader");
var path_1 = require("path");
var chai_1 = require("chai");
describe('Check to parse configuration file', function () {
    var reader = new confReader_1.ConfigReader();
    before('initialize', function () {
        // setting environment value with log file for test
        var tempFilename = '.config.json.example';
        var tempFullPath = path_1.resolve(__dirname, '../../', tempFilename);
        _env_1.envManager.setEnv(_env_1.Env.ENV_CONFIG_FULLPATH, tempFullPath);
    });
    it('Check test log file path', function () {
        var expectPath = path_1.resolve(__dirname, '../../.config.json.example');
        chai_1.expect(_env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG_FULLPATH))
            .equal(expectPath);
    });
    it('Check configuration object after parsing the file', function () {
        var configPath = _env_1.envManager.getEnv(_env_1.Env.ENV_CONFIG_FULLPATH);
        var config = reader.read(configPath);
        chai_1.expect(config.files.length).equal(1);
        chai_1.expect(config.dbSite.length).equal(2);
        chai_1.expect(config.rules.length).equal(2);
        var testFileObj = config.files[0];
        chai_1.expect(testFileObj.filepath).equal('./logs');
        chai_1.expect(testFileObj.rules[0]).equal('apache_log');
        var testDbSiteObj = config.dbSite[0];
        chai_1.expect(testDbSiteObj.name).equal('abuseipdb');
        chai_1.expect(testDbSiteObj.url).equal('https://www.abuseipdb.com/check/');
        testDbSiteObj = config.dbSite[1];
        chai_1.expect(testDbSiteObj.name).equal('ipvoid.com');
        chai_1.expect(testDbSiteObj.url).equal('https://www.ipvoid.com/ip-blacklist-check/');
        var testRuleObj = config.rules[0];
        chai_1.expect(testRuleObj.id).equal('apache_log');
        chai_1.expect(testRuleObj.name).equal('Apache access log');
        chai_1.expect(testRuleObj.token).equal(' ');
        chai_1.expect(testRuleObj.index).equal('0');
        testRuleObj = config.rules[1];
        chai_1.expect(testRuleObj.id).equal('test_log');
        chai_1.expect(testRuleObj.name).equal('Test access log');
        chai_1.expect(testRuleObj.token).equal('-');
        chai_1.expect(testRuleObj.index).equal('2');
    });
});
//# sourceMappingURL=confReader.test.js.map