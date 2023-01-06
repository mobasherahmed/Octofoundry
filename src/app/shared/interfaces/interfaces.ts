export interface filtersI{
    Email:string,
    Name:string,
    Phone:string,
    Date:string,
    country:string,
    Company:string,
}

export interface employeeI{
    id: number,
    name: string,
    email: string,
    gender: string,
    phone: string,
    company: string,
    country: string,
    date: string,
}
export interface configI{
    title: string;
    type: string;
    api?: string;
    multiple?: boolean;
}