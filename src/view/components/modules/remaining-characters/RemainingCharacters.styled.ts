import styled from 'styled-components';

const StyledRemainingCharacters = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: var(--typeface-light-color);
  display: flex;
  justify-content: end;
  align-items: end;
  width: 80px;

  &.im-disabled {
    color: var(--disabled-color);
  }

  .im-remaining-characters-value {
    width: 25px;
  }

  .im-remaining-no-characters {
    color: var(--disabled-color);
  }
`;

export default StyledRemainingCharacters;
