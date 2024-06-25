import {practiceMore} from "./frenchSlice"
import {useSelector } from "react-redux"

const PracticeMore =()=>{
    const verbsToPractice = useSelector(practiceMore)
    return(
        verbsToPractice.length>0 &&<div>
        <h4>Practice more:</h4>
        {verbsToPractice.map((item)=> {
            const grade = (item.answeredRight/6*100).toFixed(0)
        return <p key={item.id}>{item.verb}: {grade}%</p>})}
    </div>
    )
}

export default PracticeMore