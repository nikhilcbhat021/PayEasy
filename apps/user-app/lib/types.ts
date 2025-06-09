import { OnRampTransactionStatus } from ".prisma/client"
import type { OnRampTransaction, P2pTransaction } from '.prisma/client'


/* FrontEnd Types -- Start */
export type SidebarElement = {
    icon: React.ReactNode,
    key: string ,
    heading: string,
    href: string
}

export interface SelectOptions <K,T> {
    key: K,
    value: T 
}

export interface BaseType {
    __type__?: string
    key?: string
    value?: string
}

export interface BankInfoType extends BaseType {
    name: string
    ac_number: AccountNumberType
    link: string
} 

export type AccountNumberType = string;
/* FrontEnd Types -- End */



/* Transaction Types & Interfaces -- Start */
export interface Transaction {
    id: string | number;
    amount: number;
    status: OnRampTransactionStatus;
    startTime: Date;
}

export interface IOnRampTransaction extends Transaction {
    provider: string;
}

export interface IP2pTransaction extends Transaction {
    fromId: string;
    toId: string;
    name?: string;
    number: string;
    // fromUser?: {
    //     name?: string;
    //     number: string;
    // };
    // toUser?: {
    //     name?: string;
    //     number: string;
    // }
}

// We can extract the type directly from Prisma, thus reducing human error.
export type onramptxntype = OnRampTransaction;     
export type p2ptnxtype = P2pTransaction;

export enum ErrorCodeMappings {
    err_input_inv = 'Invalid Inputs',
    err_auth_inv = 'User not signed in',
    err_user_nf = 'Recepient User not found. Please check the number',
    err_user_already_exists = 'User already exists!',
    err_incorrect_creds = 'Phone number or Password is not correct!',
    err_txn_self = 'Can\'t send money to yourself',
    err_user_bal = 'Insufficient Balance'
}
/* Transaction Types & Interfaces -- End */



/* Types to get a particular length of string -- Start */
type StringToTuple<S extends string> =
  S extends `${infer Char}${infer Rest}`
    ? [Char, ...StringToTuple<Rest>]
    : [];

type Length<S extends string> = StringToTuple<S>["length"];

export type IsLength<
  S extends string,
  N extends number,
> = Length<S> extends N ? true : false;
// export type AccountNumberType<T extends string> = IsLength<T, 10>

/* Types to get a particular length of string -- End*/