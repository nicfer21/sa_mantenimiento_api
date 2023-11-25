import Partes from "../model/equipment_partes.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Partes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
