import styled from 'styled-components';
import { SupportConfigs } from '../../../../configs';

const { mobileBreakpoint } = SupportConfigs.resolutions;

const StyledFooter = styled.footer`
  min-height: 15px;
  width: 100%;
  background-color: var(--container-white-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
  color: var(--typeface-medium-color);
  font-size: 10px;
  border-top: 1px solid var(--border-medium-color);

  .im-footer-section {
    display: flex;
    align-items: center;
    color: var(--typeface-light-color);
  }

  .im-terms-button {
    font-size: 10px;
    line-height: 1.1;
  }

  @media (max-width: ${mobileBreakpoint}) {
    display: flex;
    flex-direction: column;
  }
`;

export default StyledFooter;
