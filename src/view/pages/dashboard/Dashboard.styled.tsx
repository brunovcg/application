import styled from 'styled-components';
import { SupportConfigs } from '../../../configs';

const { mobileBreakpoint } = SupportConfigs.resolutions;

const StyledDashboard = styled.div`
  height: 100%;
  display: flex;
  width: 100%;

  @media (max-width: ${mobileBreakpoint}) {
    position: relative;
  }

  .im-dashboard-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--container-background-color);

    @media (max-width: ${mobileBreakpoint}) {
      padding: 20px;
    }
    #im-dashboard-content-buttons {
      position: sticky;
      width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      padding-bottom: -20px;
    }
  }
`;

export default StyledDashboard;
