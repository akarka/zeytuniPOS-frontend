import MasterButton from './MasterButton';

export default function ItemButton({ urun, onClick, children, ...rest }) {
  return (
    <MasterButton
      onClick={onClick}
      color="success"
      size="xl"
      {...rest}
    >
      {children}
    </MasterButton>
  );
}
