import { get, post } from "../utils/request"

export const addQuestion = async (question) =>{
    const result = await post("questions",question);
    return result;
}

export const getQuestionsById = async (id)=>{
    const path = `questions?topicId=${id}`;
    const result = await get(path);
    return result;
}