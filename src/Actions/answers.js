export const addAnswer = (answer)=>{
    return {
        type : 'ADD ANSWER',
        answer : answer
    }
}

export const getAnswers = (answers) =>{
    return {
        type : 'GET ANSWERS',
        answers : answers
    }
}