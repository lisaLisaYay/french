import { words } from "./wordList"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addResults } from "./frenchSlice"
import { verbList,filterPractiveMore } from "./frenchSlice"
import { motion } from "framer-motion"

const list = ["je", "tu", "il", "nous", "vous", "ils"]

const TestPage = ()=>{

    const verbs = useSelector(verbList)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showResults, setShowResults] = useState([])

    const testquestions = words[verbs.verbs[currentQuestion]].conjugaison[verbs.temps]
    const currentverb = verbs.verbs[currentQuestion]
    const answerSubmitted = showResults.length > 0

    const ref = useRef(null)
    const inputRefs = useRef([])
    const buttonRef = useRef(null)

    const handleNext =()=>{
        if(currentQuestion=== verbs.verbs.length-1){
            setCurrentQuestion(0)
        } else {
            setCurrentQuestion(currentQuestion+1)
        }
        ref.current.reset()
        setShowResults([])
    }

    const handleCheckAnswer = (e)=>{
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const data = Object.fromEntries(formdata)

        const checkedArray = list.map((item)=>{
            const rightAnswer = testquestions[item]
            const userAnswer = data[item]
            return({
                id:item, 
                rightAnswer, 
                userAnswer, 
                status:rightAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()===userAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "")?true:false})
        })
        setShowResults(checkedArray)
        dispatch(addResults({results:checkedArray, temps:verbs.temps, verb:currentverb}))
    }

    const handleKeyDown =(e)=>{
        const {key, target}=e
        if(key==="Enter"){
            if(parseInt(target.id)===5){
                buttonRef.current.focus()
            }else {
                e.preventDefault()
                const nextIndex = parseInt(target.id)===5?0:parseInt(target.id)+1
                inputRefs.current[nextIndex].focus();
            }
        }

        if(key==="ArrowUp"){
            const nextIndex = parseInt(target.id)===0?5:parseInt(target.id)-1
            inputRefs.current[nextIndex].focus();
        }
    }
    
    const handleFinish =()=>{
        dispatch(filterPractiveMore())
        navigate("/result")
    }

    return(
        <div>
            <div  className="answer-form-container">
                <h1>{currentverb}</h1>
                 <form onSubmit={handleCheckAnswer} ref={ref} className="answer-form" tabIndex={1} onKeyDown={handleKeyDown}>
                    {list.map((item, index)=>{
                        const answeredCorrectly =showResults[index]?.status
                        const rightAnswer = showResults[index]?.rightAnswer
                        const userAnswer = showResults[index]?.userAnswer
                        const corrections = <motion.p initial={{opacity:0, translateX:-5}} animate={{opacity:1, translateX:0}}transition={{duration:0.3, delay:index/3}}>{answeredCorrectly?"Right!":rightAnswer}</motion.p> 
                        return(
                            <div key={item} className="answer-field">
                                <label htmlFor={`${item}`}>{`${item}`}</label>
                                {answerSubmitted? <div  className="answer-p"><p>{answeredCorrectly?rightAnswer:userAnswer}</p></div> :<input type="text" ref={(ref)=>(inputRefs.current[index]=ref)} name={`${item}`} id={`${index}`} autoComplete="off" />}
                                <div 
                                className="test-corrections"
                                >{answerSubmitted && corrections}</div>
                            </div>
                        )
                    })}
                    {(!(currentQuestion===verbs.verbs.length-1)&&answerSubmitted) && <button className="btn" onClick={handleNext}>next</button>}
                    {!answerSubmitted&&<button className="btn"ref={buttonRef} style={{width:200}}>Answer</button>}
                </form>
            </div>
            {(currentQuestion===verbs.verbs.length-1&&answerSubmitted)&&<button className="btn" onClick={handleFinish}>finish test</button>}
        </div>
    )
}

export default TestPage