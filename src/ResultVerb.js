import { motion } from "framer-motion"

const ResultVerb =({verb})=>{
    return (
        <motion.div 
        className="verb-result-wrap"
        initial={{opacity:0, translateY:-10}} 
        animate={{opacity:1, translateY:0}}transition={{duration:0.4}}
        >{verb.map((item)=>{
            return(
                <div key={item.id} className="verb-result">
                    <p className="pronoun">{item.id}: </p>
                    <p style={{color:item.status?"rgb(141, 178, 0)":"rgb(255, 99, 0)"}}>{item.rightAnswer}</p>
                </div>
            )
        })}</motion.div>
    )
}

export default ResultVerb