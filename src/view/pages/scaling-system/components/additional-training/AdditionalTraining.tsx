import { useTranslation } from 'react-i18next';

import { useTabs, useTranslationPath } from '../../../../../utils/hooks';
import Training from './modules/training/Training';
import TrainingSessions from './modules/training-sessions/TrainingSessions';
import { squidexQueries } from '../../../../../apis/queries';

import StyledAdditionalTraining from './AdditionalTraining.styled';

const { useListTrainingsQuery } = squidexQueries;

export default function AdditionalTraining() {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.ScalingSystem.AdditionalTraining');

  const { trainings, trainingsIsLoading } = useListTrainingsQuery();

  const tabsModules = [
    {
      name: t(path('Training')),
      component: <Training trainings={trainings} trainingsIsLoading={trainingsIsLoading} />,
    },
    { name: t(path('TrainingSessions')), component: <TrainingSessions /> },
  ];

  const { tabsRenderer, tabContainerRenderer } = useTabs({ modules: tabsModules, tabsClassName: 'im-additional-training-content' });

  return (
    <StyledAdditionalTraining className="im-additional-training">
      {tabsRenderer}
      {tabContainerRenderer}
    </StyledAdditionalTraining>
  );
}
