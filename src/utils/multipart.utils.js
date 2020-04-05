import multer from 'multer';

export const getImageFromRequest = (request, response) => new Promise((resolve, reject) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  upload.any()(request, response, (err) => {
    if (err) {
      reject(err);
    }

    if (!request.files || request.files.length === 0) {
      throw new Error('No files found in request!')
    }

    const image = request.files[0].buffer;

    resolve(image);
  });

});

export default { getImageFromRequest };
