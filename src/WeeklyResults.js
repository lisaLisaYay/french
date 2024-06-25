import React from "react"
import { verbResults } from "./frenchSlice"
import { useSelector } from "react-redux"
import DayResult from "./DayResult"

const WeeklyResults =()=>{

    const calculateWeek =(prop)=>{
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - prop);
        return yesterday.toDateString()
    }
    const days = [calculateWeek(4), calculateWeek(3), calculateWeek(2), calculateWeek(1), new Date().toDateString()]

    const results = useSelector(verbResults)

    const byDayFilter = results.reduce((all,curr)=>{
        const date = new Date(curr.date).toDateString()
        if(!all.hasOwnProperty(date)){
            all[date] =[]
        }
        all[date].push(curr)

        return all
    },{})

    return(
        <div className="weekly-results">{days.map((item)=>{
            return(
                <div key={item}>
                    <p>{item.slice(4,10)}</p>
                    <DayResult dayResult={byDayFilter[item]}/>
                </div>
            )
        })}</div>
    )
}

export default React.memo(WeeklyResults)