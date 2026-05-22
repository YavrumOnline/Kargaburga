import type { CourseSlide } from './types';

export const maxVrayCourse: CourseSlide = {
  title: ['Autodesk® 3ds Max®', 'Chaos® V-Ray®'],
  body: '3D modelleme, animasyon ve sahne oluşturma süreçlerini kapsar. Mimari görselleştirme ve ürün sunumu için profesyonel çalışma yöntemlerini öğretir.',
  duration: '72 Saat',
  price: {
    online: '₺37.440',
    örgün: '₺46.800'
  },
  curriculum: {
    title: 'Autodesk® 3ds Max® + Chaos® V-Ray®',
    level: 'Seviye: Beginner',
    focus: 'Odak: 3D Modelleme – Mimari & Ürün Görselleştirme – Fotogerçekçi Render',
    weeks: [
      {
        title: 'Hafta 1 – 3D\'ye Giriş ve Arayüz',
        lessons: [
          {
            title: 'Ders 1 – 3D Grafik ve 3ds Max Arayüzü',
            topics: [
              '3D grafik nedir, kullanım alanları',
              '3ds Max arayüz tanıtımı',
              'Viewport türleri ve navigasyon',
              'Sahne ayarları ve dosya yönetimi',
              'Move, Rotate, Scale araçları'
            ]
          },
          {
            title: 'Ders 2 – Temel Nesneler ve Primitifler',
            topics: [
              'Standard ve Extended Primitives',
              'Nesne oluşturma ve düzenleme',
              'Pivot, Align, Snap',
              'Uygulama: Basit sahne kurulumu'
            ]
          }
        ]
      },
      {
        title: 'Hafta 2 – Editable Poly ve Modifier Mantığı',
        lessons: [
          {
            title: 'Ders 3 – Editable Poly Temelleri',
            topics: [
              'Vertex, Edge, Polygon, Element',
              'Extrude, Inset, Bevel',
              'Uygulama: Basit mobilya modeli'
            ]
          },
          {
            title: 'Ders 4 – Modifier Stack ve Şekil Verme',
            topics: [
              'Bend, Taper, FFD, Symmetry',
              'TurboSmooth',
              'Uygulama: Sert yüzey modelleme'
            ]
          }
        ]
      },
      {
        title: 'Hafta 3 – Spline ve Referans Modelleme',
        lessons: [
          {
            title: 'Ders 5 – Spline Tabanlı Modelleme',
            topics: [
              'Line, Editable Spline',
              'Extrude, Lathe, Sweep',
              'Uygulama: Profil bazlı obje'
            ]
          },
          {
            title: 'Ders 6 – Referans ile Modelleme',
            topics: [
              'Görsel ve plan yerleştirme',
              'Ölçek ve oran kontrolü',
              'Uygulama: Basit ürün modeli'
            ]
          }
        ]
      },
      {
        title: 'Hafta 4 – Mimari Modelleme',
        lessons: [
          {
            title: 'Ders 7 – Mimari Kütle Modelleme',
            topics: [
              'Duvar, zemin, tavan mantığı',
              'Boolean ve ProBoolean',
              'Uygulama: Tek hacimli oda'
            ]
          },
          {
            title: 'Ders 8 – İç Mekân Modelleme',
            topics: [
              'Kapı ve pencere boşlukları',
              'Mobilya yerleşimi',
              'Uygulama: İç mekân sahnesi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 5 – Malzeme ve Kaplama',
        lessons: [
          {
            title: 'Ders 9 – Material Editor Temelleri',
            topics: [
              'Compact ve Slate Editor',
              'Diffuse, Reflection, Glossiness',
              'Bitmap kullanımı',
              'Uygulama: Ahşap, metal, cam'
            ]
          },
          {
            title: 'Ders 10 – UV Mapping ve Kaplama',
            topics: [
              'UVW Map',
              'Unwrap UVW temelleri',
              'Uygulama: Karmaşık obje kaplama'
            ]
          }
        ]
      },
      {
        title: 'Hafta 6 – Işık ve Kamera Temelleri',
        lessons: [
          {
            title: 'Ders 11 – Standart ve Fiziksel Işıklar',
            topics: [
              'Omni, Spot, Directional',
              'Photometric ışıklar',
              'Uygulama: İç mekân ışık kurulumu'
            ]
          },
          {
            title: 'Ders 12 – Kamera ve Gün Işığı Sistemi',
            topics: [
              'Physical Camera',
              'Daylight System',
              'Pozlama ve kadraj',
              'Uygulama: Gün ışıklı sahne'
            ]
          }
        ]
      },
      {
        title: 'Hafta 7 – Sahne Organizasyonu ve Detaylandırma',
        lessons: [
          {
            title: 'Ders 13 – Sahne Yönetimi',
            topics: [
              'Layer Explorer',
              'Grup ve isimlendirme',
              'Proxy mantığı',
              'Uygulama: Düzenli sahne'
            ]
          },
          {
            title: 'Ders 14 – Hazır Modeller ve Detaylandırma',
            topics: [
              'Model kütüphaneleri',
              'Bitki ve aksesuar yerleştirme',
              'Uygulama: Sahne zenginleştirme'
            ]
          }
        ]
      },
      {
        title: 'Hafta 8 – Dış Mekân ve Mimari Sahne',
        lessons: [
          {
            title: 'Ders 15 – Dış Cephe Modelleme',
            topics: [
              'Bina kütlesi',
              'Cephe açıklıkları',
              'Uygulama: Basit bina modeli'
            ]
          },
          {
            title: 'Ders 16 – Dış Mekân Işık ve Kompozisyon',
            topics: [
              'Güneş – gökyüzü sistemi',
              'HDRI kullanımı',
              'Uygulama: Dış cephe sahnesi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 9 – Animasyona Giriş',
        lessons: [
          {
            title: 'Ders 17 – Animasyon Temelleri',
            topics: [
              'Timeline ve Keyframe',
              'Auto Key, Set Key',
              'Uygulama: Nesne animasyonu'
            ]
          },
          {
            title: 'Ders 18 – Kamera Animasyonu',
            topics: [
              'Walkthrough animasyonu',
              'Path Constraint',
              'Uygulama: İç mekân kamera turu'
            ]
          }
        ]
      },
      {
        title: 'Hafta 10 – Render ve Sunum Ön Hazırlık',
        lessons: [
          {
            title: 'Ders 19 – Render Mantığı ve Çıktılar',
            topics: [
              'Render ayarları',
              'Render Elements mantığı',
              'Uygulama: Katmanlı render alma'
            ]
          },
          {
            title: 'Ders 20 – Post-Production Temelleri',
            topics: [
              'Photoshop ile renk ve kontrast',
              'Atmosfer ve maskeleme',
              'Uygulama: Görsel iyileştirme'
            ]
          }
        ]
      },
      {
        title: 'Hafta 11 – V-RAY\'E GİRİŞ (1. ve 2. DERS)',
        lessons: [
          {
            title: 'Ders 21 – V-Ray Arayüzü ve Temel Ayarlar',
            topics: [
              'V-Ray motor seçimi',
              'Render Setup ve kalite parametreleri',
              'V-Ray Frame Buffer',
              'Fiziksel doğruluk prensipleri'
            ]
          },
          {
            title: 'Ders 22 – V-Ray Malzemeleri',
            topics: [
              'V-Ray Material yapısı',
              'Reflection, Refraction, IOR',
              'Cam, metal, plastik ayarları',
              'Uygulama: Profesyonel malzeme seti'
            ]
          }
        ]
      },
      {
        title: 'Hafta 12 – V-RAY IŞIK, KAMERA VE FİNAL RENDER',
        lessons: [
          {
            title: 'Ders 23 – V-Ray Işık ve Kamera',
            topics: [
              'V-Ray Light türleri',
              'Dome Light ve HDRI',
              'Physical Camera ve pozlama',
              'Uygulama: İç / dış mekân ışık kurulumu'
            ]
          },
          {
            title: 'Ders 24 – Final Projesi: V-Ray ile Fotogerçekçi Render',
            topics: [
              'Sahne optimizasyonu',
              'Noise azaltma ve kalite artırma',
              'Final render alma',
              'Sunum ve değerlendirme'
            ]
          }
        ]
      }
    ]
  }
};