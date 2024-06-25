export const getCarrera = (req, res) => {
    const carrera = req.params.carrera;

    res.status(200).json("estas en " + carrera)
}