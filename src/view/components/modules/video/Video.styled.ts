import styled from 'styled-components';
import { StyledVideoProps } from './Video.types';

const StyledVideo = styled.div<StyledVideoProps>`
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  iframe {
    overflow: hidden;
    border: 0;
    align-self: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .im-loading-wrapper {
    background-color: var(--container-white-color);
    border-radius: var(--container-border-radius);
    border: 1px solid var(--border-color);
    padding: 15px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    .im-loading-video {
    }
  }
`;

export default StyledVideo;
