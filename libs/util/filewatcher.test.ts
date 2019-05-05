import 'module-alias/register'

import { expect } from "chai"
import {resolve} from "path";
import { WatchListener } from "@util/filewatcher";

describe('Testing read a last line of the file', () => {
    it ('Read \'test_access_log_1\'', () => {

        let testFilePath = resolve(__dirname, "../../logs/test_access_log_1")
        let watchListener: WatchListener = new WatchListener()

        watchListener.readLastLineOfFile(testFilePath,(lastLine: string) => {
            expect(lastLine)
                .equal("103.73.157.162 - - [05/May/2019:01:28:21 +0900] \"HEAD /xmlrpc.php HTTP/1.1\" 404 -")
        })

    })

    it ('Read \'test_access_log_2\'', () => {
        let testFilePath = resolve(__dirname, "../../logs/test_access_log_2")
        let watchListener: WatchListener = new WatchListener()

        watchListener.readLastLineOfFile(
            testFilePath,(lastLine: string) => {
                expect(lastLine)
                    .equal("This is test file-to test tokenizing-77.179.66.156-IPaddress should be third item when tokenized")
        })

    })
})