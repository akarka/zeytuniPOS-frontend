import ItemButton from '../../components/buttons/ItemButton';

function UrunListeModule({ urunler, onUrunTikla }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {urunler.map((urun) => (
        <ItemButton
          key={urun.urunId}
          urun={urun}
          onClick={() => onUrunTikla(urun)}
        />
      ))}
    </div>
  );
}

export default UrunListeModule;
