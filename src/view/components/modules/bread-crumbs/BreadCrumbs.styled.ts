import styled from 'styled-components';
import { StyledBreadCrumbsProps } from './BreadCrumbs.types';

const StyledBreadCrumbs = styled.nav<StyledBreadCrumbsProps>`
  .im-bread-crumbs-content {
    min-height: 44px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    border: 1px solid var(--border-color);
    border-radius: var(--container-border-radius);
    width: ${(props) => props.width ?? 'fit-content'};
    padding: 10px;
    background-color: var(--container-white-color);
  }

  .im-bread-crumb-item {
    border: none;
    color: var(--primary-color);
    font-size: 14px;
    font-weight: bold;
    background-color: var(--transparent);
    cursor: pointer;
  }
`;

export default StyledBreadCrumbs;
