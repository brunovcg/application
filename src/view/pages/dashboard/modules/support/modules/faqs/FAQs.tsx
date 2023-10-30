import { useTranslation } from 'react-i18next';
import { Checkbox, SearchMenu, Title, Icon, Popover, ButtonIcon, Section, UserFeedback } from '../../../../../../components';
import { squidexQueries } from '../../../../../../../apis/queries';
import { StyledFAQs, StyledMobileFilter } from './FAQs.styled';
import { useTranslationPath, useDevice } from '../../../../../../../utils/hooks';
import { FAQ, MappedSquidexField } from '../../../../../../../apis/queries/squidex/types';
import { useState, useMemo, useContext } from 'react';
import { DataHelper } from '../../../../../../../utils/helpers';
import { FAQCategory } from '../../../../../../../apis/services/squidex-services/Squidex.services.types';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useFAQsQuery } = squidexQueries;
const { filterMap } = DataHelper;

const handleSearch = (option: FAQ, typedSearch = '') => {
  const mappedTypedSearch = typedSearch
    .trim()
    .split(' ')
    .filter((item) => item.length > 2);

  return mappedTypedSearch.some((word) => option.content.includes(word.toLowerCase()));
};

export default function FAQs() {
  const { faqsIsLoading, faqs } = useFAQsQuery();
  const { hasMinDesktopViewport } = useDevice();
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.Support');
  const [filteredCategories, setFilteredCategories] = useState<FAQCategory[]>([]);
  const { openDialog } = useContext(DialogsContext);

  const handleFilters = (category: FAQCategory) => {
    if (filteredCategories.includes(category)) {
      return setFilteredCategories((state) => state.filter((item) => item !== category));
    }
    setFilteredCategories((state) => [...state, category]);
  };

  const categoryFilterRenderer = useMemo(
    () => (
      <>
        <Title text={t(path('Filters'))} variant="primary-dark" />
        <StyledMobileFilter className="im-faqs-mobile-filter">
          {faqs?.categories?.map((category) => (
            <Checkbox key={category} label={category} onChange={() => handleFilters(category)} />
          ))}
        </StyledMobileFilter>
      </>
    ),
    [faqs, filteredCategories]
  );

  if (faqsIsLoading) {
    return <UserFeedback variant="loading" maxWidth="1000px" />;
  }

  const openAnswerDialog = (title: string, answer: MappedSquidexField[]) => openDialog({ id: 'FAQAnswerDialog', props: { title, answer } });

  const filterIconColor = filteredCategories.length ? 'primary' : 'medium';

  return (
    <StyledFAQs className="im-faqs">
      <Section className="im-faqs-search" contentClassName="im-faqs-search-content">
        {!hasMinDesktopViewport && (
          <Popover trigger={<ButtonIcon icon="filter" variant={filterIconColor} />} content={categoryFilterRenderer} />
        )}
        <SearchMenu
          width="100%"
          debounce={300}
          label={t('Common.Search')}
          placeholder={t(path('HaveAQuestion'))}
          onOptionClick={(question) => openAnswerDialog(question.question, question.answer)}
          searchFunction={handleSearch}
          options={faqs.list}
          displayAccessor="question"
          contentAccessor="content"
        />
      </Section>
      <div className="im-faqs-content">
        {hasMinDesktopViewport && <div className="im-faqs-filter">{categoryFilterRenderer}</div>}
        <div className="im-faqs-questions">
          <Title text={t(path('FrequentQuestions'))} icon="forum" />
          {filterMap(
            faqs.listByCategory,
            (category) => {
              if (filteredCategories.length) {
                return filteredCategories.includes(category.name);
              }
              return true;
            },
            (category) => (
              <Section key={category.name} className="im-faqs-category-section" sectionTitle={category.name}>
                <ul className="im-faq-question-list">
                  {category.questions.map((question) => (
                    <div key={question.id} className="im-faq-question" onClick={() => openAnswerDialog(question.question, question.answer)}>
                      <li>
                        <Icon icon="file" />
                        <p>{question.question}</p>
                      </li>
                    </div>
                  ))}
                </ul>
              </Section>
            )
          )}
        </div>
      </div>
    </StyledFAQs>
  );
}
