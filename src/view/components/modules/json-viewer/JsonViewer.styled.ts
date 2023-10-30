import styled from 'styled-components';

const StyledJsonViewer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 13px;

  &.im-light {
    color: var(--typeface-medium-color);
  }

  &.im-dark {
    color: initial;
  }

  &.im-json-viewer {
    height: 100%;

    .im-json-viewer-added {
      height: 100%;
      overflow-y: auto;
      div[role='list'] {
        height: 100%;
        padding: 5px 0 5px 5px;
        margin: 0;
      }
    }
  }

  .im-json-viewer-switch {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 20px;
    background-color: var(--container-white-color);
    border: 1px solid var(--border-color);
    padding: 5px;
    border-radius: var(--container-border-radius);
    font-size: 12px;
    color: var(--typeface-medium-color);
    .im-switch-thumb {
      height: 16px;
    }
  }
`;

export default StyledJsonViewer;
