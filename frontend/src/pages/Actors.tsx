import DashboardLayout from "../layouts/DashboardLayout";
import { useActors } from "../hooks/useActors";
import ActorCard from "../components/ActorCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Actors() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { actors, loading } = useActors();

  useEffect(() => {

    if(!token){
      window.location.href="/login"
    }

  },[])

  if(loading){
    return <h2>Loading actors...</h2>
  }

  return (

    <DashboardLayout>

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-2xl font-bold">
            Roster
          </h1>

          <p className="text-gray-500 text-sm">
            {actors?.length || 0} talent
          </p>

        </div>

        <div className="flex gap-3">

          <button className="btn-outline">
            Invite Actors
          </button>

          <button
            onClick={()=>navigate("/roster/new")}
            className="btn-primary"
          >
            Add Talent
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="glass-card p-4 mb-8">

        <input
          placeholder="Search name or skill..."
          className="w-full outline-none text-sm"
        />

      </div>

      {/* Actor Grid */}

      <div className="grid grid-cols-3 gap-6">

        {actors?.map((actor:any)=>(
          <ActorCard key={actor.id} actor={actor}/>
        ))}

      </div>

    </DashboardLayout>

  );

}