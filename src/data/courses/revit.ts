import type { CourseSlide } from './types';

export const revitCourse: CourseSlide = {
  title: ['Autodesk® Revit®'],
  body: 'BIM tabanlı bina tasarımı yaklaşımıyla mimari, yapısal ve MEP sistemlerinin birlikte çalışmasını öğretir. Proje koordinasyonu ve veri odaklı tasarım süreçlerine odaklanır.',
  duration: '72 Saat',
  price: {
    online: '₺37.440',
    örgün: '₺46.800'
  },
  curriculum: {
    title: 'Autodesk® Revit®',
    level: 'Seviye: Beginner',
    weeks: [
      {
        title: 'Hafta 1 – BIM ve Revit\'e Giriş',
        lessons: [
          {
            title: 'Ders 1 – BIM Kavramı ve Revit Arayüzü',
            topics: [
              'BIM nedir, CAD\'den farkları',
              'Revit kullanım alanları (Architecture, Structure, MEP)',
              'Arayüz tanıtımı (Ribbon, Properties, Project Browser)',
              'Proje oluşturma, şablonlar',
              'View kontrolü (Zoom, Pan, SteeringWheels)'
            ]
          },
          {
            title: 'Ders 2 – Temel Ayarlar ve Proje Organizasyonu',
            topics: [
              'Proje birimleri (Units)',
              'Level ve Grid oluşturma',
              'Görünüm türleri (Plan, Elevation, 3D)',
              'View Scale ve Detail Level',
              'Uygulama: Basit kat sistemi oluşturma'
            ]
          }
        ]
      },
      {
        title: 'Hafta 2 – Temel Mimari Elemanlar',
        lessons: [
          {
            title: 'Ders 3 – Duvarlar ve Yapı Elemanları',
            topics: [
              'Wall türleri ve özellikleri',
              'Duvar çizme ve düzenleme',
              'Alignment, Join, Edit Profile',
              'Uygulama: Basit kat planı çizimi'
            ]
          },
          {
            title: 'Ders 4 – Kapı, Pencere ve Bileşenler',
            topics: [
              'Load Family mantığı',
              'Kapı ve pencere yerleştirme',
              'Type / Instance parametreleri',
              'Uygulama: Açıklık yerleşimleri'
            ]
          }
        ]
      },
      {
        title: 'Hafta 3 – Döşeme, Tavan ve Çatı Sistemleri',
        lessons: [
          {
            title: 'Ders 5 – Döşemeler (Floors)',
            topics: [
              'Döşeme oluşturma yöntemleri',
              'Yapı katmanları (Structure, Finish)',
              'Açıklıklar (Shaft, Opening)',
              'Uygulama: Çok odalı kat döşemesi'
            ]
          },
          {
            title: 'Ders 6 – Tavan ve Çatı (Ceiling & Roof)',
            topics: [
              'Ceiling türleri',
              'Roof by Footprint / Extrusion',
              'Eğim ve saçak ayarları',
              'Uygulama: Çatılı basit yapı'
            ]
          }
        ]
      },
      {
        title: 'Hafta 4 – Merdiven, Rampa ve Korkuluk',
        lessons: [
          {
            title: 'Ders 7 – Merdiven ve Rampa',
            topics: [
              'Stair by Component / Sketch',
              'Rampa oluşturma',
              'Parametre ayarları',
              'Uygulama: Katlar arası bağlantı'
            ]
          },
          {
            title: 'Ders 8 – Korkuluk ve Bileşik Elemanlar',
            topics: [
              'Railing sistemleri',
              'Profil ve baluster ayarları',
              'Uygulama: Merdiven korkuluğu'
            ]
          }
        ]
      },
      {
        title: 'Hafta 5 – Görünüm Yönetimi ve Detay Seviyesi',
        lessons: [
          {
            title: 'Ders 9 – Görünüm Kontrolü ve Şablonlar',
            topics: [
              'View Template mantığı',
              'Görünüm filtreleri',
              'Görünüm isimlendirme',
              'Uygulama: Proje görünüm standardı'
            ]
          },
          {
            title: 'Ders 10 – Kesit, Cephe ve 3D Görünümler',
            topics: [
              'Section ve Elevation oluşturma',
              '3D View ve Camera',
              'Görünüm kırpma (Crop Region)',
              'Uygulama: Kesit ve cephe üretimi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 6 – Aileler (Families) ve Parametre Mantığı',
        lessons: [
          {
            title: 'Ders 11 – Family Türleri ve Kullanımı',
            topics: [
              'System / Loadable / In-Place Families',
              'Aile düzenleme temelleri',
              'Parametre kavramı',
              'Uygulama: Basit mobilya ailesi'
            ]
          },
          {
            title: 'Ders 12 – Parametrik Nesneler',
            topics: [
              'Type ve Instance parametreleri',
              'Ölçü bağlama (Dimension + Label)',
              'Uygulama: Ölçüsü değişebilen kapı / dolap'
            ]
          }
        ]
      },
      {
        title: 'Hafta 7 – Malzemeler, Görselleştirme ve Sunum',
        lessons: [
          {
            title: 'Ders 13 – Malzeme Yönetimi',
            topics: [
              'Material Browser',
              'Kaplama, kesit ve render ayarları',
              'Uygulama: Duvar ve döşeme kaplamaları'
            ]
          },
          {
            title: 'Ders 14 – Görselleştirme ve Render',
            topics: [
              'Görünüm stilleri (Shaded, Realistic)',
              'Işık ve kamera ayarları',
              'Revit içi render',
              'Uygulama: Basit iç mekân görseli'
            ]
          }
        ]
      },
      {
        title: 'Hafta 8 – Metraj, Listeler ve BIM Verisi',
        lessons: [
          {
            title: 'Ders 15 – Schedules (Metraj Tabloları)',
            topics: [
              'Schedule mantığı',
              'Alan, kapı, pencere metrajı',
              'Filtreleme ve sıralama',
              'Uygulama: Oda ve kapı listesi'
            ]
          },
          {
            title: 'Ders 16 – Alan ve Mekân Yönetimi',
            topics: [
              'Room ve Area oluşturma',
              'Oda etiketleri',
              'Alan hesapları',
              'Uygulama: Net / brüt alan çıkarma'
            ]
          }
        ]
      },
      {
        title: 'Hafta 9 – Yapısal Sistemlere Giriş',
        lessons: [
          {
            title: 'Ders 17 – Yapısal Grid ve Kolonlar',
            topics: [
              'Structural Template farkı',
              'Kolon yerleştirme',
              'Kiriş ve döşeme ilişkisi',
              'Uygulama: Basit taşıyıcı sistem'
            ]
          },
          {
            title: 'Ders 18 – Kiriş, Temel ve Döşeme',
            topics: [
              'Beam ve Beam System',
              'Temel türleri',
              'Yapısal görünüm ayarları',
              'Uygulama: Taşıyıcı kat modeli'
            ]
          }
        ]
      },
      {
        title: 'Hafta 10 – MEP Sistemlerine Giriş',
        lessons: [
          {
            title: 'Ders 19 – MEP Kavramı ve Tesisat Elemanları',
            topics: [
              'MEP disiplinleri (HVAC, Plumbing, Electrical)',
              'Mekanik ekipmanlar',
              'Aygıt yerleştirme',
              'Uygulama: Basit sıhhi tesisat yerleşimi'
            ]
          },
          {
            title: 'Ders 20 – Kanal, Boru ve Bağlantılar',
            topics: [
              'Duct ve Pipe sistemleri',
              'Bağlantı noktaları (Connectors)',
              'Sistem türleri',
              'Uygulama: Basit tesisat hattı'
            ]
          }
        ]
      },
      {
        title: 'Hafta 11 – Koordinasyon ve Çakışma Kontrolü',
        lessons: [
          {
            title: 'Ders 21 – Disiplinler Arası Koordinasyon',
            topics: [
              'Link Revit / CAD',
              'Koordinat sistemleri',
              'Worksets mantığı',
              'Uygulama: Mimari + yapı modeli bağlama'
            ]
          },
          {
            title: 'Ders 22 – Clash Detection ve Kontrol',
            topics: [
              'Interference Check',
              'Görünüm filtreleriyle çakışma tespiti',
              'BIM koordinasyon prensipleri',
              'Uygulama: Tesisat – taşıyıcı çakışması çözümü'
            ]
          }
        ]
      },
      {
        title: 'Hafta 12 – Pafta, Çıktı ve Final Projesi',
        lessons: [
          {
            title: 'Ders 23 – Pafta Hazırlama ve Baskı',
            topics: [
              'Sheet oluşturma',
              'Görünüm yerleştirme',
              'Ölçek ve başlık blokları',
              'PDF / DWG çıktı alma'
            ]
          },
          {
            title: 'Ders 24 – Final Projesi ve Değerlendirme',
            topics: [
              'Küçük ölçekli bina projesi:',
              'Mimari model',
              'Temel taşıyıcı sistem',
              'Basit MEP yerleşimi',
              'Metraj + pafta teslimi',
              'Genel tekrar ve değerlendirme'
            ]
          }
        ]
      }
    ]
  }
};