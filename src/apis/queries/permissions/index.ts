import { useQuery } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { PermissionServices } from '../../services';

const { LIST_PERMISSIONS } = Constants.QUERIES;

const useListPermissionsQuery = () => {
  const { data, isLoading, isSuccess } = useQuery(LIST_PERMISSIONS, PermissionServices.list, {
    refetchOnWindowFocus: false,
  });

  const permissionList = data ?? [];

  return { permissionList, permissionListLoading: isLoading, permissionsIsSuccess: isSuccess };
};

export default { useListPermissionsQuery };
