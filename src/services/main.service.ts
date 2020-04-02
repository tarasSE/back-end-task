import sharp from 'sharp';

export const resizeImage = async (image: any, width: Number, height: Number) => sharp(image).resize(100, 100).png().toBuffer();
