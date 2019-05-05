'use strict'

import { Error as err } from '@error'
import { Env, envManager } from '@env'

/**
 * Handle following arguments
 * -h : show help message
 * -v : show version
 * -c : set config file path temporarily
 */
class ArgumentParser {

    options: ArgumentParser.ArgOption []    // Parsed options
    handlers: {[key:string]: ArgumentParser.HandlerInterface} = {} // option handlers

    constructor() {
        this.options = []
        this.handlers = {
            "-h": new ArgumentParser.HelpArgHandler(),
            "-v": new ArgumentParser.VersionArgHandler(),
            "-c": new ArgumentParser.ConfigArgHandler()
        }
    }

    isOption (arg : string) {
        return arg.charAt(0) === '-'
    }

    hasOptions () {
        return process.argv.length > 2
    }

    public parse() {

        // If there are some options as arguments,
        // make them as option objects and deal with by handlers

        if (this.hasOptions()) {
            this.options = this.parseOptions(process.argv)
        }

        this.handleOptions()
    }

    parseOptions (argv: string[]): ArgumentParser.ArgOption[] {
        let opt : ArgumentParser.ArgOption | null = null
        let rvalue: ArgumentParser.ArgOption[] = []

        for (let i = 2; i < argv.length; ++i) {
            let targetArg : string = argv[i]

            if (this.isOption(targetArg)) {
                opt = new ArgumentParser.ArgOption(targetArg)
                rvalue.push(opt)
            } else {
                if (opt) {
                    opt.add(targetArg)
                } else {
                    err.showMessage(err.ERROR_UNKNOWN_OPTION)
                }
            }
        }

        return rvalue
    }

    handleOptions () {
        for (let i = 0; i < this.options.length; ++i) {
            let option : ArgumentParser.ArgOption = this.options[i]

            if (option.name in this.handlers) {
                this.handlers[option.name].handle(option)
            } else {
                err.showMessage(err.ERROR_UNKNOWN_OPTION)
                process.exit(1)
            }
        }
    }
}

module ArgumentParser {

    // Implements inner classes
    // classes to handle arguments are sort of simple..
    // so we don't separate files for them here


    /**
     * Class for commands option
     */
    export class ArgOption {

        name: string
        args: string[]

        constructor (name: string = "") {
            this.name = name
            this.args = []
        }

        add (arg: string) {
            this.args.push(arg)
        }

    }

    export interface HandlerInterface {
        handle (option: ArgOption) : void
    }

    /**
     * Help option handler
     * - show a message
     */
    export class HelpArgHandler implements HandlerInterface {

        private readonly helpMessage: string

        constructor () {
            this.helpMessage = "Usage: node abuseipscanner [options] [args]\n\n" +
                "Options:\n" +
                "-h[elp]            show this help message\n" +
                "-c[onfiguration]   specify configuration file path\n" +
                "-v[ersion]         show the version\n\n" +
                "If you see more detail about the configuration file, please see .config.json.example file."
        }

        handle(option: ArgOption): void {
            console.log(this.helpMessage)
            process.exit(err.NORMAL)
        }
    }

    /**
     * Version option handler
     */
    export class VersionArgHandler implements HandlerInterface {
        handle(option: ArgOption): void {
            let pjson = require('../../package.json')
            console.log(pjson.version)

            process.exit(err.NORMAL)
        }
    }

    /**
     * Configuration option handler
     * - set the config path as the argument
     */
    export class ConfigArgHandler implements HandlerInterface {
        handle(option: ArgOption): void {
            envManager.setEnv(Env.ENV_CONFIG_FULLPATH, option.args[0])
        }
    }
}


module.exports = new ArgumentParser()