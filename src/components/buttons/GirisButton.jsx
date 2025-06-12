import MasterButton from './MasterButton';

export default function GirisButton({
  onClick,
  children = 'Giriş Yap',
  ...rest
}) {
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
