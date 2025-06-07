import { useState } from 'react';

function PanelComponent({ panelConfig, baslik = 'Panel' }) {
  const [aktifKey, setAktifKey] = useState(panelConfig[0].key);
  const aktifPanel = panelConfig.find((p) => p.key === aktifKey);

  return (
    <div className="flex flex-col gap-6">
      {/* Başlık ve buton grubu */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">{baslik}</h2>
        <div className="flex flex-wrap gap-2">
          {panelConfig.map((panel) => (
            <button
              key={panel.key}
              onClick={() => setAktifKey(panel.key)}
              className={`px-4 py-2 rounded border text-sm font-medium
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
      <div className="border border-gray-300 rounded p-6 bg-white max-h-[60vh] overflow-y-auto shadow-sm">
        {aktifPanel?.component}
      </div>
    </div>
  );
}

export default PanelComponent;
