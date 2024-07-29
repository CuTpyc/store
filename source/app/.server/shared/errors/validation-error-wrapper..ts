import { validationError, ValidatorError } from "remix-validated-form";

export class ValidatorErrorWrapper extends Error {
    constructor(public validatorError: ValidatorError) {
        super(JSON.stringify(validationError))
    }
}