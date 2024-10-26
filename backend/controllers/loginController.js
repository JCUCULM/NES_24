import Usuario from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Op } from 'sequelize';

export const authlogin = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, rol: user.rol_id }, process.env.JWT_SECRETO, { expiresIn: process.env.JWT_TIEMPO_EXPIRA });
        res.json({ message: 'Login exitoso', token });
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
export const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETO);
        const user = await Usuario.findByPk(decoded.id); // Buscar el usuario para obtener los detalles
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.user = { id: user.id, rol: user.rol_id, nombres: user.nombres, apellidos: user.apellidos, correo: user.correo };  // Adjuntar los datos del usuario a la solicitud
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};
export const permiso = async (req, res) => {

    res.status(201).json(req.user);
};