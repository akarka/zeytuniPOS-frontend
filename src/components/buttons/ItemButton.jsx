import MasterButton from './MasterButton';

export default function ItemButton({ urun, onClick, ...rest }) {
  const handleClick = () => {
    onClick?.(urun);
  };

  return (
    <MasterButton
      onClick={handleClick}
      color="success"
      size="xl"
      {...rest}
    >
      {urun.urunAdi}
    </MasterButton>
  );
}
