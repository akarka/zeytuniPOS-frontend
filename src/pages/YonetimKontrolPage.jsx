import PanelComponent from "../components/PanelComponent";
import adminPanelConfig from "../panels/cfg/adminPanelConfig";
import ContentContainer from "../components/ContentContainer";
import { Link } from "react-router-dom";

function YonetimKontrolPage() {
  return (
    <ContentContainer>
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          ← Ana Sayfa
        </Link>
      </div>

      <PanelComponent
        panelConfig={adminPanelConfig}
        baslik="Yönetim Kontrol Paneli"
      />
    </ContentContainer>
  );
}

export default YonetimKontrolPage;
