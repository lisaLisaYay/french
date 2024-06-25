import { useState } from "react"
import {  verbCurrentResults } from "./frenchSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ResultVerb from "./ResultVerb"
import WeeklyResults from "./WeeklyResults"

const ResultPage = ()=>{

    const curr = useSelector(verbCurrentResults)
    const [currentResults, setCurrentResults] = useState(curr)
    
    const rightAnsweredItems = currentResults.reduce((all, curr)=>all+curr.answeredRight,0)

    const rightAnswered= currentResults.filter((item)=>item.checked)

    const currentGrade = (rightAnsweredItems/(currentResults.length*6)*100).toFixed(0)

    const handleShowVerb =(verb)=>{
        const newResultsArr = currentResults.map((item)=>{
            if(item.verb===verb){
                return {...item, show:!item.show}
            } else{
                return item
            }
        })

        setCurrentResults(newResultsArr)

    }
    return(
        <div>
            <div>
                <h2>Practiced verbs:</h2>
                <p>Answered right {rightAnswered.length} out of {currentResults.length} questions</p>
                <p>Accuracy: {currentGrade}%</p>
                <p>{curr[0].temps}</p>
                <div className="wrap">
                    <div className="current-result-verb-wrap">{currentResults.map((item)=>{
                        return(<div key={item.id} className="current-result-verb-container">
                            <h4 style={{color:item.checked?"rgb(141, 178, 0)":"rgb(255, 99, 0)"}} onClick={()=>handleShowVerb(item.verb)}>{item.verb}</h4>
                            {item.show&&<ResultVerb verb={item.results}/>}
                        </div>)})}
                    </div>
                </div>
                <button className="btn"><Link to={"/"} className="link">main page</Link></button>

                <WeeklyResults currentResult={curr}/>
            </div>
        </div>
    )
}

export default ResultPage