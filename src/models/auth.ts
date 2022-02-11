export interface ILoginParams {
    email: string;
    password: string;
    rememberMe: boolean;
}
export interface ILoginValidation{
    email:string;
    password:string;
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

export interface IRegisterValidation { 
    email: string;
    password: string;
    confirmPassword: string;
    name:string;
    gender:string;
    region:string;
    state:string;
}
export interface ILocationParams {
    id: string | number;
    pid: number | null;
    name: string;
    createAt: string;
}

export interface ICapitalParams extends ILocationParams { }
export interface IGenderParams{
    label: string;
    value: string;
}