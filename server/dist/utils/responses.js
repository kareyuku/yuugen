"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OKResponse = void 0;
function OKResponse(message, data = undefined) {
    return {
        statusCode: 200,
        message,
        data,
    };
}
exports.OKResponse = OKResponse;
//# sourceMappingURL=responses.js.map