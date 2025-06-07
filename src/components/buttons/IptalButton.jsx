import MasterButton from './MasterButton';

export default function IptalButton({ onClick, children = 'İptal', ...rest }) {
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
