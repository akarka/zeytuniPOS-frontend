import { useState } from 'react';

export default function PanelComponent({ panelConfig, baslik = 'Panel' }) {
  const [aktifKey, setAktifKey] = useState(panelConfig[0].key);
  const aktifPanel = panelConfig.find((p) => p.key === aktifKey);

  const sol = aktifPanel?.solIcerik;
  const sag = aktifPanel?.sagIcerik;
  const fallback = aktifPanel?.component;

  return (
    <div className="flex flex-col gap-6">
      {/* Başlık ve buton grubu */}
      <div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {baslik}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {panelConfig.map((panel) => (
            <button
              key={panel.key}
              onClick={() => setAktifKey(panel.key)}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors
                ${
                  aktifKey === panel.key
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
            >
              {panel.title}
            </button>
          ))}
        </div>
      </div>

      {/* İçerik kutusu */}
      <div className="border border-gray-300 rounded p-4 bg-white h-[470px] overflow-y-auto shadow-sm">
        {sol || sag ? (
          <div className="flex gap-6">
            <div className="basis-1/3 border-r pr-4">
              {sol ?? (
                <p className="text-sm text-gray-500 italic">Sol panel boş</p>
              )}
            </div>
            <div className="basis-2/3 pl-4">
              {sag ?? (
                <p className="text-sm text-gray-500 italic">Sağ panel boş</p>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {fallback ?? (
              <p className="text-sm text-gray-500 italic">İçerik bulunamadı</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
