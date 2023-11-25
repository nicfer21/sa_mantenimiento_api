import Subpartes from "../model/equipment_subpartes.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Subpartes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
