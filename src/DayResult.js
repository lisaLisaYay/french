import {useState } from "react"

const DayResult =({dayResult})=>{

    const [show, setShow]= useState(false)

    if(dayResult){
        const dayGrade = (dayResult.reduce((all, curr)=>all+curr.result,0)/(dayResult.length*6)*100).toFixed(0)

        const calculateResults =(prop)=>{
            const testResults = dayResult.reduce((all, curr)=>{
                const value = curr[prop]
                if(!all.hasOwnProperty(value)){
                    all[value]=0
                }
                all[value]+=1
                return {...all}
            },[])
            const filteredResult = Object.entries(testResults).sort((a,b)=>b[1]-a[1])
            return filteredResult
        }

        const needToPracticeMore =dayResult.sort((a,b)=>a.result-b.result)[0].verb

        const practicedVerb = calculateResults("verb")
        const practicedTemps = calculateResults("temps")
    
    return(
        <div className="by-day-results-wrap">
            <div className="scale-container">
                <div className="by-day-results">
                    <div 
                    onClick={()=>setShow(!show)}
                    style={{
                            backgroundColor:"rgb(101, 45, 255)", 
                            width:50,
                            height:200,
                            }}>
                            <div style={{
                                backgroundColor:"rgb(186, 165, 255)", 
                                height:`${100-dayGrade}%`,
                            }}>
                            </div>
                    </div>
                    <p>Accuracy: {dayGrade}%</p>
                </div>
                {show&&<div className="scale-info">
                    <p>Practiced verbs: {practicedVerb.length}</p>
                    <p>Need to practice more: {needToPracticeMore}</p>
                    <p>Most practiced time: {practicedTemps[0][0]} </p>
                    <p>Most practiced verb: {practicedVerb[0][0]} ({practicedVerb[0][1]} times)</p></div>}
            </div>
        </div>
    )}

    return <div className="not-practiced">
        <div style={{
                        backgroundColor:"rgb(101, 45, 255)", 
                        width:50,
                        height:200,
                        }}>
                        <div style={{
                            backgroundColor:"rgb(186, 165, 255)", 
                            height:"100%",
                        }}>
                        </div>
                        <p>Not practiced</p>
                    </div>
                    </div>
}

export default DayResult