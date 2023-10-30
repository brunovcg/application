import { ServicesEndpointsConfigs } from '../../../configs';
import { DOMHelper, JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  SquidexFAQsResponse,
  SquidexServicesResponse,
  SquidexSignatureSolutionResponse,
  SquidexVendorsResponse,
  TermsAndConditionsResponse,
  TrainingSessionsResponse,
  TrainingsResponse,
} from './Squidex.services.types';

const { baseURL, content, assets, appAssets } = ServicesEndpointsConfigs.squidex;

const http = new Http({
  baseURL,
  setToken: JWTHelper.getSquidexToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Flatten': 'true',
  },
});

abstract class SquidexServices {
  static listVendors() {
    return http.get<SquidexVendorsResponse>({
      URL: `${content}/vendor`,
    });
  }

  static listServices() {
    return http.get<SquidexServicesResponse>({
      URL: `${content}/services`,
    });
  }

  static listTrainings() {
    return http.get<TrainingsResponse>({
      URL: `${content}/training`,
    });
  }

  static listTrainingSessions() {
    return http.get<TrainingSessionsResponse>({
      URL: `${content}/trainingsession`,
    });
  }

  static listFAQ() {
    return http.get<SquidexFAQsResponse>({
      URL: `${content}/faq`,
    });
  }

  static getTermsAndConditions() {
    return http.get<TermsAndConditionsResponse>({
      URL: `${content}/termsandconditions`,
    });
  }

  static getSignatureSolution() {
    return http.get<SquidexSignatureSolutionResponse>({
      URL: `${content}/signaturesolution`,
    });
  }

  static async downloadAsset(assetId: number | string, settledCallback?: () => void) {
    try {
      const res = await http.get<Blob>({
        URL: `${assets}/${assetId}`,
        responseType: 'blob',
      });
      const fileInfo = await http.get({ URL: `${appAssets}/${assetId}` });
      settledCallback?.();
      const filename = (fileInfo as { fileName: string }).fileName ?? '';
      DOMHelper.downloadFile({ filename, file: res });
    } catch (e) {
      console.error(e);
    }
  }
}

export default SquidexServices;
