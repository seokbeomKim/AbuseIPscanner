
/**
 * Define error numbers to figure out issues
 */
export class Error {

    static NORMAL = 0
    static ERROR_UNKNOWN_OPTION = 1
    static ERROR_CONFIG_MISSING = 2
    static ERROR_WRONG_IP_PATTERN = 3

    private static ERROR_MSG: string[] = [
        "NORMAL",                       // NOTHING TO DEAL WITH
        "Unknown option: ",             // ERROR_UNKNOWN_OPTION
        "No config file in $HOME",      // ERROR_CONFIG_MISSING
        "Wrong ip pattern adjusted"     // ERROR_WRONG_IP_PATTERN
    ]

    static showMessage(error_no: number) {
        console.error(this.ERROR_MSG[error_no])
    }

}