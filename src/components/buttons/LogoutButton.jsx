import MasterButton from './MasterButton';

export default function LogoutButton({ onClick, children = 'Çıkış', ...rest }) {
  return (
    <MasterButton
      onClick={onClick}
      color="danger"
      {...rest}
    >
      {children}
    </MasterButton>
  );
}
