


export const topicsReducer = (state = [],action) =>{
    switch (action.type){
        case 'GET DATA':
            return action.data;
        case 'ADD DATA':
            return [action.data, ...state];
        default : return state
    }
}
