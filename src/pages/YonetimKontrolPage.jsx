import PanelComponent from '../components/PanelComponent';
import adminPanelConfig from '../panels/cfg/adminPanelConfig';
import ContentContainer from '../components/ContentContainer';

function YonetimKontrolPage() {
  return (
    <ContentContainer>
      <PanelComponent
        panelConfig={adminPanelConfig}
        baslik="Genel Yönetim Paneli"
      />
    </ContentContainer>
  );
}

export default YonetimKontrolPage;
