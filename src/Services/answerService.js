import { post,get} from "../utils/request"

export const addAnswers = async (answers) =>{
    const result = await post("answers",answers);
    return result;
}

export const getAnswersByIdUser = async (id) =>{
    const path = `answers?userId=${id}`;
    const result = await get(path);
    return result;
}
export const getAnswerById = async (id) =>{
    const path = `answers/${id}`;
    const result = await get(path);
    return result;
}