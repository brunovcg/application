import styled from 'styled-components';

const StyledDebugLog = styled.div`
  border: 1px solid var(--typeface-white-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  .im-debug-content {
    display: flex;
    gap: 10px;
  }
`;

export default StyledDebugLog;
