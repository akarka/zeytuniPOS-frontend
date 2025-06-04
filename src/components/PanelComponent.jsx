import { useState } from "react";

function PanelComponent({ panelConfig, baslik = "Panel" }) {
  const [aktifKey, setAktifKey] = useState(panelConfig[0].key);
  const aktifPanel = panelConfig.find((p) => p.key === aktifKey);

  return (
    <div style={{ padding: "0", margin: "0" }}>
      {/* Sticky header — body'ye göre çalışır */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#f8f8f8",
          padding: "16px 20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>{baslik}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {panelConfig.map((panel) => (
            <button
              key={panel.key}
              onClick={() => setAktifKey(panel.key)}
              style={{
                padding: "8px 12px",
                backgroundColor: aktifKey === panel.key ? "#005c7a" : "#eee",
                color: aktifKey === panel.key ? "#fff" : "#000",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {panel.title}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable içerik — sticky dışında kalır */}
      <div
        style={{
          marginTop: "20px",
          minHeight: "55vh",
          maxHeight: "55vh",
          overflowY: "auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {aktifPanel?.component}
      </div>
    </div>
  );
}

export default PanelComponent;
