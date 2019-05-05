import {Env, envManager} from "@env";
import {Configuration, DbSite} from "@model/configuration";

const cheerio = require('cheerio')
const request = require('request')

class IpValidator {

    validate(address: string, read: string, callback: Function): void {

        let conf: Configuration = envManager.getEnv(Env.ENV_CONFIG)

        for (let i = 0; i < conf.dbSite.length; ++i) {

            let site:DbSite = conf.dbSite[i]
            let url: string = site.url

            if (url[url.length-1] !== '/') {
                url = url + "/"
            }

            if (site.method.toLowerCase() === 'get') {

                request.get(url + address, (err: any, res: any, data: any) => {
                    if (err) {
                        console.error(err)
                    }
                    const $ = cheerio.load(data)
                    let scrapped: string = eval("$('" + site.cheerio + "').text()")

                    let suspiciousPattern: RegExp = new RegExp(conf.dbSite[i].suspicious)
                    if (suspiciousPattern.test(scrapped)) {
                        callback(address, read)
                    }
                })

            } else if (site.method.toLowerCase() === 'post') {

                let payload:any = {}
                payload[site.payload] = address
                request.post(url, {form: payload}, (err: any, res: any, data: any) => {
                    if (err) {
                        console.error(err)
                    }
                    const $ = cheerio.load(data)
                    let scrapped: string = eval("$('" + site.cheerio + "').text()")

                    let suspiciousPattern: RegExp = new RegExp(conf.dbSite[i].suspicious)
                    if (suspiciousPattern.test(scrapped)) {
                        callback(address)
                    }
                })
            }
        }

    }
}

module.exports = new IpValidator()