export interface ILoginParams {
    email: string;
    password: string;
    rememberMe: boolean;
}
export interface IRegisterParams {
    email: string;
    password: string;
    confirmPassword: string;
    name:string;
    gender:string;
    region:string;
    state:string;
}
export interface ILoginValidation{
    email:string;
    password:string;
}
export interface IRegisterValidation { 
    email: string;
    password: string;
    confirmPassword: string;
    name:string;
    gender:string;
    region:string;
    state:string;
}
