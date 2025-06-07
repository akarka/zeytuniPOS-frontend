import MasterButton from './MasterButton';

export default function KaydetButton({
  onClick,
  children = 'Kaydet',
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
