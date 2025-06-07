import MasterButton from './MasterButton';

export default function DuzenleButton({
  onClick,
  children = 'Düzenle',
  ...rest
}) {
  return (
    <MasterButton
      onClick={onClick}
      color="yellow"
      {...rest}
    >
      {children}
    </MasterButton>
  );
}
