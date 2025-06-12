import PanelComponent from '../components/PanelComponent';
import adminPanelConfig from '../panels/cfg/adminPanelConfig';
import ContentContainer from '../components/ContentContainer';

function YonetimKontrolPage() {
  return (
    <ContentContainer>
      <h2 className="text-xl font-bold mb-6 text-center">
        Genel Yönetim Paneli
      </h2>
      <PanelComponent
        panelConfig={adminPanelConfig}
        baslik=" "
      />
    </ContentContainer>
  );
}

export default YonetimKontrolPage;
