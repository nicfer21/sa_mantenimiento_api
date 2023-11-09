import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/png", "image/jpeg", "image/jpg"];

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, "../uploads"),
    filename: (req, file, callback) => {
      // aca conseguimos la estension del archvivo y el tipo
      const fileExtension = extname(file.originalname);
      // esto es para obtener el nombre original del archivo
      const fileName = file.originalname.split(fileExtension)[0];
      // esto es para concatenar el nombre del archivo + fecha  + la extension
      callback(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  /* Esto es para subir archivos pero sin determinar el tipo de archivo que es */
  /* dest: join(CURRENT_DIR, './uploads'), */
  fileFilter: (req, file, callback) => {
    if (MIMETYPES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(`Solo se acepta los tipos ${MIMETYPES.join(" ")}`));
    }
  },
  limits: {
    fileSize: 15000000, //bytes
  },
});
