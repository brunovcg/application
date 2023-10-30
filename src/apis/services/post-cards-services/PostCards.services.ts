import Http from '../../../utils/http/Http';
import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { DOMHelper, JWTHelper } from '../../../utils/helpers';
import {
  GenerateMultiplePostCardsArgs,
  GenerateMultiplePostCardsPayload,
  PostCardsResponse,
  GetPostCardsArgs,
} from './PostCards.services.types';

const { configServiceBaseURL } = Environment;
const { getIMToken } = JWTHelper;
const { production, staging, development } = ServicesEndpointsConfigs.defaultIMBackend;
const { downloadFile } = DOMHelper;

const baseURL = configServiceBaseURL({
  production,
  staging,
  development,
});

const applicationJson = 'application/json';

const http = new Http({
  baseURL,
  setToken: getIMToken,
  headers: {
    'Content-Type': applicationJson,
    'Accept': applicationJson,
  },
});

abstract class PostCardsServices {
  static getOne({ params, ...rest }: GetPostCardsArgs) {
    const { customerUsername, countiesIds, count, bypassABFilter } = params;

    return http.get({
      URL: `/post-cards?username=${customerUsername}&counties=${countiesIds.join(
        ','
      )}&postCardCount=${count}&skipTrack=${bypassABFilter}&allowRankingsInProgress=false`,
      ...rest,
    });
  }

  static async downloadByTaskId(taskId: number) {
    const file = await http.get<File>({
      URL: `admin/download-post-card?taskId=${taskId}`,
      responseType: 'blob',
    });

    downloadFile({ file, filename: `Post Cards - Task ${taskId}.csv` });
  }

  static generateMultiple(args: GenerateMultiplePostCardsArgs) {
    return http.post<GenerateMultiplePostCardsPayload, PostCardsResponse>({
      URL: 'post-cards?allowRankingsInProgress=false',
      ...args,
    });
  }
}

export default PostCardsServices;
