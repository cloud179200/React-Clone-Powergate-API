export interface IPhoto{
    albumId: number;
    id:number;
    title:string;
    url:string;
    thumbnailUrl:string;
}
export interface IFilter {
    status: string;
    from: Date;
    to: Date;
    order: string;
} 
export interface IFilterValidation{
    status: string;
    from: string;
    to: string;
    order: string;
}
export interface IPayroll{
    company_id: string;
    from_date: string|Date|null;
    meta: { curr_cursor: string, next_cursor: any },
    payrolls: Array<IPayrollDetail>,
    to_date: string|Date|null,
}
export interface IPayrollDetail{
    approved: boolean;
    canceled: boolean;
    company_id: string;
    confirmed: boolean;
    currency: string;
    date_canceled: string|Date|null;
    date_confirmed: string|Date|null;
    date_fulfilled: string|Date|null;
    date_matched: string|Date|null;
    date_processed: string|Date|null;
    date_received: string|Date|null;
    date_released: string|Date|null;
    fees: number;
    fulfilled: boolean;
    is_premium: boolean;
    matched: boolean;
    number_of_recipients: number;
    payment_type: string;
    payroll_id: string;
    received: boolean;
    released: boolean;
    subpayroll_ids: Array<string>;
    time_created: string|Date;
    volume_input_in_input_currency: number;
}

export interface IFormUpdatePayrollDetailValues {
    status: "Pending" | "Received" | "Matched" | "Processing" | "Fulfilled" | "Canceled" | "" | string;
    currency: string;
    date: Date;
    amount: number;
    fees: number;
    order: string;
}
export interface IFormUpdatePayrollDetailValuesValidation {
    status: string;
    currency: string;
    date: string;
    amount: string;
    fees: string;
    order: string;
}