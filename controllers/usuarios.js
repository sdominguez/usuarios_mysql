const { request, response } = require('express');
const crypto = require("crypto-js");
const dao = require('../middlewares/data-access');

const usuariosGet = async (req, res = response) => {
  const users = await dao.getAllUsers();
  res.send(users)
  /*
  res.json({
    users
  });
  */
}

const usuariosGetById = async (req, res = response) => {
  const { id } = req.params;
  const user = await dao.getAllUserById(id);
  res.json({
    user
  });
}

const usuariosCreate = async (req, res = response) => {
  const { name, email, pass } = req.body;
  try {
    const cifrada = crypto.MD5(pass);
    const user = await dao.createUser(name, email, cifrada.toString());
    const idGenerated = user.insertId;
    res.json({
      id: idGenerated
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el usuario" });
  }
}

const usuariosUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, email, pass } = req.body;
    const cifrada = crypto.MD5(pass);
    const output = await dao.updateUser(id, name, email, cifrada.toString());
    res.json({
      msg: "Datos de usuario actualizados",
      id,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
}
const usuariosUpdatePass = async (req, res) => {
  const { id } = req.params;
  try {
    const { pass } = req.body;
    const cifrada = crypto.MD5(pass);
    const output = await dao.updateUserPass(id, cifrada.toString());
    res.json({
      msg: "Password actualizado",
      id,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al cambiar contraseña" });
  }
}

const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const output = await dao.deleteUser(id);
    res.json({
      msg: "Usuario eliminado",
      id,
      affectedRows: output.affectedRows
    });
  }
  catch (error) {
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
}

module.exports = {
  usuariosGet,
  usuariosGetById,
  usuariosCreate,
  usuariosUpdate,
  usuariosUpdatePass,
  usuariosDelete
};