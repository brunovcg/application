import styled from 'styled-components';

export const StyledTypeOfProperty = styled.div`
  width: 100%;
  .im-container.im-preferences-type-of-property {
    padding: 40px 20px 20px;

    .im-preferences-type-of-property-commands {
      width: 100%;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .im-grids-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px 40px;

      .im-preference-grid-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        max-width: 100%;

        .im-preferences-grid {
          width: 300px;
          max-width: 100%;
          border: 1px solid var(--border-color);
          border-radius: var(--container-border-radius);

          .im-property-type-frozen-cell {
            display: flex;
            width: 60px;
            justify-content: flex-start;
          }
        }
      }
    }
  }
`;
