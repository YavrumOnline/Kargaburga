import type { CourseSlide } from './types';

export const rhinoVrayCourse: CourseSlide = {
  title: ['Robert McNeel® Rhino®', 'Chaos® V-Ray®'],
  body: 'NURBS tabanlı 3D modelleme ile karmaşık organik ve parametrik formları tasarlamayı öğretir. Grasshopper ile uyumlu esnek tasarım süreçlerine odaklanır.',
  duration: '72 Saat',
  price: {
    online: '₺37.440',
    örgün: '₺46.800'
  },
  curriculum: {
    title: 'McNeel Rhinoceros® 3D + Chaos® V-Ray®',
    level: 'Seviye: Beginner',
    focus: 'Odak: NURBS Modelleme – Mimarlık & Endüstriyel Tasarım – Fotogerçekçi Render',
    weeks: [
      {
        title: 'Hafta 1 – Rhino ve NURBS\'e Giriş',
        lessons: [
          {
            title: 'Ders 1 – Rhino Arayüzü ve NURBS Mantığı',
            topics: [
              'Mesh – NURBS – SubD farkları',
              'Arayüz ve viewport kullanımı',
              'Birimler ve tolerans',
              'Navigasyon ve seçim'
            ]
          },
          {
            title: 'Ders 2 – Temel Çizim Araçları',
            topics: [
              'Line, Polyline, Arc, Circle',
              'Osnap ve koordinat sistemi',
              'Uygulama: 2D eskiz üretimi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 2 – Eğriler ve Düzenleme',
        lessons: [
          {
            title: 'Ders 3 – NURBS Eğrileri',
            topics: [
              'Control point mantığı',
              'Degree ve süreklilik',
              'Uygulama: Profil eğrileri'
            ]
          },
          {
            title: 'Ders 4 – Eğri Temizleme ve Düzenleme',
            topics: [
              'Rebuild, Fair, Simplify',
              'Fillet, Blend Curve',
              'Uygulama: Temiz eğri seti'
            ]
          }
        ]
      },
      {
        title: 'Hafta 3 – Yüzey Modelleme',
        lessons: [
          {
            title: 'Ders 5 – Temel Surface Komutları',
            topics: [
              'Extrude, Revolve, Loft',
              'Sweep1, Sweep2',
              'Uygulama: Basit yüzey formları'
            ]
          },
          {
            title: 'Ders 6 – Yüzey Düzenleme',
            topics: [
              'MatchSrf, Trim, Split',
              'G0 – G1 – G2 süreklilik',
              'Uygulama: Pürüzsüz geçişler'
            ]
          }
        ]
      },
      {
        title: 'Hafta 4 – Solid Modelleme',
        lessons: [
          {
            title: 'Ders 7 – Kapalı Hacim ve Boolean',
            topics: [
              'Polysurface mantığı',
              'Union, Difference, Intersection',
              'Uygulama: Ürün gövdesi'
            ]
          },
          {
            title: 'Ders 8 – Solid Detaylandırma',
            topics: [
              'FilletEdge, ChamferEdge',
              'Shell, OffsetSrf',
              'Uygulama: Üretime uygun model'
            ]
          }
        ]
      },
      {
        title: 'Hafta 5 – Mimari Modelleme',
        lessons: [
          {
            title: 'Ders 9 – Mimari Kütle ve Mekân',
            topics: [
              'Duvar, döşeme, açıklık',
              'Layer organizasyonu',
              'Uygulama: Basit yapı modeli'
            ]
          },
          {
            title: 'Ders 10 – Cephe ve Serbest Form',
            topics: [
              'Eğrisel cephe üretimi',
              'Panelleme mantığı',
              'Uygulama: Serbest cephe tasarımı'
            ]
          }
        ]
      },
      {
        title: 'Hafta 6 – Endüstriyel Tasarım',
        lessons: [
          {
            title: 'Ders 11 – Ürün Formu Modelleme',
            topics: [
              'Referansla çalışma',
              'Simetri ve ölçü kontrolü',
              'Uygulama: Şişe / lamba / mouse'
            ]
          },
          {
            title: 'Ders 12 – Yüzey Kalitesi ve Analiz',
            topics: [
              'Zebra ve curvature analizi',
              'Blend surface',
              'Uygulama: Yüksek kaliteli yüzey'
            ]
          }
        ]
      },
      {
        title: 'Hafta 7 – SubD ve Hibrit Modelleme',
        lessons: [
          {
            title: 'Ders 13 – SubD Sistemine Giriş',
            topics: [
              'Organik form üretimi',
              'Edge ve face düzenleme'
            ]
          },
          {
            title: 'Ders 14 – SubD → NURBS Dönüşümü',
            topics: [
              'Hibrit modelleme teknikleri',
              'Uygulama: Organik ürün modeli'
            ]
          }
        ]
      },
      {
        title: 'Hafta 8 – Grasshopper\'a Giriş (Temel)',
        lessons: [
          {
            title: 'Ders 15 – Parametrik Mantık',
            topics: [
              'Grasshopper arayüzü',
              'Basit parametrik eğriler'
            ]
          },
          {
            title: 'Ders 16 – Parametrik Cephe Örneği',
            topics: [
              'Grid ve panel üretimi',
              'Uygulama: Parametrik desen'
            ]
          }
        ]
      },
      {
        title: 'Hafta 9 – Üretime Hazırlık',
        lessons: [
          {
            title: 'Ders 17 – Ölçüm ve Kontrol',
            topics: [
              'Distance, Area, Deviation',
              'Tolerans ayarları'
            ]
          },
          {
            title: 'Ders 18 – Dosya ve Export',
            topics: [
              'STL, STEP, IGES',
              'CNC ve 3D baskı uyumu'
            ]
          }
        ]
      },
      {
        title: 'Hafta 10 – Görselleştirme Ön Hazırlık',
        lessons: [
          {
            title: 'Ders 19 – Malzeme ve Görünüm Ayarları',
            topics: [
              'Rhino materyalleri',
              'Display mode ve stiller'
            ]
          },
          {
            title: 'Ders 20 – Kamera ve Sahne Kurulumu',
            topics: [
              'Kamera açıları',
              'Kompozisyon prensipleri'
            ]
          }
        ]
      },
      {
        title: 'Hafta 11 – V-RAY\'E GİRİŞ (1. ve 2. DERS)',
        lessons: [
          {
            title: 'Ders 21 – V-Ray for Rhino Arayüzü ve Ayarlar',
            topics: [
              'Asset Editor kullanımı',
              'Render kalite parametreleri',
              'Frame Buffer ve tonlama'
            ]
          },
          {
            title: 'Ders 22 – V-Ray Malzemeleri',
            topics: [
              'V-Ray Material yapısı',
              'Cam, metal, plastik ayarları',
              'Texture ve kaplama yönetimi',
              'Uygulama: Profesyonel malzeme seti'
            ]
          }
        ]
      },
      {
        title: 'Hafta 12 – V-RAY IŞIK VE FİNAL RENDER',
        lessons: [
          {
            title: 'Ders 23 – V-Ray Işık ve HDRI',
            topics: [
              'Dome Light, Rect Light',
              'Fiziksel ışık yerleşimi',
              'Kamera ve pozlama',
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