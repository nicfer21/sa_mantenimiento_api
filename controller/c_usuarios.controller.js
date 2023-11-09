import C_Usuarios from "../model/c_usuarios.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await C_Usuarios.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const rs = await C_Usuarios.findOne({
      where: {
        id_usuarios: req.params.id,
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
    await C_Usuarios.create(req.body);
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
    await C_Usuarios.update(req.body, {
      where: {
        id_usuarios: req.params.id,
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
    await C_Usuarios.destroy({
      where: {
        id_usuarios: req.params.id,
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
