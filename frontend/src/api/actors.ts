import api from "./api"

export const getActors = () => api.get("/actors")

export const getActor = (id:string) =>
  api.get(`/actors/${id}`)

export const createActor = (data:any) =>
  api.post("/actors",data)