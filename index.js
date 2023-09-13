import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

//Actions name contants
const init = 'account/init';
const inc = 'account/increment';
const dec = 'account/decrement';
const incByAmt = 'account/incrementByAmount';
const getAccUserPending = 'account/getUser/pending';
const getAccUserFulfilled = 'account/getUser/fulfilled';
const getAccUserRejected = 'account/getUser/rejected';
const incBonus = 'bonus/incrementBonus';

const store = createStore(combineReducers({
    account: accountReducer,
    bonus: bonusReducer
}), applyMiddleware(logger.default, thunk.default));

const history = [];

//reducer
function accountReducer(state={amount:1}, action){
    switch(action.type){
        case getAccUserFulfilled:
            return {amount: action.payload, pending: false}
        case getAccUserRejected:
            return {...state, error: action.error, pending: false}
        case getAccUserPending:
            return {...state, pending: true}
        case inc:
            return {amount: state.amount+1}
        case dec:
            return {amount: state.amount-1}
        case incByAmt:
            return {amount: state.amount+action.payload}
        default:
            return state;
    }
    
    

}
function bonusReducer(state={points:0}, action){
    switch(action.type){
        case incBonus:
            return {points: state.points+1}
        case incByAmt:
            if(action.payload>=100){
                return {points: state.points+1}
            }
        default:
            return state;
    }
    
    

}

//global state

// store.subscribe(()=>{
//     history.push(store.getState())
//     console.log(history)
    
// })

// Async API Call


//Action Creators

function getUserAccount(id){
    return async(dispatch, getState)=>{
        try{
            dispatch(getAccountUserPending())
            const {data} = await axios.get(`http://localhost:3000/account/${id}`)
            dispatch(getAccountUserFulFilled(data.amount))
        } catch(error){
            dispatch(getAccountUserRejected(error.message))
        }
    
    }
}
function getAccountUserFulFilled(value){
    return {type: getAccUserFulfilled, payload: value}
}
function getAccountUserRejected(error){
    return {type: getAccUserRejected, error:error}
}
function getAccountUserPending(){
    return {type: getAccUserPending}
}
function increment(){
    return {type: inc}
}
function decrement(){
    return {type: dec}
}
function incrementByAmount(value){
    return {type: incByAmt, payload: value}
}
function incrementBonus(){
    return {type: incBonus}
}


// setInterval(() => {
//     // store.dispatch(incrementByAmount(5))
//     // store.dispatch(decrement())
//     store.dispatch(initUser())
//     // store.dispatch(increment())
    
// }, 2000);
setTimeout(() => {
    store.dispatch(getUserAccount(2))
    // store.dispatch(increment())
    // store.dispatch(incrementByAmount(200))
    // store.dispatch(incrementBonus())
    
}, 2000);
// console.log(store.getState())