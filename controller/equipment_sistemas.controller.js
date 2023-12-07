import Sistemas from "../model/equipment_sistemas.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Sistemas.findAll({
      order: [["id_sistemas", "ASC"]],
    });
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const rs = await Sistemas.findOne({
      where: {
        id_sistemas: req.params.id,
      },
    });
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
