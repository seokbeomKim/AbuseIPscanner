import path from 'path'

/**
 * Environment manager class for the application
 */
export class Env {

    private env: {[key:string]: any} = {}

    // A list of environmental keys
    static ENV_CONFIG_FILENAME: string = 'filename'
    static ENV_CONFIG_FULLPATH: string = 'fullpath'
    static ENV_CONFIG_COMMANDS: string = 'commands'

    static ENV_CONFIG: string = 'configuration'

    constructor() {
        // Set default environment value
        // file name
        this.setEnv(Env.ENV_CONFIG_FILENAME, '.abuseipscanner')

        // file path
        let home : string = "$HOME"
        if (process.env.HOME) {
            home = process.env.HOME
        }
        let newPath: string = path.join(home, this.env[Env.ENV_CONFIG_FILENAME])

        // Set filename and default full poath
        this.setEnv(Env.ENV_CONFIG_FULLPATH, newPath)
    }

    /**
     * Return environment variable by id
     * @param id environment variable id
     */
    getEnv (id: string): any {
        if (id in this.env) {
            return this.env[id]
        } else {
            return ""
        }
    }

    /**
     * Set environment variable
     * @param id        env id
     * @param value     value
     */
    setEnv (id: string, value: any): void {
        this.env[id] = value
    }

}

export let envManager = new Env()