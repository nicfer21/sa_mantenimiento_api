import Sistemas from "../model/equipment_sistemas.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Sistemas.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
