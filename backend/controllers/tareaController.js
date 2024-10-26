import Tarea from '../models/Tarea.js';
import Usuario from '../models/User.js';
import Area from '../models/Area.js';
import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';

export const getTareas = async (req, res) => {
    try {
        const { rol, id } = req.user;
        let whereCondition = {};
        if (rol === 3) {
            whereCondition.usuario_id = id;
        }
        console.log("holi")
        const tareas = await Tarea.findAll({
            where: whereCondition,
            include: [
                {
                    model: Usuario,
                },
                {
                    model: Project,
                },
                {
                    model: Area,
                }
            ]
        });
        // res.json(tareas);
        res.json({ data: tareas, user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

export const getTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Tarea.findByPk(id); // Buscar el proyecto por su ID
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};

export const createTarea = async (req, res) => {
    console.log(req.body)
    const { proyecto_id, area_id, nombre, estado, usuario_id, prueba_doc, visto_bueno } = req.body;
    try {
        const archivo = req.file ? req.file.filename : null; // req.file contiene el archivo subido
        console.log(archivo)
        const nuevaTarea = await Tarea.create({ proyecto_id, area_id, nombre, descripcion: archivo, estado, usuario_id, prueba_doc, visto_bueno });
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ message: error });
        // res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

export const updateTarea = async (req, res) => {
    const { id } = req.params;
    const { proyecto_id, area_id, nombre, estado, usuario_id, prueba_doc, visto_bueno } = req.body;
    try {
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ message: 'tarea no encontrada' });
        }

        const nombreant = tarea.descripcion;
        const nomfileprueba = tarea.prueba_doc;
        // const archivo = req.file ? req.file.filename : tarea.descripcion;

        const archivo = req.files.documentacion ? req.files.documentacion[0].filename : tarea.descripcion;
        const fileprueba = req.files.fileprueba ? req.files.fileprueba[0].filename : tarea.prueba_doc;

        await tarea.update({ proyecto_id, area_id, nombre, descripcion: archivo, estado, usuario_id, prueba_doc: fileprueba, visto_bueno });

        const rutaFile = "uploads/" + nombreant;

        //si se subio un nuevo archivo, eliminar el anterior
        if (req.files.documentacion) {

            if (nombreant != '' && fs.existsSync(rutaFile)) {
                console.log("existe");
                fs.unlinkSync(rutaFile, (err) => {
                    if (err) {
                        console.log(err);
                        console.log('error al eliminar el archivo');
                    }
                    else {
                        console.log('eliminando archivo ')
                    }
                })
            }
            else {
                console.log("no se encontro el file");
            }
        }
        //si se subio un nuevo archivo de prueba documentacion, eliminar el anterior
        if (req.files.fileprueba) {
            if (nomfileprueba != '' && fs.existsSync("uploads/" + nomfileprueba)) {
                console.log("existe");
                fs.unlinkSync("uploads/" + nomfileprueba, (err) => {
                    if (err) {
                        console.log(err);
                        console.log('error al eliminar el archivo');
                    }
                    else {
                        console.log('eliminando archivo ')
                    }
                })
            }
            else {
                console.log("no se encontro el file");
            }
        }

        res.json(tarea);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

export const deleteTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Tarea.findByPk(id);
        if (tarea) {
            await tarea.destroy();
            res.json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la Tarea' });
    }
};
// export const downloadfile = async (req, res) => {
//     const { id } = req.params;
//     try {
//         console.log("*******************************" + id)
//         const tarea = await Tarea.findByPk(id);
//         if (!tarea) {
//             return res.status(400).json({ message: 'Identificador no encontrado' });
//         }
//         console.log(tarea)
//         if (tarea.descripcion == "") {
//             return res.status(400).json({ message: 'No hay ningun archivo disponible' });
//         }

//         const rutaFile = "uploads/" + tarea.descripcion;
//         if (fs.existsSync(rutaFile)) {
//             console.log("existe");
//             // const rutaArchivo=path.join(__dirname,rutaFile);
//             const rutaArchivo = rutaFile;
//             res.setHeader('Content-Disposition', 'attachment;filename="documentacionTarea.pdf"');
//             res.setHeader('Content-Type', 'application/pdf');
//             fs.createReadStream(rutaArchivo).pipe(res);
//         }
//         else {
//             console.log("no se encontro el file");
//             return res.status(400).json({ message: 'No se encontro el archivo' });
//         }

//     } catch (error) {
//         console.log("error al cargar la info")
//         if (!res.headersSent) {
//             res.status(500).json({ message: 'Error al cargar la info' });
//         }

//     }
// };
// export const downloadfile2 = async (req, res) => {
//     const { id } = req.params;
//     try {
//         console.log("*******************************" + id)
//         const tarea = await Tarea.findByPk(id);
//         if (!tarea) {
//             return res.status(400).json({ message: 'Identificador no encontrado' });
//         }
//         console.log(tarea)
//         if (tarea.prueba_doc == "") {
//             return res.status(400).json({ message: 'No hay ningun archivo disponible' });
//         }

//         const rutaFile = "uploads/" + tarea.prueba_doc;
//         if (fs.existsSync(rutaFile)) {
//             console.log("existe");
//             // const rutaArchivo=path.join(__dirname,rutaFile);
//             const rutaArchivo = rutaFile;
//             res.setHeader('Content-Disposition', 'attachment;filename="PruebaFinalizacion.pdf"');
//             res.setHeader('Content-Type', 'application/pdf');
//             fs.createReadStream(rutaArchivo).pipe(res);
//         }
//         else {
//             console.log("no se encontro el file");
//             return res.status(400).json({ message: 'No se encontro el archivo' });
//         }

//     } catch (error) {
//         console.log("error al cargar la info")
//         if (!res.headersSent) {
//             res.status(500).json({ message: 'Error al cargar la info' });
//         }

//     }
// };

// Función helper para manejar la descarga de archivos
const handleFileDownload = async (id, fileField, fileName) => {
    try {
        const tarea = await Tarea.findByPk(id);

        if (!tarea) {
            return {
                success: false,
                status: 400,
                message: 'Identificador no encontrado'
            };
        }

        if (!tarea[fileField]) {
            return {
                success: false,
                status: 400,
                message: 'No hay ningún archivo disponible'
            };
        }

        const rutaFile = `uploads/${tarea[fileField]}`;

        if (!fs.existsSync(rutaFile)) {
            return {
                success: false,
                status: 400,
                message: 'No se encontró el archivo'
            };
        }

        return {
            success: true,
            rutaArchivo: rutaFile,
            fileName: fileName
        };
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: 'Error al cargar la info'
        };
    }
};

// Controllers
export const downloadfile = async (req, res) => {
    const result = await handleFileDownload(
        req.params.id,
        'descripcion',
        'documentacionTarea.pdf'
    );

    if (!result.success) {
        return res.status(result.status).json({ message: result.message });
    }

    res.setHeader('Content-Disposition', `attachment;filename="${result.fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    fs.createReadStream(result.rutaArchivo).pipe(res);
};

export const downloadfile2 = async (req, res) => {
    const result = await handleFileDownload(
        req.params.id,
        'prueba_doc',
        'PruebaFinalizacion.pdf'
    );

    if (!result.success) {
        return res.status(result.status).json({ message: result.message });
    }

    res.setHeader('Content-Disposition', `attachment;filename="${result.fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    fs.createReadStream(result.rutaArchivo).pipe(res);
};