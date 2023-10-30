import styled from 'styled-components';

export const StyledDevToolsButton = styled.div<{ zIndex: number }>`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 60px;
  margin-bottom: 12px;
  z-index: ${(props) => props.zIndex};

  .im-button-icon {
    z-index: ${(props) => props.zIndex};
  }
`;

export const StyledDevToolsLog = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: none;
  height: fit-content;

  &.im-not-selected {
    padding: 0px;
    visibility: hidden;
    height: 0;
  }
`;
