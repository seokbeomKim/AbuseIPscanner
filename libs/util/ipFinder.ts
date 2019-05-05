import { Error as err } from '@error'
import {Configuration, Files, Rules} from "@model/configuration";
import {Env, envManager} from "@env";
import {basename} from 'path'

/**
 * Find a IP address with specified rule
 * - Parse a last line and adjust a proper rule from configuration
 */
export default class IpFinder {

    static findIpFromLine(read: string, filepath: string, file: Files): string {

        let config: Configuration = envManager.getEnv(Env.ENV_CONFIG)
        let rules : Rules[] = []

        for (let i = 0; i < file.rules.length; ++i) {
            rules.push(Configuration.getRuleById(config, file.rules[i]))
        }

        let candidates: string[] = []
        for (let i = 0; i < rules.length; i++) {
            let pattern = new RegExp(rules[i].regex_match)

            if (pattern.test(basename(file.filepath))) {

                let adjusted = Rules.adjustRule(rules[i], read)
                if (adjusted) {
                    // check the result is ip address
                    let ipPattern = /[0-9]+.[0-9]+.[0-9]+.[0-9]/
                    if (ipPattern.test(adjusted)) {

                        // When it succeed to find proper rule,
                        // save its commands to Env

                        candidates.push(adjusted)

                        envManager.setEnv(Env.ENV_CONFIG_COMMANDS, rules[i].commands)

                    } else {
                        err.showMessage(err.ERROR_WRONG_IP_PATTERN)
                    }
                }

            }
        }

        if (candidates.length === 1) {
            return candidates[0]
        } else {
            return ""
        }
    }


}