import { useEffect, useState } from "react"
import { getActors } from "../api/actors"

export function useActors(){

const [actors,setActors] = useState<any[]>([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

getActors().then(res=>{
setActors(res.data)
setLoading(false)
})

},[])

return {actors,loading}

}