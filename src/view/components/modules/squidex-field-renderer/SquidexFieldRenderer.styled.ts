import styled from 'styled-components';

export const StyledSquidexFieldRenderer = styled.div`
  .im-squidex-field-image {
    max-width: 100%;
    border: 1px solid var(--border-light-color);
    border-radius: var(--container-border-radius);
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-bottom: 10px;

    span {
      width: fit-content;
      max-width: 100%;
      border-radius: var(--container-border-radius);
      img {
        border: 1px solid var(--border-light-color);
        border-radius: var(--container-border-radius);
        max-width: 100%;
        cursor: zoom-in;
      }
    }
  }

  .im-squidex-field-richtext {
    .im-injected-html {
      div {
        line-height: 1.3;
      }
    }
  }

  .im-squidex-field-paragraph {
    color: var(--typeface-medium-color);
    margin: 0 5px;
    font-size: 16px;
    border: 1px solid var(--border-light-color);
    border-radius: var(--container-border-radius);
    padding: 5px;
  }

  .im-squidex-field-video {
    margin: 0 10px;
    border: 1px solid var(--border-light-color);
    border-radius: var(--container-border-radius);
  }
`;
