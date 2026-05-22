import { DARK_MODE, LIGHT_MODE } from '@/constants/colors';
import { SlideContainer } from '@/app/components/SlideContainer';
import { generateNeumorphicShadow, DEFAULT_NEUMORPHIC_RATIOS } from '@/app/utils/neumorphicUtils';
import { TRANSITIONS } from '@/constants/styles';
import tayfunPortrait from 'figma:asset/353f7bbc9a58d9d817acba041851e8d892982597.png';
import aybukePortrait from 'figma:asset/b17fcf59424bc06fed28c8ca6fc072e4232a7819.png';
import erkutPortrait from 'figma:asset/2a27b2f2da065602d4d833171f3af27ef8817dff.png';
import erdalPortrait from 'figma:asset/f095dff089d692b42a164aa5bdceea0da78aaed1.png';
import aliPortrait from 'figma:asset/31b0a01767073a2f31532def23b68175258757c6.png';

export function Team({ darkMode }: { darkMode?: boolean }) {
  const teamMembers = [
    {
      name: 'Tayfun Bilgi',
      bio: 'Hesaplamalı Tasarımcı, parametrik modelleme ve algoritmik tasarım süreçlerini mimari projelere entegre eder. Karmaşık geometrileri optimize ederek yenilikçi ve uygulanabilir çözümler üretir.',
      animatedImage: tayfunPortrait,
      staticImage: tayfunPortrait,
      ticker: [
        'Vakıfbank® Genel Müdürlüğü',
        'Türkiye Petrolleri® Genel Müdürlüğü',
        'Mercury Tower™',
        'Lakhta Tower™',
        'Royal Mansour® Hotels'
      ],
    },
    {
      name: 'Aybüke Karaman',
      bio: 'İç Mimar, mekansal tasarımda işlevsellik ve estetiği bir araya getirerek kullanıcı deneyimini zenginleştirir. Malzeme seçimi, renk paleti ve mekânsal düzenlemelerle özgün iç mekan konseptleri geliştirir.',
      animatedImage: aybukePortrait,
      staticImage: aybukePortrait,
      ticker: [
        'Marmara Üniversitesi Fen ve Edebiyat Fakültesi',
        'Les Benjamins® İzmir',
        'Amazon® Kağıthane Ofisi',
        'Keller Williams® Bomonti',
        'Filo D\'Olio® by Danilo Şef'
      ],
    },
    {
      name: 'Ali Kaptan',
      bio: 'Mimar, yapısal tasarımda çevresel bağlam ve kullanıcı ihtiyaçlarını dengeler. Sürdürülebilir ve yenilikçi mimari çözümler üreterek projelere bütüncül bir yaklaşım getirir.',
      animatedImage: aliPortrait,
      staticImage: aliPortrait,
      ticker: [
        'HS2™ Euston Station',
        'Battersea Power Station™',
        'Llanelli Lakes™ Wellness and Life Science Village',
        'Chalcots Estates'
      ],
    },
    {
      name: 'Erkut Sırdaş',
      bio: 'UI/UX Tasarım Şefi, kullanıcı ihtiyaçlarını merkezine alan sezgisel ve erişilebilir deneyimler tasarlar. Araştırma ve etkileşim tasarımını birleştirerek tutarlı, ölçeklenebilir dijital arayüzler geliştirir.',
      animatedImage: erkutPortrait,
      staticImage: erkutPortrait,
      ticker: [
        'React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'Tailwind', 'PostgreSQL', 'Docker',
        'AWS', 'Git', 'Vite', 'Next.js', 'GraphQL', 'Redis', 'Kubernetes'
      ],
    },
    {
      name: 'Erdal Kaytaz',
      bio: 'Hizmet Proje Amiri, proje bütçelerinin planlanması ve takibini yaparak maliyet dengesini yönetir. Paydaşlar arası koordinasyonu sağlayarak projelerin zamanında ve bütçe içinde tamamlanmasını güvence altına alır.',
      animatedImage: erdalPortrait,
      staticImage: erdalPortrait,
      ticker: [
        'React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'Tailwind', 'PostgreSQL', 'Docker',
        'AWS', 'Git', 'Vite', 'Next.js', 'GraphQL', 'Redis', 'Kubernetes'
      ],
    },
  ];

  // Portrait shadow and border settings (inherit from CaroContain container)
  const containerBaseSize = 64; // Use container's baseSize for identical shadow values
  const effectiveBackgroundColor = darkMode ? DARK_MODE.BACKGROUND : LIGHT_MODE.BACKGROUND;
  const effectiveLightColor = darkMode ? DARK_MODE.LIGHT_SHADOW : LIGHT_MODE.LIGHT_SHADOW;
  const effectiveDarkColor = darkMode ? DARK_MODE.DARK_SHADOW : LIGHT_MODE.DARK_SHADOW;
  const effectiveBorderColor = darkMode ? DARK_MODE.BORDER : LIGHT_MODE.BORDER;
  
  // Use container's baseSize=64 to get exact same pixel values as container
  const borderWidth = containerBaseSize * DEFAULT_NEUMORPHIC_RATIOS.borderWidthRatio;
  const blurAmount = containerBaseSize * DEFAULT_NEUMORPHIC_RATIOS.blurAmountRatio;
  
  // Light mode shadow
  const portraitShadowLight = generateNeumorphicShadow({
    size: containerBaseSize,
    lightColor: '#ffffff',
    darkColor: '#bcbcbc',
    outerOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOffsetRatio,
    outerBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.outerBlurRatio,
    outerSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.outerSpreadRatio,
    insetOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffOffsetRatio,
    insetBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffBlurRatio,
    insetSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffSpreadRatio,
    isDarkMode: false,
  });

  // Dark mode shadow
  const portraitShadowDark = generateNeumorphicShadow({
    size: containerBaseSize,
    lightColor: DARK_MODE.LIGHT_SHADOW,
    darkColor: DARK_MODE.DARK_SHADOW,
    outerOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.outerOffsetRatio,
    outerBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.outerBlurRatio,
    outerSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.outerSpreadRatio,
    insetOffsetRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffOffsetRatio,
    insetBlurRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffBlurRatio,
    insetSpreadRatio: DEFAULT_NEUMORPHIC_RATIOS.insetOffSpreadRatio,
    isDarkMode: true,
  });
  
  const portraitShadow = darkMode ? portraitShadowDark : portraitShadowLight;

  return (
    <>
      {teamMembers.map((member, index) => (
        <SlideContainer key={index}>
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            {/* Portrait - layered structure: blur filter only affects border/shadows, not image */}
            <div
              style={{
                width: '17vh',
                height: '17vh',
                margin: '0 auto 0.75rem',
                position: 'relative',
              }}
            >
              {/* Image layer without blur */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#d0d0d0',
                  zIndex: 1,
                }}
              >
                <img
                  src={member.animatedImage}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {/* Light mode border and shadow layer */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  boxShadow: portraitShadowLight,
                  border: `${borderWidth}px solid white`,
                  filter: `blur(${blurAmount}px)`,
                  pointerEvents: 'none',
                  zIndex: 2,
                  opacity: darkMode ? 0 : 1,
                  transition: 'opacity 0.5s ease-in-out, box-shadow 0.5s ease-in-out, border-color 0.5s ease-in-out',
                }}
              />
              {/* Dark mode border and shadow layer */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  boxShadow: portraitShadowDark,
                  border: `${borderWidth}px solid ${effectiveBorderColor}`,
                  filter: `blur(${blurAmount}px)`,
                  pointerEvents: 'none',
                  zIndex: 2,
                  opacity: darkMode ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out, box-shadow 0.5s ease-in-out, border-color 0.5s ease-in-out',
                }}
              />
            </div>

            {/* Name */}
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 500,
                marginBottom: '0.5rem',
                color: darkMode ? '#E0E0E0' : '#3A3A3A',
                transition: TRANSITIONS.COLOR,
              }}
            >
              {member.name}
            </h2>

            {/* Horizontal line above ticker */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: darkMode ? '#4A4A4A' : '#D0D0D0',
                marginBottom: '-0.25rem',
                transition: TRANSITIONS.COLOR,
              }}
            />

            {/* Tools ticker */}
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                marginBottom: '-0.25rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  animation: 'ticker 20s linear infinite',
                  whiteSpace: 'nowrap',
                }}
              >
                {member.ticker.concat(member.ticker).map((tool, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '12px',
                      color: darkMode ? '#9B9B9B' : '#6B6B6B',
                      fontWeight: 400,
                      transition: TRANSITIONS.COLOR,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Horizontal line below ticker */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: darkMode ? '#4A4A4A' : '#D0D0D0',
                marginBottom: '0.5rem',
                transition: TRANSITIONS.COLOR,
              }}
            />

            {/* Bio */}
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: darkMode ? '#E0E0E0' : '#3A3A3A',
                transition: TRANSITIONS.COLOR,
              }}
            >
              {(() => {
                const bioText = member.bio;
                const firstCommaIndex = bioText.indexOf(',');
                if (firstCommaIndex === -1) return bioText;
                
                const profession = bioText.substring(0, firstCommaIndex);
                const rest = bioText.substring(firstCommaIndex);
                
                return (
                  <>
                    <strong>{profession}</strong>{rest}
                  </>
                );
              })()}
            </p>
          </div>
        </SlideContainer>
      ))}
    </>
  );
}