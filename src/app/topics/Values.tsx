import { SlideContainer } from '@/app/components/SlideContainer';
import { getHeadingStyle, getBodyTextStyle } from '@/constants/styles';

export function Values({ darkMode }: { darkMode?: boolean }) {
  const slides = [
    {
      title: 'İşin Uzmanından, İşin Kendisi',
      content: 'Kargaburga eğitimleri, sadece teorik müfredat aktaran anlatıcılar tarafından değil; öğrettikleri program ve teknikleri her gün iş hayatında bizzat uygulayan başarılı uzmanlar tarafından verilir.'
    },
    {
      title: 'Esnek Lokasyonlar',
      content: 'Fiziksel sınıf ihtiyacına ve kursiyer yoğunluğuna göre diğer şubelerimizi devreye alıyor, nitelikli eğitimi size en kolay ulaşılabilir şubemizde sağlıyoruz.'
    },
    {
      title: 'Gerçek Yetkinlik',
      content: 'Sertifikamızın sektördeki saygınlığı sadece uygulama becerisi kazanan kursiyerlere verilmesinden gelir. Kargaburga sertifikası bir katılım belgesi değil; bir yetkinlik kanıtıdır.'
    },
    {
      title: 'Dürüst İletişim',
      content: 'Tüm fiyat politikamız ve eğitim ayrıntılarımız sayfamızda açıkça yer alır. Süreç sonunda karşınıza çıkan ek ödemeler veya ısrarcı satış baskılarıyla karşılaşmazsınız. Kargaburga işleyişi her zaman açık ve işin gereğine uygundur.'
    },
    {
      title: 'Fiyat Güvencesi',
      content: 'Etik dışı pazarlama tekniklerini kullanmıyor; yıl sonuna kadar sabit fiyat sözü veriyoruz. Sizi acele ettirmek yerine, en doğru zamanda başlamanız için ihtiyacınız olan güvenilir fiyat istikrarını sağlıyoruz.'
    },
    {
      title: 'Öğrenme Garantisi',
      content: 'Eğitim disiplinine bağlı kalan kursiyerlerimizin yanındayız. %90 katılım sağlayan ve ilk üç hafta eğitimini aksatmayan tüm kursiyerlerimize, bir sonraki dönemde aynı eğitime ücretsiz tekrar katılma hakkı tanıyoruz.'
    },
  ];

  // Text color - black for light mode, white for dark mode
  const textColor = darkMode ? '#FFFFFF' : '#000000';

  return (
    <>
      {slides.map((slide, index) => (
        <SlideContainer key={index}>
          <div style={{ maxWidth: '42rem', width: '100%' }}>
            <h2 style={getHeadingStyle(textColor)}>
              {slide.title}
            </h2>
            <p style={getBodyTextStyle(textColor)}>
              {slide.content}
            </p>
          </div>
        </SlideContainer>
      ))}
    </>
  );
}