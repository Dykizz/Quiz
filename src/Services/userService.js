
import { get, post } from "../utils/request";


export const  userLogin = async (username, password) =>{
    const path = `accounts?username=${username}&password=${password}`;
    const result = await get(path);
    return result;
}
export const checkAccountExist = async (email,username) =>{
    const path = `accounts?username=${username}&email=${email}`;
    const result = await get(path);
    return result.length > 0;
}
export const randomToken = ()=>{
    const table = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = "";
    for (let i = 0; i < 24; i++) {
        token += table[Math.floor(Math.random() * table.length)];
    }
    return token;
}
export const createAccount = async (account) =>{
    const result = await post("accounts",account);
    return result ;
}
