import Unidades from "../model/equipment_unidades.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Unidades.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
