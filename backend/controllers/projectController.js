import Project from '../models/Project.js';
import Usuario from '../models/User.js';
import fs from 'fs';

// Obtener todos los projects
export const getProjects = async (req, res) => {
    try {
        console.log("holi")
        const proyectos = await Project.findAll({
            include: [{
                model: Usuario,
            }]
        });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proyectos' });
    }
};

export const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el proyecto' });
    }
};

// Crear un proyecto
export const createProject = async (req, res) => {
    const { nombre, empresa, tipo, estado, usuario_id } = req.body;
    console.log(req.body)
    try {
        // Obtener el archivo si está disponible
        const archivo = req.file ? req.file.filename : null; // req.file contiene el archivo subido
        console.log(archivo)
        // Crear el nuevo proyecto y almacenar el archivo (si fue subido)
        const nuevoProyecto = await Project.create({
            nombre,
            empresa,
            tipo,
            descripcion: archivo,
            estado,
            usuario_id,
        });

        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el proyecto', error: error.message });
    }
};


export const updateProject = async (req, res) => {
    const { id } = req.params;

    const { nombre, empresa, tipo, estado, usuario_id } = req.body;
    try {

        const proyecto = await Project.findByPk(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        const nombreant=proyecto.descripcion;
        const archivo = req.file ? req.file.filename : proyecto.descripcion;
        await proyecto.update({ nombre, empresa, tipo, descripcion: archivo, estado, usuario_id });

        const rutaFile="uploads/"+nombreant;

        //si se subio un nuevo archivo, eliminar el anterior
        if(req.file){
            if(fs.existsSync(rutaFile)){
                console.log("existe");
                fs.unlinkSync(rutaFile,(err)=>{
                    if(err){
                        console.log(err);
                        console.log('error al eliminar el archivo');
                    }
                    else{
                        console.log('eliminando archivo ')
                    }
                })
            }
            else{
                console.log("no se encontro el file");
            }
        }
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar el proyecto' });
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const proyecto = await Project.findByPk(id);
        if (proyecto) {
            await proyecto.destroy();
            res.json({ message: 'Proyecto eliminado' });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Proyecto' });
    }
};
