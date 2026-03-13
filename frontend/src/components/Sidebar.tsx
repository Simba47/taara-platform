import { Link } from "react-router-dom"

export default function Sidebar(){

  return(

    <div className="sidebar">

      <div className="logo">

        <div className="logo-circle">T</div>

        <div>
          <h3>TAARA</h3>
          <p>Talent Management</p>
        </div>

      </div>

      <nav>

        <Link to="/dashboard">Home</Link>

        <Link to="/roster">Roster</Link>

        <Link to="/shortlists">Shortlists</Link>

      </nav>

      <button className="logout">Log Out</button>

    </div>

  )

}