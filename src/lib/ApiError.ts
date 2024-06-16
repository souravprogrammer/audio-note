export class ApiError extends Error {
    success: boolean
    data = null
    constructor(message: string, public statusCode = 400, public error = [], stack = "") {
        super(message);
        this.success = false;
        this.data = null;
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}



