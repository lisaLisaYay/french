import { useEffect, useRef, useState } from "react"
import { words } from "./wordList"

const SearchBar =({handleChooseVerb})=>{

    const verbs = Object.keys(words)

    const [prefix, setRpefix] = useState("")
    const [showList, setShowList] = useState(false)
    const [focusIndex, setFocusIndex] = useState(-1)
    const ref = useRef(null)

    const filteredVerbs = verbs.filter((item)=>item.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().startsWith(prefix)).slice(0,5)

    const handleChange =(e)=>{
        const value = e.target.value
        setRpefix(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    }

    const handleClickVerb =(verb)=>{
        handleChooseVerb(verb)
        setRpefix("")
    }

    const handleclickOutside =(e)=>{
        if (ref.current && !ref.current.contains(e.target)){
            setShowList(false)
        }
    }

    const handleKeyDown =(e)=>{
        const {key}=e
        let nextIndex = 0

        if(key==="ArrowDown"){
            nextIndex = (focusIndex +1)% filteredVerbs.length
        }

        if(key==="ArrowUp"){
            nextIndex = focusIndex>0?(focusIndex - 1)% filteredVerbs.length:filteredVerbs.length-1
        }

        if(key==="Enter"){
            e.preventDefault()
            handleChooseVerb(filteredVerbs[focusIndex])
            setRpefix("")
        }

        setFocusIndex(nextIndex)
    }

    useEffect(()=>{
        document.addEventListener("click", handleclickOutside)
        return ()=>{document.removeEventListener("click", handleclickOutside)}
    },[])

    return(
        <div>
            <div className="search-container" ref={ref} tabIndex={1} onKeyDown={handleKeyDown}>
            <h4>Choose verb!</h4>
                <input 
                type="text"
                name="search-bar"
                placeholder="Search..."
                autoComplete="off"
                value={prefix}
                onChange={handleChange}
                onFocus={()=>setShowList(true)}
                 />

                {(prefix&&showList)&&<div className="verb-choise-field">
                    {filteredVerbs.length>0?filteredVerbs.map((item, index)=>
                    {return(
                    <div key={item} 
                    onClick={()=>handleClickVerb(item)} 
                    className="verb-choice-item"
                    onMouseEnter={()=>setFocusIndex(index)}
                    style={{backgroundColor:index===focusIndex?"aliceblue":""}}
                    >
                        {item}
                    </div>)}):<p>No matches!</p>}
                </div>}
            </div>
        </div>
    )
}

export default SearchBar