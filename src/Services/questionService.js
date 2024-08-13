import { post } from "../utils/request"

export const addQuestion = async (question) =>{
    const result = await post("questions",question);
    return result;
}