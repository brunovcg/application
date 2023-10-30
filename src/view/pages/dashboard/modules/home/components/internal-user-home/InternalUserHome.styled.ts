import styled, { keyframes } from 'styled-components';

const moduleSize = '200px';

const zoom = keyframes`
 0% {scale: 0.8 }
 100% { scale: 1  }
`;

const StyledInternalUserHome = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1595px;
  .im-internal-user-home-logo-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 20px 0;
    width: 100%;
    margin-bottom: 40px;
    animation-name: ${zoom};
    animation-duration: 3s;
    flex: 1;
    .im-internal-user-home-slogan {
      font-size: 25px;
      font-weight: bold;
      font-family: var(--typeface-monospace);
      color: var(--typeface-light-color);
      text-align: center;
    }
  }

  .im-internal-user-home-user-search {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    min-height: fit-content;

    .im-internal-user-home-second-line {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      align-items: flex-end;
    }
  }

  .im-internal-user-home-module-content {
    display: flex;
    gap: 25px;
    align-items: center;
    overflow-x: auto;
    min-height: 250px;
    padding: 0 20px;

    .im-message-container {
      margin: 0 auto;
    }

    .im-internal-user-home-module {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--container-white-color);
      gap: 10px;
      min-width: ${moduleSize};
      max-width: ${moduleSize};
      height: ${moduleSize};
      padding: 15px;
      cursor: pointer;
      box-shadow: var(--container-box-shadow);
      transition: scale 0.5s;

      &:hover {
        scale: 1.1;
        border: 1px solid var(--primary-color);
        transition: scale 0.5s;
      }

      .im-module-name {
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        font-weight: bold;
        font-size: 14px;
        height: 45%;
      }
      .im-module-description {
        flex: 1;
        line-height: 1.3;
        font-size: 12px;
        text-align: center;
        width: 100%;
        color: var(--typeface-light-color);
      }
    }
  }
`;

export default StyledInternalUserHome;
