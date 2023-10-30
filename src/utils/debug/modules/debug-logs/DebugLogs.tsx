import { Button, Portal } from '../../../../view/components';
import StyledDebugLog from './DebugLog.styled';
import { DebugLogsProps } from './DebugLogs.types';

export default function DebugLog({ id, items, active = true }: DebugLogsProps) {
  const content = (
    <StyledDebugLog className={`im-debug-${id} im-debug-item`} key={`im-debug-${id}`}>
      <div className="im-debug-title">{id}</div>
      <div className="im-debug-content">
        {Object.entries(items).map((it) => (
          <Button
            small
            stopPropagation
            preventDefault
            key={it[0]}
            text={it[0]}
            onClick={() => console.log(`%c[${id}][${it[0]}] => `, 'color: green', it[1])}
            variant="warning"
            styling="regular"
          />
        ))}
      </div>
    </StyledDebugLog>
  );

  if (!active) {
    return null;
  }

  return <Portal element={content} targetId="im-debug-dev-tools-log" />;
}
