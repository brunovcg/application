import styled from 'styled-components';
import { StyledSectionProps } from './Section.types';

const StyledSection = styled.section<StyledSectionProps>`
  border: 1px solid var(--border-medium-color);
  border-radius: var(--container-border-radius);
  background-color: var(--container-white-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  max-height: ${(props) => props.maxHeight};
  min-height: ${(props) => props.minHeight};
  max-width: ${(props) => props.maxWidth};
  position: relative;

  .im-section-header {
    display: flex;
    position: absolute;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
  }

  .im-section-content {
    margin-top: ${(props) => !!props.sectionTitle && '40px'};
    padding: 8px 0;
    flex: 1;
    overflow: auto;
    min-height: 50px;
  }
`;

export default StyledSection;
