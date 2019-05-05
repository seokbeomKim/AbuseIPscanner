"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var chai_1 = require("chai");
var path_1 = require("path");
var confReader_1 = require("@util/confReader");
var _env_1 = require("@env");
describe('Testing validator works..', function () {
    before('initialize', function () {
        var confPath = path_1.resolve(__dirname, "../../.config.json.example");
        var confReader = new confReader_1.ConfigReader();
        _env_1.envManager.setEnv(_env_1.Env.ENV_CONFIG, confReader.read(confPath));
    });
    it('Testing on https://www.abuseipdb.com/check/45.63.8.143', function () {
        var validator = require('./ipValidator');
        validator.validate("45.63.8.143", function (address) {
            chai_1.expect(address, '45.63.8.143');
        });
    });
});
//# sourceMappingURL=ipValidator.test.js.map