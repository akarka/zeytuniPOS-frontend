import MasterButton from './MasterButton';

export default function EkleButton({ onClick, children = 'Ekle', ...rest }) {
  return (
    <MasterButton
      onClick={onClick}
      color="success"
      {...rest}
    >
      {children}
    </MasterButton>
  );
}
