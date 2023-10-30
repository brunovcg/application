import { ClassNameHelper } from '../../../../utils/helpers';
import Title from '../title/Title';
import StyledSection from './Section.styled';
import { SectionProps } from './Section.types';

export default function Section({
  sectionTitle,
  children,
  className,
  icon,
  contentClassName,
  height,
  width,
  maxHeight,
  minHeight,
  maxWidth,
  description,
}: SectionProps) {
  const sectionClasses = ClassNameHelper.conditional({
    ['im-section']: true,
    [`${className}`]: !!className,
  });

  const contentClasses = ClassNameHelper.conditional({
    ['im-section-content']: true,
    [`${contentClassName}`]: !!contentClassName,
  });

  return (
    <StyledSection
      className={sectionClasses}
      height={height}
      width={width}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      sectionTitle={sectionTitle}
    >
      {sectionTitle && (
        <div className="im-section-header">
          <Title className="im-section-title" text={sectionTitle} icon={icon} variant="medium" marginBottom="0" />
          {description}
        </div>
      )}
      <div className={contentClasses}>{children}</div>
    </StyledSection>
  );
}
