import {post, requestBody, RestBindings, Request, Response} from '@loopback/rest';
import {inject} from '@loopback/context';
import {ImageUtils, MultipartUtils} from '../utils';

export class MainController {
  constructor() {}

  @post('/image/resize')
  async resizeImage(
    @requestBody({
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
    @inject(RestBindings.Http.RESPONSE) response: Response
  ): Promise<object> {
    const image = await MultipartUtils.getImageFromRequest(request, response);

    return {
      original: image,
      resized: await ImageUtils.resizeImage(image, 100, 100)
    }
  }
}
