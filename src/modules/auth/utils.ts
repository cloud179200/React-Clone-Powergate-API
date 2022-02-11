import { ILoginParams, ILoginValidation, IRegisterParams, IRegisterValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
    if (!email) {
        return 'emailRequire';
    }

    if (!validEmailRegex.test(email)) {
        return 'emailInvalid';
    }

    return '';
};
const validateField = (field: string, value:string) => {
    let fieldRequire = '';
    switch (field) {
        case "name":
            fieldRequire  = !value ?"nameRequire":""
            break;
        case "gender":
            fieldRequire = !value ? "genderRequire" : value!=="male" && value!=="female" ? "genderInvalid":""
            break;
        case "region":
            fieldRequire = !value ?"regionRequire" :""
            break;
        case "state":
            fieldRequire = !value ? "stateRequire":""
            break;
    }
    return fieldRequire
}

const validatePassword = (password: string) => {
    if (!password) {
        return 'passwordRequire';
    }

    if (password.length < 4) {
        return 'minPasswordInvalid';
    }

    return '';
};
const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
        return 'passwordRequire';
    }

    if (password.length < 4) {
        return 'minPasswordInvalid';
    }
    if(password !== confirmPassword){
        return 'matchPasswordInvalid'
    }
    return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
    };
};

export const validLogin = (values: ILoginValidation) => {
    return !values.email && !values.password;
};
export const validateRegister = (values: IRegisterParams): IRegisterValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
        name:validateField("name", values.name),
        gender:validateField("gender",values.gender),
        region:validateField("region",values.region),
        state: validateField("state",values.state)
    };
};

export const validRegister = (values: IRegisterValidation) => {
    return !values.email && !values.password && !values.confirmPassword && !values.name && !values.gender && !values.region && !values.state;
};
