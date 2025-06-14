import MasterButton from './MasterButton';

export default function LogoutButton({
  onClick,
  children = 'Çıkış Yap',
  ...rest
}) {
  return (
    <MasterButton
      onClick={onClick}
      color="outline"
      {...rest}
    >
      {children}
    </MasterButton>
  );
}
