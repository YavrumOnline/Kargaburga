import type { CourseSlide } from './types';

export const autocadCourse: CourseSlide = {
  title: ['Autodesk® AutoCAD®'],
  body: 'Endüstri standardı CAD yazılımı ile 2D teknik çizim ve dokümantasyon yapmayı öğretir. Mimarlık, mühendislik ve inşaat projeleri için doğru ve tutarlı teknik dokümantasyon üretimine odaklanır.',
  duration: '48 Saat',
  price: {
    online: '₺24.960',
    örgün: '₺31.200'
  },
  curriculum: {
    title: 'Autodesk® AutoCAD®',
    weeks: [
      {
        title: 'Hafta 1 – Temel Tanışma ve Arayüz',
        lessons: [
          {
            title: 'Ders 1 – AutoCAD\'e Giriş ve Çalışma Ortamı',
            topics: [
              'CAD ve AutoCAD nedir, kullanım alanları',
              'Arayüz tanıtımı (Ribbon, Command Line, Toolbars)',
              'Dosya açma, kaydetme, şablonlar',
              'Çizim birimleri (Units), ölçü ayarları',
              'Grid, Snap, Ortho, Polar Tracking',
              'Basit çizim denemeleri'
            ]
          },
          {
            title: 'Ders 2 – Temel Çizim Komutları',
            topics: [
              'LINE, POLYLINE, CIRCLE, ARC, RECTANGLE',
              'Koordinat sistemi (mutlak, göreceli, polar)',
              'Object Snap (OSNAP) kullanımı',
              'Zoom, Pan, View kontrolü',
              'Uygulama: Basit geometrik şekiller çizimi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 2 – Düzenleme (Modify) Komutları',
        lessons: [
          {
            title: 'Ders 3 – Modify Komutları – 1',
            topics: [
              'MOVE, COPY, ROTATE, SCALE',
              'ERASE, UNDO, REDO',
              'Selection yöntemleri',
              'Uygulama: Plan parçası düzenleme'
            ]
          },
          {
            title: 'Ders 4 – Modify Komutları – 2',
            topics: [
              'TRIM, EXTEND, OFFSET',
              'FILLET, CHAMFER',
              'STRETCH, BREAK, JOIN',
              'Uygulama: Basit oda planı oluşturma'
            ]
          }
        ]
      },
      {
        title: 'Hafta 3 – Katmanlar ve Nesne Özellikleri',
        lessons: [
          {
            title: 'Ders 5 – Layers (Katman Yönetimi)',
            topics: [
              'Layer mantığı ve önemi',
              'Layer oluşturma, renk, çizgi tipi, kalınlık',
              'Layer kilitleme, gizleme',
              'Uygulama: Katmanlı teknik çizim'
            ]
          },
          {
            title: 'Ders 6 – Properties ve Line Types',
            topics: [
              'Nesne özellikleri (Properties paneli)',
              'Lineweight ve Linetype kullanımı',
              'ByLayer mantığı',
              'Uygulama: Mimari çizimde katman standardı'
            ]
          }
        ]
      },
      {
        title: 'Hafta 4 – Ölçülendirme ve Yazı (Annotation)',
        lessons: [
          {
            title: 'Ders 7 – Metin ve Yazı Ayarları',
            topics: [
              'TEXT ve MTEXT',
              'Text Style oluşturma',
              'Teknik yazı standartları',
              'Uygulama: Çizim üzerine açıklamalar'
            ]
          },
          {
            title: 'Ders 8 – Ölçülendirme (Dimension)',
            topics: [
              'Linear, Aligned, Angular, Radius, Diameter',
              'Dimension Style oluşturma',
              'Ölçek ve ölçü uyumu',
              'Uygulama: Ölçülendirilmiş plan çizimi'
            ]
          }
        ]
      },
      {
        title: 'Hafta 5 – Bloklar ve Referanslar',
        lessons: [
          {
            title: 'Ders 9 – Blok Mantığı ve Oluşturma',
            topics: [
              'Block nedir, neden kullanılır',
              'Block oluşturma ve düzenleme',
              'WBLOCK ve INSERT',
              'Uygulama: Kapı, pencere, sembol blokları'
            ]
          },
          {
            title: 'Ders 10 – External Reference (XREF) & Design Center',
            topics: [
              'XREF mantığı',
              'Dosya bağlama ve güncelleme',
              'Design Center kullanımı',
              'Uygulama: Çoklu dosya ile çalışma'
            ]
          }
        ]
      },
      {
        title: 'Hafta 6 – Hassas Çizim ve İleri Araçlar',
        lessons: [
          {
            title: 'Ders 11 – Hassas Çizim Teknikleri',
            topics: [
              'Object Snap ayarları',
              'Tracking ve geçici snaplar',
              'Measure, Divide',
              'Uygulama: Hassas plan çizimi'
            ]
          },
          {
            title: 'Ders 12 – Hatch ve Alan Araçları',
            topics: [
              'HATCH kullanımı',
              'Desen, ölçek ve sınır ayarları',
              'Area hesaplama',
              'Uygulama: Tarama ve alan hesaplamalı çizim'
            ]
          }
        ]
      },
      {
        title: 'Hafta 7 – Layout, Ölçek ve Baskı (Plot)',
        lessons: [
          {
            title: 'Ders 13 – Model Space & Layout (Paper Space)',
            topics: [
              'Model / Layout farkı',
              'Viewport oluşturma',
              'Ölçek kavramı',
              'Uygulama: Birden fazla görünüş yerleştirme'
            ]
          },
          {
            title: 'Ders 14 – Plot ve PDF Alma',
            topics: [
              'Sayfa ayarları',
              'CTB / STB çizgi kalınlıkları',
              'Ölçekli çıktı alma',
              'PDF oluşturma',
              'Uygulama: Baskıya hazır teknik pafta'
            ]
          }
        ]
      },
      {
        title: 'Hafta 8 – Uygulama ve Final Projesi',
        lessons: [
          {
            title: 'Ders 15 – Genel Tekrar ve Mini Proje',
            topics: [
              'Komut tekrarları',
              'Sık yapılan hatalar',
              'Mini proje başlangıcı:',
              'Basit konut planı / teknik parça çizimi'
            ]
          },
          {
            title: 'Ders 16 – Final Projesi ve Değerlendirme',
            topics: [
              'Proje tamamlama',
              'Katman, ölçü, yazı, çıktı kontrolü',
              'Öğrenci sunumları',
              'Genel değerlendirme ve sertifika öncesi geri bildirim'
            ]
          }
        ]
      }
    ]
  }
};