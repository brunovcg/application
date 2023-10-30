import { StorageHelper } from '../../../helpers';
import { JsonViewer } from '../../../../view/components';
import StyledDebugStorage from './DebugStorage.styled';

export function DebugStorage() {
  const json = StorageHelper.local.getIMObject();

  return (
    <StyledDebugStorage className="im-debug-storage">
      <JsonViewer json={json} initStyle="dark" />
    </StyledDebugStorage>
  );
}
