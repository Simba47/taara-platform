import { useNavigate } from "react-router-dom";

export default function ActorCard({ actor }: any) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate(`/roster/${actor.id}`)}
      className="glass-card p-5 cursor-pointer hover:shadow-lg transition"
    >

      {/* Avatar */}

      <div className="flex items-center gap-3 mb-4">

        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">

          {actor.name?.charAt(0)}

        </div>

        <div>

          <p className="font-semibold text-sm">
            {actor.name}
          </p>

          <p className="text-xs text-gray-500">
            {actor.age}y · {actor.gender}
          </p>

        </div>

      </div>

      {/* Type */}

      <p className="text-xs text-gray-500 mb-3">
        {actor.type}
      </p>

      {/* Status */}

      <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">

        {actor.status}

      </span>

    </div>

  );

}