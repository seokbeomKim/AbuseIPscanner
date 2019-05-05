'use strict'

import * as fs from 'fs'
import { resolve, join } from 'path'

import { Env, envManager } from "@env";
import {Configuration, Files} from "@model/configuration";
import * as readline from "readline";
import IpFinder from "@util/ipFinder";

export class WatchListener {
    private readonly file: Files

    constructor(file?: Files) {
        if (file) {
            this.file = file
        } else {
            this.file = new Files()
        }
    }

    /**
     * Listener method for file watcher
     *  - Invoked when the file I/O event occured on target file.
     * @param eventType     event type
     * @param fileName      file name
     */
    listen(eventType: any, fileName: string): void {

        if (this.file) {

            let pathOfModifiedFile = join(this.file.filepath, fileName)
            if (fileName && fs.existsSync(pathOfModifiedFile)) {

                // read last line and find ip address
                this.readLastLineOfFile(pathOfModifiedFile,
                    IpFinder.findIpFromLine)
            }

        }
    }

    readLastLineOfFile(filePath: string, callback: Function): void {
        try {
            let read = ""

            const fileStream = fs.createReadStream(filePath)
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                read = line
            });

            rl.on('close', () => {
                let ipAddress: string = callback(read, filePath, this.file)
                this.requestValidate(ipAddress, read)
            })


        } catch (e) {
            console.error(e)
        }

    }

    requestValidate(address: string, read: string): void {

        const validator = require('@util/ipValidator')
        validator.validate(address, read,
            function (address: string, read:     string) {

            let commands: string[] = envManager.getEnv(Env.ENV_CONFIG_COMMANDS)

            for (let i = 0; i < commands.length; i++) {
                const shelljs = require('shelljs')
                shelljs.exec(commands[i])
            }

        })
    }
}

export class FileWatcher {

    private config: Configuration

    constructor () {
        this.config = envManager.getEnv(Env.ENV_CONFIG)
    }

    /**
     * Start to watch the access log file.
     * When the file is changed, following steps will be executed.
     */
    startWatching () {
        this.addFileWatcher()
    }

    addFileWatcher() {
        for (let i = 0; i < this.config.files.length; ++i) {

            let filePath : string = resolve(this.config.files[i].filepath)
            let listener : WatchListener = new WatchListener(this.config.files[i])


            fs.watch(filePath,
                { encoding: 'utf-8'}, listener.listen)
        }
    }

    removeFileWatcher () {
        for (let i = 0; i < this.config.files.length; ++i) {
            fs.unwatchFile(this.config.files[i].filepath)
        }
    }

}

module.exports = new FileWatcher()