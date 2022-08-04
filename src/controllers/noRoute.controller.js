export const noRoute = (req, res) =>{
    res.json({error: "La ruta no existe."})
}