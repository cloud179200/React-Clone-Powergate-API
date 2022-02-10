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
const validateName = (name: string) => {
    if(!name){
        return "nameRequire";
    }

    return ''
}
const validateGender = (gender: string) => {
    if(!gender){
        return 'genderRequire';
    }
    if(gender !== "male" && gender !== "female"){
        return "genderInvalid"
    }
    return ''
}
const validateRegion = (region: string) => {
    if(!region){
        return "regionRequire"
    }
   
    return ''
}
const validateState = (state: string) => {
    if(!state){
        return "stateRequire"
    }
    return ''
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
        confirmPassword: validatePassword(values.confirmPassword),
        name:validateName(values.name),
        gender:validateGender(values.gender),
        region:validateRegion(values.region),
        state: validateState(values.state)
    };
};

export const validRegister = (values: IRegisterValidation) => {
    return !values.email && !values.password && !values.confirmPassword && !values.name && !values.gender && !values.region && !values.state;
};
