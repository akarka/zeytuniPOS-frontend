import { useNavigate } from 'react-router-dom';
import MasterButton from './MasterButton';
import HomeIcon from '../../assets/HomeIcon';

export default function AnasayfaButton({
  children = <HomeIcon />,
  className = '',
  ...rest
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <MasterButton
      onClick={handleClick}
      color="outline"
      className={className}
      size="ci"
      {...rest}
    >
      {children}
    </MasterButton>
  );
}
