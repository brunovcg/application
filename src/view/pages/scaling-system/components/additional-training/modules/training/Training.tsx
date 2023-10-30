import { useTranslationPath } from '../../../../../../../utils/hooks';
import { useTranslation } from 'react-i18next';
import { Title, Container, InputText, Chip, Icon, Text, Section, UserFeedback, Selector, DatePicker } from '../../../../../../components';
import Constants from '../../../../../../../utils/constants/Constants';
import './Training.scss';
import { TrainingProps } from './Training.types';
import { useContext, useState } from 'react';
import { DataHelper, DateTimeHelper } from '../../../../../../../utils/helpers';
import { TrainingWithThumbnail } from '../../../../../../../apis/queries/squidex/types';
import { SquidexFile, SquidexLink } from '../../../../../../../apis/services/squidex-services/Squidex.services.types';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { TRAINING_LEVELS } = Constants;

const { areDateEquals } = DateTimeHelper;

const { filterMap } = DataHelper;

export default function Training({ trainings, trainingsIsLoading }: TrainingProps) {
  const [selectedCriteria, setSelectedCriteria] = useState<string>('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const { openDialog } = useContext(DialogsContext);

  const { t } = useTranslation();
  const path = useTranslationPath('Pages.ScalingSystem.AdditionalTraining');

  const openVideoDialog = (training: TrainingWithThumbnail) => openDialog({ id: 'TrainingVideoDialog', props: { training } });

  const trainingLevel = t(path('FilterCriteriaOptions.Level'));
  const title = t(path('FilterCriteriaOptions.Title'));
  const description = t(path('FilterCriteriaOptions.Description'));
  const date = t(path('FilterCriteriaOptions.Date'));
  const criteriaFilterOptions = [title, description, trainingLevel, date];

  const filters = {
    [title]: 'name',
    [trainingLevel]: 'trainingLevel',
    [date]: 'date',
    [description]: 'description',
  };

  const renderResourceCaption = (resources: (SquidexLink | SquidexFile)[]) => {
    const numberOfResources = resources.length;

    if (!numberOfResources) {
      return null;
    }

    return (
      <span className="im-resources-info">
        <Icon icon="files" />
        {t(path('ResourcesNumber'), { number: numberOfResources })}
      </span>
    );
  };

  if (trainingsIsLoading) {
    return <UserFeedback variant="loading" className="im-products-feedback" maxWidth="100%" />;
  }

  const dataRenderer = filterMap(
    trainings,
    (item: (typeof trainings)[number]) => {
      if (!selectedCriteria || (!filterValue && !filteredDate)) {
        return true;
      }

      if (selectedCriteria === date) {
        return areDateEquals(new Date(item.date), filteredDate as Date);
      }

      const field = filters[selectedCriteria as keyof typeof filters];
      if (!item[field as keyof typeof item]) {
        return false;
      }

      return (item?.[field as keyof typeof item] as string)?.toLowerCase()?.includes(filterValue);
    },
    (item) => {
      const getLevel = TRAINING_LEVELS.find((level) => level.name === item.trainingLevel);

      return (
        <Container key={item.videoId} className="im-training-option" onClick={() => openVideoDialog(item)}>
          <div data-testid={`im-training-thumbnail-${item.name}`} className="im-training-thumbnail">
            <img src={item.thumbnail} alt={item.name} />
          </div>
          <div className="im-training-option-info">
            <div className="im-training-title-description">
              <Title text={item.name} variant="dark" size="small" className="im-training-title" maxCharacters={90} marginBottom="0px" />
              {item.description && <Text className="im-training-description" text={item.description} maxLines={5} size="tiny" italic />}
            </div>
            <div className="im-training-option-details">
              <span className="im-training-date"> {item.formattedDate}</span>
              <div className="im-training-level">
                {getLevel?.name && <Chip size="small" variant={getLevel?.color} text={getLevel?.name} />}
              </div>
              {renderResourceCaption(item.resources)}
            </div>
          </div>
        </Container>
      );
    }
  );

  const renderLevelSelect = selectedCriteria === trainingLevel;
  const renderInputSearch = selectedCriteria !== trainingLevel && selectedCriteria !== date;
  const renderDatePicker = selectedCriteria === date;

  return (
    <div className="im-community-training">
      <Section contentClassName="im-community-training-filters">
        <Selector
          options={criteriaFilterOptions}
          showError={false}
          width="180px"
          allowSearch={false}
          onSelect={(list) => {
            setSelectedCriteria(list[0] as string);
            setFilteredDate(null);
          }}
          label={t(path('FilterCriteria'))}
        />

        {renderInputSearch && (
          <InputText
            width="260px"
            onChange={(value) => setFilterValue(value?.toLowerCase())}
            debounce={300}
            label={t(path('Filter'))}
            showError={false}
          />
        )}
        {renderDatePicker && <DatePicker onSelect={(value) => setFilteredDate(value as Date)} />}
        {renderLevelSelect && (
          <Selector
            options={TRAINING_LEVELS.map((item) => item.name)}
            width="260px"
            allowSearch={false}
            onSelect={(list) => setFilterValue((list[0] as string)?.toLowerCase())}
            label={t(path('Filter'))}
            showError={false}
          />
        )}
      </Section>
      <div className="im-training-content">{dataRenderer}</div>
    </div>
  );
}
