const defaultState = {
  language: "en",
  theme: "light",
};

export const userReducer = (state = defaultState,action) => {
    switch(action.type) {
        case "SET_LANGUAGE": {
            return {...state,language:action.payload}
        }
        case "SET_THEME": {
            return {...state,theme:action.payload}
        }
        default:
            return state
    }
}
