import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Actor = {
  id: string
  name: string
  status: string
  type: string
  location?: string
}

export default function Roster() {

  const navigate = useNavigate()

  const [actors, setActors] = useState<Actor[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    loadActors()
  }, [])

  const loadActors = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/actors", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result = await res.json()
    setActors(result.data)

  }

 
  const filteredActors = actors
    .filter(actor =>
      (actor.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter(actor =>
      statusFilter === "All" || actor.status === statusFilter
    )

  return (

    <div className="roster-page">

      <div style={{display:"flex",justifyContent:"space-between"}}>

        <div>
          <h1>Roster</h1>
          <p>{actors.length} talent • {filteredActors.length} shown</p>
        </div>

        <button className="add-btn" onClick={()=> navigate("/actors/new")}>
          Add Talent
        </button>

      </div>

      {/* Search */}

      <input
        className="search"
        placeholder="Search actor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}

      <div className="filters">

        <button onClick={() => setStatusFilter("All")}>All</button>
        <button onClick={() => setStatusFilter("Available")}>Available</button>
        <button onClick={() => setStatusFilter("Booked")}>Booked</button>
        <button onClick={() => setStatusFilter("On Hold")}>On Hold</button>

      </div>

      {/* Actor Grid */}

      <div className="roster-grid">

        {filteredActors.map(actor => (

          <div
            key={actor.id}
            className="talent-card"
            onClick={() => navigate(`/actor/${actor.id}`)}
          >

            <div className="talent-top">

              <div className="avatar">
                {actor.name ? actor.name[0] : "A"}
              </div>

              <div>
                <h3>{actor.name}</h3>
                <p>{actor.type}</p>
              </div>

              <span className="status">
                {actor.status}
              </span>

            </div>

            <p className="location">
              {actor.location || "Unknown"}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}