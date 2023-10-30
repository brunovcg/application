import { SupportConfigs } from '../../../configs';
import styled from 'styled-components';

const { mobileBreakpoint } = SupportConfigs.resolutions;

const StyledLogin = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--container-im-gradient-color);
  max-width: 100vw;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0 30px;

  .im-login-forgot-password {
    margin-top: 20px;
  }

  @media (max-width: ${mobileBreakpoint}) {
    align-items: flex-start;
    gap: 0px;
  }

  .im-login-title {
    width: 400px;
    color: var(--typeface-white-color);

    @media (max-width: ${mobileBreakpoint}) {
      margin-top: 50px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    p {
      font-family: var(--typeface-serif);
      font-size: 25px;
      margin-bottom: 10px;
      @media (max-width: ${mobileBreakpoint}) {
        margin: 0 20px;
      }
    }

    h2 {
      font-size: 42px;
      @media (max-width: ${mobileBreakpoint}) {
        margin: 0 20px;
      }
    }
  }
  .im-login-form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--container-white-color);
    border: 1px solid var(--border-color);
    padding: 50px 30px;
    box-shadow: var(--container-box-shadow);
    border-radius: var(--container-border-radius);
    width: 450px;
    gap: 15px;

    .im-login-form-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }

    .im-login-option-buttons {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (max-width: ${mobileBreakpoint}) {
      padding: 50px 15px;
      margin: 0 10px;
      max-width: 100%;
    }
  }
`;

export default StyledLogin;
