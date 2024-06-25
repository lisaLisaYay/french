import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const test =()=>{
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() -5);
    return yesterday.valueOf()
}

const initialState ={
    testVerbs:[],
    allResults:[],
    currentResults:[],
    practiceMore:[]
}

const frenchSlice = createSlice({
    name:"verbs",
    initialState,
    reducers:{
        addTestVerbs:(state, action)=>{
            state.testVerbs = action.payload
        },
        addResults:(state,action) =>{
                const {results, temps,verb} = action.payload

                const initialValue = 0
                const res = results.reduce((all, current)=>{
                    if(current.status){
                        return all+1
                    }
                    return all
                }, initialValue)

                const allResultItem = {
                    id:nanoid(),
                    verb,
                    result:res,
                    temps,
                    date: new Date().valueOf()
                }

                const currentResultItem = {
                    id:nanoid(),
                    verb,
                    temps,
                    date: new Date().valueOf(),
                    results,
                    checked:res===6,
                    answeredRight:res,
                    show:false
                }

                state.allResults.push(allResultItem)
                state.currentResults.push(currentResultItem)
        },
        clearCurrentResults:(state)=>{
            state.currentResults = []
        },
        filterOutResults:(state)=>{
            state.allResults.filter((item)=> item.date< test())
        },
        filterPractiveMore:(state)=>{
            const filteredItem = state.currentResults.filter((item)=>item.answeredRight!==6)
            state.practiceMore = filteredItem
        }
    }
})

export const verbList = (state) => state.verbs.testVerbs 
export const verbResults =(state)=> state.verbs.allResults
export const verbCurrentResults =(state)=>state.verbs.currentResults
export const practiceMore =(state)=> state.verbs.practiceMore
export const {addTestVerbs, addResults, clearCurrentResults, filterOutResults, filterPractiveMore} = frenchSlice.actions
export default frenchSlice.reducer

