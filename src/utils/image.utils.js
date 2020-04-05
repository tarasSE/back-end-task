import sharp from 'sharp';

export const resizeImage = async (image, width, height) => sharp(image).resize(width, height).png().toBuffer();

export default { resizeImage };
