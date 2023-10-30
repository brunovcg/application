import StyledBreadCrumbs from './BreadCrumbs.styled';
import { BreadCrumbModule, BreadCrumbsProps } from './BreadCrumbs.types';
import { Container, Icon } from '../..';
import { ReactNode } from 'react';
import useNavigation from '../../../../utils/hooks/modules/use-navigation/useNavigation';

export default function BreadCrumbs({ modules, width }: BreadCrumbsProps) {
  const { navigate } = useNavigation();

  const handleClick = (item: BreadCrumbModule) => () => {
    if (item.navigateArgs) return navigate(item.navigateArgs);

    return item.handler();
  };

  const renderer = modules.reduce((acc, item, index) => {
    const itemComponent = () => (
      <button key={`item-${item.text}`} className="im-bread-crumb-item" onClick={handleClick(item)}>
        {item.text}
      </button>
    );
    const separatorComponent = <Icon icon="arrowForward" size="small" weight="fill" key={`separator-${item.text}`} variant={'light'} />;

    if (index < modules.length - 1) {
      return acc?.concat([itemComponent(), separatorComponent]);
    }
    return acc.concat(itemComponent());
  }, [] as ReactNode[]);

  return (
    <StyledBreadCrumbs className="im-bread-crumbs" width={width}>
      <Container className="im-bread-crumbs-content">{renderer}</Container>
    </StyledBreadCrumbs>
  );
}
