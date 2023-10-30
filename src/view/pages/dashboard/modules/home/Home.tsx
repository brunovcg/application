import StyledHome from './Home.styled';
import InternalUserHome from './components/internal-user-home/InternalUserHome';
import useHomePermissions from './Home.permissions';
import ScalingSystem from '../../../scaling-system/ScalingSystem';

export default function Home() {
  const permit = useHomePermissions();

  const renderer = () => {
    let component;

    if (permit.signatureSolution) {
      component = <ScalingSystem />;
    } else {
      component = <InternalUserHome />;
    }

    return <StyledHome className="im-home">{component}</StyledHome>;
  };

  return renderer();
}
