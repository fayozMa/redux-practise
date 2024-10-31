import { combineReducers, createStore } from "redux"
import { cartReducer } from "./cartReducer"
import { userReducer } from "./userReducer"

const rootReducers = combineReducers({
    cart:cartReducer,
    user:userReducer
})

export const store = createStore(rootReducers)