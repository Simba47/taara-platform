import { useState } from "react"
import axios from "axios"
import "../App.css"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin = async()=>{

const res = await axios.post(
"http://localhost:4000/auth/login",
{email,password}
)

localStorage.setItem("token",res.data.token)

window.location.href="/dashboard"

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

<p className="login-title">Welcome back</p>
<p className="login-sub">Sign in to your agency account</p>

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
onClick={handleLogin}
>
Sign In
</button>
<div className="register-text">
  Don't have an account? <a href="/register">Register</a>
</div>

</div>

</div>

)

}