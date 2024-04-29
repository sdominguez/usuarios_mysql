const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const crypto = require("crypto-js");
const dao = require('../middlewares/data-access');


const login = async (req, res = response) => {
  const { email, pass } = req.body;
  console.log("auth: solicitud login: "+email);
  const passcipher = crypto.MD5(pass);
  const id = await dao.getIdByCredentials(email, passcipher.toString());
  if (id == null) {
    res.status(404).json({ msg: "verifique sus credenciales de acceso" });
    return;
  }
  try {
    console.log(id);
    const token = await generarJWT(id);
    res.header('Authorization', `Bearer ${token}`);
    res.json({
      msg: "Usuario logueado correctamente"
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "verifique sus credenciales de acceso" });
  }

}



module.exports = {
    login
};