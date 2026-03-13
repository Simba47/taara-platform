import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getActor } from "../api/actors"
export default function ActorProfile(){

const { id } = useParams()

const [actor,setActor] = useState<any>(null)

useEffect(()=>{

getActor(id).then(res=>{
setActor(res.data)
})

},[id])

if(!actor) return <p>Loading...</p>

return(

<div className="profile">

<h1>{actor.name}</h1>
<p>{actor.type}</p>
<p>{actor.location}</p>

</div>

)

}