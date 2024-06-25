import { useState } from "react"
import { addTestVerbs, clearCurrentResults, filterOutResults} from "./frenchSlice"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import PracticeMore from "./PracticeMore"

const StartPage =()=>{

    const [verbs, setVerbs] = useState([])
    const [temps, setTemps] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInput =(e)=>{
        const formname = e.target.name
        const formvalue = e.target.value

        if(formname==="temps") {
            setTemps(formvalue)
        }
    }

    const handleClick = (e)=>{
        e.preventDefault()
        dispatch(clearCurrentResults())
        dispatch(filterOutResults())
        dispatch(addTestVerbs({verbs, temps}))

        navigate("/test")
    }

    const handleChooseVerb =(value)=>{
        if(!verbs.includes(value)){
            setVerbs([...verbs, value])
        }
    }

    const handledeleteVerb =(verb)=>{
        const newVerbs = verbs.filter((item)=>item!==verb)
        setVerbs(newVerbs)
    }

    return(
        <div className="start-page-container">
            <div className="start-page">
                <h1>French conjugation</h1>
                <form>
                    <SearchBar handleChooseVerb={handleChooseVerb} />
                    <div className="choosen-verbs-wrap">
                        <p>Choosen verbs:</p>
                        <div className={`${verbs.length>0&&"choosen-verb-container"}`}>
                            {verbs.map((item)=><p key={item}>{item} <span className="dlt-btn" onClick={()=>handledeleteVerb(item)}>x</span></p>)}
                        </div>
                    </div>
                    <div className="select-temps">
                        <select name="temps" id="temps" onChange={handleInput}>
                            <option>Select time</option>
                            <option value="present">present</option>
                            <option value="passe_compose"> passe compose</option>
                            <option value="imparfait">imparfait</option>
                            <option value="plus_que_parfait">plus que parfait</option>
                            <option value="passe_simple">passe simple</option>
                            <option value="passe_anterieur">passe anterieur</option>
                            <option value="futur_simple">futur simple</option>
                            <option value="futur_anterieur">futur anterieur</option>
                            <option value="conditionnel_present">conditionnel present</option>
                            <option value="conditionnel_passe">conditionnel passe</option>
                            <option value="subjonctif_present">subjonctif present</option>
                            <option value="subjonctif_passe">subjonctif passe</option>
                            <option value="subjonctif_imparfait">subjonctif imparfait</option>
                            <option value="subjonctif_plus_que_parfait">subjonctif plus que parfait</option>
                        </select>
                    </div>
                    <button className="btn" onClick={handleClick}>start</button>
                </form>
                <PracticeMore/>
            </div>
        </div>
    )
}

export default StartPage