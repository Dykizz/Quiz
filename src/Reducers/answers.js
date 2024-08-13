export const answersReducer = (state = [],action) =>{
    switch (action.type){
        case 'GET ANSWERS': 
            return action.answers;
        case 'ADD ANSWER':
            return [action.answer,...state];
        default:
            return state;
    }
}