export class Configuration {

    constructor(obj?: Configuration) {
        if (obj) {
            this.files = JSON.parse(JSON.stringify(obj.files))
            this.dbSite = JSON.parse(JSON.stringify(obj.dbSite))
            this.rules = JSON.parse(JSON.stringify(obj.rules))
        }
    }

    /**
     * files: List of files to watch (directory file or file)
     */
    files: Files[] = []

    /**
     * dbSite: List of sites to query
     * 1. The URL should be formed to query by ipaddress.
     *   If the URL has a form of 'https://www.abuseipdb.com/check/{ip_address}', you can add a site like
     *   "dbSite": [
     *   "https://www.abuseipdb.com/check/"
     *   ]
     * 2. Please see README.md file for detail
     */
    dbSite: DbSite[] = []

    /**
     * rules: List of rules to parse configuration file and find ip address
     *
     */
    rules: Rules[] = []

    /**
     * Return rule object by rule's id
     * @param id    id of target rule
     */
    static getRuleById (obj: Configuration, id: string) : Rules {
        let rvalue: Rules = new Rules()
        for (let i = 0; i < obj.rules.length; ++i) {
            if (obj.rules[i].id === id) {
                rvalue = obj.rules[i]
                break
            }
        }
        return rvalue
    }

    static getDbSiteByName (obj: Configuration, name: string) : DbSite {
        let rvalue: DbSite = new DbSite()
        for (let i = 0; i < obj.dbSite.length; ++i) {
            if (obj.dbSite[i].name === name) {
                rvalue = obj.dbSite[i]
                break
            }
        }
        return rvalue
    }
}

export class Files {
    filepath: string = ""
    rules: string[] = []
}

export class DbSite {
    name: string = ""
    url: string = ""
    cheerio: string = ""
    suspicious: string = ""
    method: string = "get"
    payload: string = ""
}

export class Rules {
    name: string = ""
    id: string = ""
    token: string = ""
    index: string = "0"
    regex_match: string = ""
    commands: string[] = []

    constructor(name?: string, id?: string,
                token?: string, index?: string,
                regex_match?: string) {
        if (name && id && token && index && regex_match) {
            this.name = name
            this.id = id
            this.token = token
            this.index = index
            this.regex_match = regex_match
        }
    }

    /**
     * return value after adjusting rule
     * @param str value adjusted the rule
     */
    static adjustRule (obj: Rules, str: string) : string {
        return str.split(obj.token)[Number(obj.index)]
    }
}