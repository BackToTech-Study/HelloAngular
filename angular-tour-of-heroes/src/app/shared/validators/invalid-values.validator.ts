import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function invalidValuesValidatorFactory (invalidValues: any[]): ValidatorFn {
    return(control: AbstractControl): ValidationErrors | null => {
        return invalidValues.find(invalidValue => invalidValue === control.value) === undefined ? 
                null : {forbiddenValueError: {value: control.value}}
    }
}
