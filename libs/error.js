"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define error numbers to figure out issues
 */
var Error = /** @class */ (function () {
    function Error() {
    }
    Error.showMessage = function (error_no) {
        console.error(this.ERROR_MSG[error_no]);
    };
    Error.NORMAL = 0;
    Error.ERROR_UNKNOWN_OPTION = 1;
    Error.ERROR_CONFIG_MISSING = 2;
    Error.ERROR_WRONG_IP_PATTERN = 3;
    Error.ERROR_MSG = [
        "NORMAL",
        "Unknown option: ",
        "No config file in $HOME",
        "Wrong ip pattern adjusted" // ERROR_WRONG_IP_PATTERN
    ];
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=error.js.map