export interface IPAddressValidator {

    /**
     * Return whether the ip address is suspicious or not.
     * @param ipaddress False: suspicious, True: clean
     */
    validateIpAddress(ipAddress: string): boolean
}
