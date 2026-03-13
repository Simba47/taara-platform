import Sidebar from "../components/Sidebar"
import "../App.css"

export default function DashboardLayout({children}:any){

return(

<div className="layout">

<Sidebar/>

<div className="content">
{children}
</div>

</div>

)

}