import PanelComponent from "../components/PanelComponent";
import adminPanelConfig from "../panels/cfg/adminPanelConfig";
import ContentContainer from "../components/ContentContainer";
import { Link } from "react-router-dom";

function YonetimKontrolPage() {
  return (
    <ContentContainer>
      <PanelComponent
        panelConfig={adminPanelConfig}
        baslik="Yönetim Kontrol Paneli"
      />
    </ContentContainer>
  );
}

export default YonetimKontrolPage;
