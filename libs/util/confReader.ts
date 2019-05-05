/**
 * Config file reader class
 * - read json file and set the environment manager instance
 */

import { readFileSync }     from 'fs'
import { Error }            from '@error'
import {Configuration}      from '@model/configuration'

export class ConfigReader {

    private config: Configuration

    constructor () {
        this.config = new Configuration()
    }

    read (path: string) : Configuration {

        try {

            // parse the configuration and save to the environment manager
            this.config = new Configuration(JSON.parse(readFileSync(path).toString()))

        } catch (e) {
            console.error(e)
            Error.showMessage(Error.ERROR_CONFIG_MISSING)
            process.exit(Error.ERROR_CONFIG_MISSING)

            // If read a configuration file with exception or error,
            // return empty configuration instance.
            this.config = new Configuration()

        } finally {
            return this.config
        }

    }
}
