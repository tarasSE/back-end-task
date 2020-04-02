import {post, requestBody, RestBindings, Request, Response} from '@loopback/rest';
import {inject} from '@loopback/context';
import multer from 'multer';
import {resizeImage} from '../services/main.service';

export class MainController {
  constructor() {}

  @post('/image/resize')
  async resizeImage(@requestBody({
    description: 'multipart/form-data',
    required: true,
    content: {
      'multipart/form-data': {
        'x-parser': 'stream',
        schema: {type: 'object'},
      },
    },
  })
  request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response, ): Promise<object> {
    const storage = multer.memoryStorage();
    const upload = multer({storage});

    return new Promise<object>((resolve, reject) => {
      //@ts-ignore
      upload.any()(request, response, async (err: any) => {
        if (err) reject(err);
        else {
          //@ts-ignore
          const image = request.files[0].buffer;

          resolve({
            original: image,
            resized: await resizeImage(image, 100, 100)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // fields: (request as any).fields,
          });
        }
      });
    });
  }
}
