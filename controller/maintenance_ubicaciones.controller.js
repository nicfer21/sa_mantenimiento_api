import Ubicaciones from "../model/maintenance_ubicaciones.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Ubicaciones.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
