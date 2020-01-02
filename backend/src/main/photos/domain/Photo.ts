import * as uuid from "uuid";

export class Photo {
    _id: string;

    constructor(public base64: string) {
        this.base64 = base64;
        this._id = uuid.v4();
    }

    static fromBase64(base64: string): Photo {
        this.checkIfIsValidBase64(base64);
        return new Photo(base64);
    }

    private static checkIfIsValidBase64(str: string) {
        if (Buffer.from(str, 'base64').toString('base64') !== str) {
            throw new Error('Passed string is not photo encoded in base64')
        }
    }
}