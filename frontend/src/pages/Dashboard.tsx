import { useEffect, useState } from "react"
import { data } from "react-router-dom"

type Actor = {
  id: string
  name: string
  status: string
  type: string
}

export default function Dashboard() {

  const [actors, setActors] = useState<Actor[]>([])

  useEffect(() => {
    loadActors()
  }, [])

  const loadActors = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/actors", {
      headers: {
        Authorization: 'Bearer ${token}'
      }
    })

    const data = await res.json()
    setActors(data)

  }
  useEffect(()=>{
    loadActors()
  },[])

  const total = actors.length
  const available = actors.filter(a => a.status === "Available").length
  const shortlists = 3

  return (

    <div>

      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-sub">Your talent roster overview</p>

      {/* Stats */}

      <div className="stats">

        <div className="card">
          <h2>{total}</h2>
          <p>Total Talent</p>
        </div>

        <div className="card">
          <h2>{available}</h2>
          <p>Available</p>
        </div>

        <div className="card">
          <h2>{shortlists}</h2>
          <p>Shortlists</p>
        </div>

      </div>

      {/* Roster */}

      <h2>Roster</h2>

      <div className="roster-preview">

        {actors.slice(0,4).map(actor => (

          <div key={actor.id} className="actor-card">

            <div className="avatar">
              {actor.name[0]}
            </div>

            <h3>{actor.name}</h3>

            <span className="status">
              {actor.status}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}