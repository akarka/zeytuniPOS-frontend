import MasterButton from './MasterButton';

export default function DetayButton({ onClick, expanded = false, ...rest }) {
  return (
    <MasterButton
      onClick={onClick}
      color="dark"
      {...rest}
    >
      {expanded ? 'Gizle' : 'Detay'}
    </MasterButton>
  );
}
