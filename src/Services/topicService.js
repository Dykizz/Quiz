import { get, post } from "../utils/request"

export const addTopic = async (topic) =>{
    const result =  await post("topics",topic);
    return result;
}
 export const checkTopic = async (topic) =>{
    const path  = `topics?name=${topic.name}`;
    const result = await get(path);
    return result;
 }