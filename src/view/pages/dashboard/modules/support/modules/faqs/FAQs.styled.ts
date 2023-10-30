import styled from 'styled-components';

export const StyledFAQs = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  max-width: 1000px;

  .im-faqs-search {
    margin-bottom: 20px;

    .im-faqs-search-content {
      max-width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }

  .im-faqs-content {
    display: flex;
    flex: 1;
    .im-faqs-filter,
    .im-faqs-questions {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 20px;
    }

    .im-faqs-filter {
      border-right: 1px solid var(--border-color);
      padding-right: 15px;
      margin-right: 25px;
      gap: 20px;
    }

    .im-faqs-questions {
      flex: 1;
      gap: 5px;

      .im-faqs-category-section {
        margin-bottom: 20px;

        .im-faq-question-list {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .im-faq-question {
            list-style: none;
            margin-left: 10px;
            color: var(--typeface-medium-color);
            padding: 10px;
            cursor: pointer;
            &:hover {
              background-color: var(--container-hover-color);
              border-radius: var(--container-border-radius);
            }

            li {
              display: flex;
              gap: 5px;
              align-items: center;
            }
          }
        }
      }
    }
  }
`;

export const StyledMobileFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
