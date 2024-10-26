import multer from 'multer';

// Configurar la ruta de subida de archivos y cómo se guardarán
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // cb(null, uniqueSuffix + '-' + file.originalname); // Guardar el archivo con un nombre único
        const extension = file.mimetype.split('/')[1];
        cb(null, uniqueSuffix + '-file.' + extension); // Guardar el archivo con un nombre único
    }
});

const upload = multer({ storage });
export default upload;