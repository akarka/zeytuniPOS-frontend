import MasterButton from './MasterButton';

export default function SilButton({ onClick, children = 'Sil', ...rest }) {
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
