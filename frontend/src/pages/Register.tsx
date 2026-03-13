import { useState } from "react"
import axios from "axios"
import "../App.css"

export default function Register(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleRegister = async()=>{

await axios.post(
"http://localhost:4000/auth/register",
{email,password}
)

alert("Account created")

window.location.href="/login"

}

return(

<div className="login-container">

<div className="login-card">

<div className="login-logo">

<div className="login-icon">T</div>

<div>
<b>TAARA</b>
<br/>
<small>Talent Management</small>
</div>

</div>

<p className="login-title">Create account</p>
<p className="login-sub">Register your agency</p>

<div className="input-group">
<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
</div>

<div className="input-group">
<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

<button
className="login-btn"
onClick={handleRegister}
>
Register
</button>

</div>

</div>

)

}