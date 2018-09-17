
import {createStore,applyMiddleware} from "./redux"
// ReactDOM.render(<App />, document.getElementById('root'));
 let counter=(state=1,action)=>{
     if(action){
        switch (action.type){
            case "ADD":
            return state+1
            case "SUB":
            return state-1
            default:
            return state
        }
     }
    else{
        return state
    }
 }


 let logger=store=>next=>action=>{
    console.log("1",store.getState());
    console.log(action);
    next(action);
    console.log("2",store.getState());
}

// let logger=function(store){
//     return function(next){ //next =dispatch
//        return function(action){

//        }
//     } 
// }


//  let finalCreateStore=applyMiddleware(logger);
//  let store = createStore(counter);
//  console.log(store.getState());
//  store.dispatch({"type":"ADD"});
let isPromise= obj =>obj.then;
let promise = store => next => action =>{
     if(isPromise(action)){
        return action.then((data)=>(next(data))) 
     }
     return next(action)
}


let store = applyMiddleware(promise)(createStore)(counter);
store.subscribe(function(){
    console.log(store.getState());
})
// store.dispatch({"type":"ADD"});
store.dispatch(new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve({"type":"ADD"});
    }, 3000);
}))