import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddActor() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    type: "",
    location: "",
    status: "Available",
    height: "",
    hair: "",
    eyes: "",
    bio: "",
    reelUrl: ""
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const saveActor = async (e: any) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/actors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        slug: form.name.toLowerCase().replace(/\s+/g, "-")
      })
    })

    if (res.ok) {
      navigate("/roster")
    } else {
      alert("Failed to create actor")
    }
  }

  return (
    <div style={{padding:"40px"}}>

      <h1>Add Talent</h1>

      <form onSubmit={saveActor} style={{maxWidth:"600px"}}>

        <h3>Basic Information</h3>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option>Lead</option>
          <option>Supporting</option>
          <option>Character</option>
          <option>Emerging</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Available</option>
          <option>Booked</option>
          <option>On Hold</option>
        </select>

        <h3>Physical Attributes</h3>

        <input
          name="height"
          placeholder="Height (e.g. 5'7)"
          value={form.height}
          onChange={handleChange}
        />

        <input
          name="hair"
          placeholder="Hair"
          value={form.hair}
          onChange={handleChange}
        />

        <input
          name="eyes"
          placeholder="Eyes"
          value={form.eyes}
          onChange={handleChange}
        />

        <h3>Bio</h3>

        <textarea
          name="bio"
          placeholder="Biography"
          value={form.bio}
          onChange={handleChange}
        />

        <input
          name="reelUrl"
          placeholder="Reel URL"
          value={form.reelUrl}
          onChange={handleChange}
        />

        <br />

        <button type="submit" style={{marginTop:"20px"}}>
          Save Talent
        </button>

      </form>

    </div>
  )
}