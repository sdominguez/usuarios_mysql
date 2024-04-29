const conexion = require('../config/conexion');

const getAllUsers = async () => {
  try {
    const [rows, fields] = await (await conexion)
    .execute('SELECT * FROM usuarios');
    return rows;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}

const getAllUserById = async (id) => {
  try {
    const [rows, fields] = await (await conexion)
      .execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

const getIdByCredentials = async (email, pass) => {
  console.log("password: "+pass);
  try {
    const [rows, fields] = await (await conexion)
      .execute('SELECT id FROM usuarios WHERE email = ? AND pass = ?', [email, pass]);
    if (rows.length > 0) {
      return rows[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

const createUser = async (name, email, pass) => {
  try {
    const [user] = await (await conexion)
      .execute('INSERT INTO usuarios (nombre, email, pass) VALUES (?, ?, ?)',
        [name, email, pass]);
    return user;
  } catch (error) {
    console.error('Error al intentar crear el usuario:', error);
    throw error;
  }
}

const updateUser = async (id, name, email, pass) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE usuarios SET nombre = ?, email = ?, pass = ? WHERE id = ?',
        [name, email, pass, id]);
    return output;
  } catch (error) {
    console.error('Error al intentar actualizar usuario:', error);
    throw error;
  }
}

const updateUserPass = async (id, pass) => {
  try {
    const [output] = await (await conexion)
      .execute('UPDATE usuarios SET pass = ? WHERE id = ?',
        [pass, id]);
    return output;
  } catch (error) {
    console.error('Error al intentar actualizar password:', error);
    throw error;
  }
}

const deleteUser = async (id) => {
  try {
    const [output] = await (await conexion)
      .execute('DELETE FROM usuarios WHERE id = ?',
        [id]);
    return output;
  } catch (error) {
    console.error('Error al intentar eliminar usuario:', error);
    throw error;
  }
}

module.exports = { 
  getAllUsers, 
  getAllUserById, 
  getIdByCredentials, 
  createUser,
  updateUser,
  deleteUser,
  updateUserPass
 }