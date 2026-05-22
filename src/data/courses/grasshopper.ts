import type { CourseSlide } from './types';

export const grasshopperCourse: CourseSlide = {
  title: ['Robert McNeel® Grasshopper®'],
  body: 'Rhino için görsel programlama arayüzüyle parametrik ve generatif tasarım yapmayı öğretir. Veri odaklı tasarım ve algoritma tabanlı çözümlere odaklanır.',
  duration: '72 Saat',
  price: {
    online: '₺37.440',
    örgün: '₺46.800'
  },
  curriculum: {
    title: 'McNeel Grasshopper®',
    level: 'Odak: Parametrik Tasarım – Görsel Programlama – Mimarlık & Tasarım',
    weeks: [
      {
        title: 'Hafta 1 – Parametrik Tasarıma ve Grasshopper\'a Giriş',
        lessons: [
          {
            title: 'Ders 1 – Parametrik ve Algoritmik Tasarım Mantığı',
            topics: [
              'Parametrik tasarım nedir, nerelerde kullanılır',
              'Kural tabanlı ve veri odaklı tasarım',
              'Grasshopper – Rhino ilişkisi',
              'Grasshopper arayüzü ve temel kavramlar',
              'Canvas, Component, Wire, Panel'
            ]
          },
          {
            title: 'Ders 2 – Temel Girdi / Çıktı ve Veri Türleri',
            topics: [
              'Number Slider, Boolean, Panel',
              'Point, Vector, Plane kavramları',
              'Parametre bağlama (Set One / Set Multiple)',
              'Uygulama: Basit parametrik nokta ve çizgi sistemi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 2 – Eğriler ve Temel Geometri Üretimi',
        lessons: [
          {
            title: 'Ders 3 – Parametrik Eğri Üretimi',
            topics: [
              'Line, Polyline, Arc, Circle bileşenleri',
              'Parametrik bölme (Divide Curve)',
              'Deconstruct Curve',
              'Uygulama: Bölünmüş eğrilerden desen üretimi'
            ]
          },
          {
            title: 'Ders 4 – Eğri Manipülasyonu',
            topics: [
              'Move, Rotate, Scale',
              'Graph Mapper kullanımı',
              'Attractor point mantığı',
              'Uygulama: Attractor kontrollü cephe deseni'
            ]
          }
        ]
      },
      {
        title: 'Hafta 3 – Veri Yapıları ve Liste Mantığı',
        lessons: [
          {
            title: 'Ders 5 – Listeler ve Veri Akışı',
            topics: [
              'Item, List, Tree kavramları',
              'Graft, Flatten, Simplify',
              'Data matching (Shortest, Longest, Cross Reference)',
              'Uygulama: Çoklu eğri sistemi'
            ]
          },
          {
            title: 'Ders 6 – Veri Ağaçları (Data Trees)',
            topics: [
              'Branch ve Path mantığı',
              'Explode Tree, Path Mapper',
              'Uygulama: Grid tabanlı panel sistemi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 4 – Yüzeyler ve Panelizasyon',
        lessons: [
          {
            title: 'Ders 7 – Parametrik Yüzey Üretimi',
            topics: [
              'Loft, Sweep, Boundary Surface',
              'Evaluate Surface',
              'Isotrim / SubSrf',
              'Uygulama: Bölünmüş yüzey üzerinde panel üretimi'
            ]
          },
          {
            title: 'Ders 8 – Panel Tipleri ve Hücresel Sistemler',
            topics: [
              'Kare, üçgen, altıgen panel sistemleri',
              'Voronoi diyagramına giriş',
              'Uygulama: Parametrik cephe panelizasyonu'
            ]
          }
        ]
      },
      {
        title: 'Hafta 5 – Dönüşümler ve Alan Kontrollü Tasarım',
        lessons: [
          {
            title: 'Ders 9 – İleri Dönüşüm Teknikleri',
            topics: [
              'Rotate 3D, Orient, Mirror',
              'Array ve seri üretim mantığı',
              'Uygulama: Parametrik strüktür oluşturma'
            ]
          },
          {
            title: 'Ders 10 – Attractor ve Alan Etkileri',
            topics: [
              'Mesafeye bağlı ölçek / yükseklik kontrolü',
              'Çoklu attractor kullanımı',
              'Uygulama: Alan etkili cephe / çatı sistemi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 6 – Matematik ve Fonksiyonlar',
        lessons: [
          {
            title: 'Ders 11 – Temel Matematik Bileşenleri',
            topics: [
              'Arithmetic, Domain, Range',
              'Remap Numbers',
              'Sin, Cos, Tan fonksiyonları',
              'Uygulama: Dalgalı yüzey üretimi'
            ]
          },
          {
            title: 'Ders 12 – Grafik Tabanlı Kontroller',
            topics: [
              'Graph Mapper detaylı kullanım',
              'Expression Editor',
              'Uygulama: Kontrollü organik form'
            ]
          }
        ]
      },
      {
        title: 'Hafta 7 – Mesh, Voronoi ve Organik Sistemler',
        lessons: [
          {
            title: 'Ders 13 – Mesh Mantığı ve Üretimi',
            topics: [
              'Mesh yüzeyler ve noktalar',
              'Triangulation',
              'Uygulama: Mesh tabanlı form'
            ]
          },
          {
            title: 'Ders 14 – Voronoi ve Delaunay Sistemleri',
            topics: [
              '2D / 3D Voronoi',
              'Hücresel yapılar',
              'Uygulama: Voronoi cephe / strüktür'
            ]
          }
        ]
      },
      {
        title: 'Hafta 8 – Eğri Tabanlı Sistemler ve Strüktür',
        lessons: [
          {
            title: 'Ders 15 – Grid, Network ve Kafes Sistemler',
            topics: [
              'Rectangular / Triangular grid',
              'Curve network',
              'Uygulama: Parametrik kafes strüktür'
            ]
          },
          {
            title: 'Ders 16 – Pipe, Frame ve Taşıyıcı Mantığı',
            topics: [
              'Curve üzerinden boru üretimi',
              'Kesit profilleri',
              'Uygulama: Uzay kafes benzeri sistem'
            ]
          }
        ]
      },
      {
        title: 'Hafta 9 – Analiz ve Optimizasyona Giriş',
        lessons: [
          {
            title: 'Ders 17 – Geometri Analizi',
            topics: [
              'Mesafe, eğrilik, alan analizi',
              'Gradient renk haritaları',
              'Uygulama: Cephe performans haritası'
            ]
          },
          {
            title: 'Ders 18 – Basit Optimizasyon Mantığı',
            topics: [
              'Galapagos\'a giriş',
              'Fitness fonksiyonu',
              'Uygulama: Güneş kontrollü panel optimizasyonu'
            ]
          }
        ]
      },
      {
        title: 'Hafta 10 – Üretim ve Dijital Fabrikasyon',
        lessons: [
          {
            title: 'Ders 19 – CNC ve Lazer Kesim İçin Hazırlık',
            topics: [
              '2D açınımlar',
              'Nesting mantığı',
              'DXF export'
            ]
          },
          {
            title: 'Ders 20 – 3D Baskı İçin Geometri',
            topics: [
              'Mesh temizliği',
              'STL export',
              'Kalınlık ve tolerans kontrolü'
            ]
          }
        ]
      },
      {
        title: 'Hafta 11 – Otomasyon ve Rhino Entegrasyonu',
        lessons: [
          {
            title: 'Ders 21 – Rhino ile Canlı Bağlantı',
            topics: [
              'Geometry Bake',
              'Layer ve obje isimlendirme',
              'Parametrik – statik dönüşüm'
            ]
          },
          {
            title: 'Ders 22 – Basit Script Mantığı ve Plug-in Tanıtımı',
            topics: [
              'Anemone, LunchBox, Weaverbird tanıtımı',
              'Loop ve tekrar mantığı',
              'Uygulama: Tekrarlı panel sistemi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 12 – Final Projesi',
        lessons: [
          {
            title: 'Ders 23 – Final Projesi Geliştirme',
            topics: [
              'Proje seçenekleri:',
              'Parametrik cephe sistemi',
              'Organik çatı / strüktür',
              'Panelize edilmiş serbest yüzey',
              'Algoritma kurma + görselleştirme'
            ]
          },
          {
            title: 'Ders 24 – Sunum ve Değerlendirme',
            topics: [
              'Algoritma temizliği',
              'Parametre setleri',
              'Sunum ve geri bildirim',
              'Genel tekrar ve değerlendirme'
            ]
          }
        ]
      }
    ]
  }
};