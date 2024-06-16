export class ApiResponse {
    success: boolean
    constructor(private statusCode: number, private data: unknown, private message = "Success") {
        this.success = this.statusCode < 400;
    }
}


