import Cargo from '../models/Cargo.js';
import Rol from '../models/Rol.js';
import Usuario from '../models/User.js';
import bcrypt from 'bcrypt';

import { Op } from 'sequelize';


// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    
    try {
        console.log("holi")
        const usuarios = await Usuario.findAll({
            include: [{
                model: Rol,
            }, {
                model: Cargo
            }
            ]
        });
        res.json({data:usuarios,user:req.user} );
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Usuario.findByPk(id); // Buscar el área por su ID
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

// Crear un usuario
export const createUsuario = async (req, res) => {
    console.log(req.body)
    const { nombres, apellidos, password, passwordConfirm, correo, rol_id, cargo_id } = req.body;
    try {
        if (password != passwordConfirm) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
        }

        // Verificar si el correo ya está en uso
        const existingUsuario = await Usuario.findOne({ where: { correo } });
        if (existingUsuario) {
            return res.status(400).json({ message: 'El correo ya está en uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({ nombres, apellidos, password: hashedPassword, correo, rol_id, cargo_id });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: error });
        // res.status(500).json({ message: 'Error al crear el usuario' });
    }
};


// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, correo, rol_id, cargo_id } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el correo ya está en uso por otro usuario (REVISAR ESTO EL OP.NE)
        const existingUsuario = await Usuario.findOne({ where: { correo, id: { [Op.ne]: id } } });
        if (existingUsuario) {
            return res.status(400).json({ message: 'El correo ya está en uso por otro usuario.' });
        }

        await usuario.update({ nombres, apellidos, correo, rol_id, cargo_id });
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};
export const updatePassUsuario = async (req, res) => {
    const { id } = req.params;
    const { passwordAnt, password, passwordConfirm } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(passwordAnt, usuario.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
        }

        if (password != passwordConfirm) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden, confirme correctamente la nueva contraseña.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        await usuario.update({ password: hashedPassword });
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};


// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            await usuario.destroy();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};
