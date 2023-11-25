import C_Sesiones from "../model/worker_sesiones.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await C_Sesiones.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const rs = await C_Sesiones.findOne({
      where: {
        id_sesiones: req.params.id,
      },
    });
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const createOne = async (req, res) => {
  try {
    await C_Sesiones.create(req.body);
    res.json({
      messege: true,
    });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};

export const updateOne = async (req, res) => {
  try {
    await C_Sesiones.update(req.body, {
      where: {
        id_sesiones: req.params.id,
      },
    });
    res.json({
      messege: true,
    });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    await C_Sesiones.destroy({
      where: {
        id_sesiones: req.params.id,
      },
    });
    res.json({
      messege: true,
    });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};
