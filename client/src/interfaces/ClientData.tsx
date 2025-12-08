export interface Client {  
  id?: number;
  email: string;
  name: string;
  phoneNumber:string;
  description:string;
  current: boolean;
  clientType:string;
  createdAt: Date;
}