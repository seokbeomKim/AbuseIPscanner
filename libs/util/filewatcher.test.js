"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var chai_1 = require("chai");
var path_1 = require("path");
var filewatcher_1 = require("@util/filewatcher");
describe('Testing read a last line of the file', function () {
    it('Read \'test_access_log_1\'', function () {
        var testFilePath = path_1.resolve(__dirname, "../../logs/test_access_log_1");
        var watchListener = new filewatcher_1.WatchListener();
        watchListener.readLastLineOfFile(testFilePath, function (lastLine) {
            chai_1.expect(lastLine)
                .equal("103.73.157.162 - - [05/May/2019:01:28:21 +0900] \"HEAD /xmlrpc.php HTTP/1.1\" 404 -");
        });
    });
    it('Read \'test_access_log_2\'', function () {
        var testFilePath = path_1.resolve(__dirname, "../../logs/test_access_log_2");
        var watchListener = new filewatcher_1.WatchListener();
        watchListener.readLastLineOfFile(testFilePath, function (lastLine) {
            chai_1.expect(lastLine)
                .equal("This is test file-to test tokenizing-77.179.66.156-IPaddress should be third item when tokenized");
        });
    });
});
//# sourceMappingURL=filewatcher.test.js.map