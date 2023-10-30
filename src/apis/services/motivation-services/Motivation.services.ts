import { Environment, ServicesEndpointsConfigs } from '../../../configs';
import { JWTHelper } from '../../../utils/helpers';
import Http from '../../../utils/http/Http';
import {
  DrivingForDollarsResponse,
  MotivationListResponse,
  MotivationSource,
  MotivationSourcesResponse,
  ListMotivationSourcesArgs,
  MotivationSourceGroupsResponse,
  UpdateMotivationArgs,
  Motivation,
  AddMotivationArgs,
  MotivationGroup,
  ToggleMotivationSourceStatusArgs,
  UpdateSourceArgs,
  ToggleMotivationSourceGroupStatusArgs,
  UpdateSourceGroupArgs,
  UpdateSourceGroupSourcesArgs,
  MotivationSourceGroup,
  UpdateSourceGroupPayload,
} from './Motivation.services.types';

const baseURL = Environment.configServiceBaseURL({
  ...ServicesEndpointsConfigs.defaultIMBackend,
});

const http = new Http({
  baseURL,
  setToken: JWTHelper.getIMToken,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

abstract class MotivationServices {
  static list() {
    return http.get<MotivationListResponse>({
      URL: 'motivations',
    });
  }

  static listGroups() {
    return http.get<MotivationGroup[]>({ URL: '/motivation-groups' });
  }

  static listSources({ showDisabled = true }: ListMotivationSourcesArgs) {
    const disabledParam = !showDisabled ? '?disabled=false' : '';
    return http.get<MotivationSourcesResponse>({
      URL: `motivation-sources${disabledParam}`,
    });
  }

  static listSourceGroups() {
    return http.get<MotivationSourceGroupsResponse>({
      URL: 'motivation-source-groups',
    });
  }

  static getSource(motivationName: string) {
    return http.get<MotivationSource>({ URL: `motivation-sources/${motivationName}` });
  }

  static getDrivingForDollars() {
    return http.get<DrivingForDollarsResponse>({
      URL: 'motivations/driving_for_dollars',
    });
  }

  static update({ motivationId, payload, ...rest }: UpdateMotivationArgs) {
    return http.put<Motivation, null>({
      URL: `/motivations/${motivationId}`,
      payload: payload,
      ...rest,
    });
  }

  static delete(motivationId: number) {
    return http.delete({
      URL: `/motivations?ids=${motivationId}`,
    });
  }

  static addMotivation(args: AddMotivationArgs) {
    return http.post<Motivation, Motivation>({
      URL: '/motivations',
      payload: args.payload,
    });
  }

  static toggleMotivationSourceStatus({ currentEnabled, motivationSourceId, ...rest }: ToggleMotivationSourceStatusArgs) {
    if (currentEnabled) {
      return http.delete({ URL: `/motivation-sources/${motivationSourceId}/status`, ...rest });
    }
    return http.post({ URL: `/motivation-sources/${motivationSourceId}/status`, ...rest });
  }

  static updateSource({ payload, params, ...rest }: UpdateSourceArgs) {
    return http.patch({ URL: `/motivation-sources/${params.sourceId}`, payload, ...rest });
  }

  static toggleMotivationSourceGroupStatus({ currentEnabled, motivationSourceGroupId, ...rest }: ToggleMotivationSourceGroupStatusArgs) {
    if (currentEnabled) {
      return http.delete({ URL: `/motivation-source-groups/${motivationSourceGroupId}/status`, ...rest });
    }
    return http.post({ URL: `/motivation-source-groups/${motivationSourceGroupId}/status`, ...rest });
  }

  static updateSourceGroup({ payload, params, ...rest }: UpdateSourceGroupArgs) {
    return http.patch<UpdateSourceGroupPayload, MotivationSourceGroup>({
      URL: `motivation-source-groups/${params.sourceGroupId}`,
      payload,
      ...rest,
    });
  }

  static updateSourceGroupSources({ payload, params, ...rest }: UpdateSourceGroupSourcesArgs) {
    return http.patch<MotivationSource[], MotivationSourceGroup>({
      URL: `motivation-source-groups/${params.sourceGroupId}/motivation-sources`,
      payload,
      ...rest,
    });
  }
}

export default MotivationServices;
