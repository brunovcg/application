import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import { VimeoVideosThumbnailsResponse } from './Vimeo.services.types';

const { production, staging, development } = ServicesEndpointsConfigs.defaultIMBackend;

const baseURL = Environment.configServiceBaseURL({
  production: `${production}/vimeo`,
  staging: `${staging}/vimeo`,
  development: `${development}/vimeo`,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class VimeoServices {
  static getThumbnails(videosIds: (string | number)[]) {
    const formattedVideosIds = videosIds.map((id) => `videoId=${id}`).join('&');

    return http.get<VimeoVideosThumbnailsResponse>({
      URL: `videos/pictures?${formattedVideosIds}`,
    });
  }
}

export default VimeoServices;
