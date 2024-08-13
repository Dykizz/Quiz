import { deleteAllCookies } from "../helpers/cookie";

const stateBase = {
    status: false
}

export const accountReducer = (state = stateBase,action)=>{
    switch (action.type){
        case "LOGIN":{
            return {
                status: true
            } 
        }
        case "LOGOUT":{
            deleteAllCookies();
            return stateBase;  
        }
        default:
            return state;
    }
} 