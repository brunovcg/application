import { useTranslation } from 'react-i18next';
import { useTabs, useTranslationPath } from '../../../../../utils/hooks';
import ScalingSystemSessionCard from '../scaling-system-session-card/ScalingSystemSessionCard';
import { ScalingSystemTrainingProps } from './ScalingSystemTraining.types';
import StyledScalingSystemTraining from './ScalingSystemTraining.styled';
import comingSoon from '../../../../../assets/images/coming_soon.png';
import Constants from '../../../../../utils/constants/Constants';

const { PRIMARY, ADDITIONAL } = Constants.SCALING_SYSTEM_CATEGORIES;

export default function ScalingSystemTraining({ selectedGroup }: ScalingSystemTrainingProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.ScalingSystem');

  const { tabsRenderer, tabContainerRenderer } = useTabs({
    modules: [
      {
        name: t(path('PrimaryTraining')),
        component: (
          <ScalingSystemSessionCard trainingSession={selectedGroup?.primaryTraining} group={selectedGroup.title} category={PRIMARY} />
        ),
        hide: !selectedGroup?.primaryTraining?.length,
      },
      {
        name: t(path('AdditionalTraining.Title')),
        component: (
          <ScalingSystemSessionCard trainingSession={selectedGroup?.additionalTraining} group={selectedGroup.title} category={ADDITIONAL} />
        ),
        hide: !selectedGroup?.additionalTraining?.length,
      },
    ],
  });

  const { additionalTraining, primaryTraining, sessions } = selectedGroup ?? {};

  const hasNoData = !additionalTraining?.length && !primaryTraining?.length && !sessions?.length;

  return (
    <StyledScalingSystemTraining className="im-scaling-system-training">
      {
        <div className="im-signature-solution-container">
          {!hasNoData && tabsRenderer}
          {!hasNoData && <div className="im-signature-solution-content">{tabContainerRenderer}</div>}
          {hasNoData && (
            <figure className="im-signature-solution-no-data">
              <img alt="coming-soon" src={comingSoon} />
            </figure>
          )}
        </div>
      }
    </StyledScalingSystemTraining>
  );
}
