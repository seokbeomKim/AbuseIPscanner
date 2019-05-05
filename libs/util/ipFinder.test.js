"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var chai_1 = require("chai");
var configuration_1 = require("@model/configuration");
var path_1 = require("path");
var _env_1 = require("@env");
var ipFinder_1 = __importDefault(require("@util/ipFinder"));
var confReader_1 = require("@util/confReader");
describe('Parsing the ip address from test files', function () {
    var test1Filepath;
    var test2Filepath;
    before('initialize', function () {
        test1Filepath = path_1.resolve(__dirname, "../../logs/test_access_log_1");
        test2Filepath = path_1.resolve(__dirname, "../../logs/test_access_log_2");
        var confPath = path_1.resolve(__dirname, "../../.config.json.example");
        var confReader = new confReader_1.ConfigReader();
        _env_1.envManager.setEnv(_env_1.Env.ENV_CONFIG, confReader.read(confPath));
    });
    it('test_access_log_1', function () {
        var files = new configuration_1.Files();
        var line = "103.73.157.162 - - [05/May/2019:01:28:21 +0900] \"HEAD /xmlrpc.php HTTP/1.1\" 404 -";
        files.filepath = test1Filepath;
        files.rules.push("apache_log");
        files.rules.push("test_log");
        chai_1.expect(ipFinder_1.default.findIpFromLine(line, test1Filepath, files)).equal("103.73.157.162");
    });
    it('test_access_log_2', function () {
        var files = new configuration_1.Files();
        var line = "This is test file-to test tokenizing-77.179.66.156-IPaddress should be third item when tokenized";
        files.filepath = test2Filepath;
        files.rules.push("apache_log");
        files.rules.push("test_log");
        chai_1.expect(ipFinder_1.default.findIpFromLine(line, test1Filepath, files)).equal("77.179.66.156");
    });
});
//# sourceMappingURL=ipFinder.test.js.map