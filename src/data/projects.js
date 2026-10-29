// Project Portfolio Data
import verdeMain from '../assets/projects/verde-harvest-main.webp';
import verdeThumb1 from '../assets/projects/verde-thumb-1.webp';
import verdeThumb2 from '../assets/projects/verde-thumb-2.webp';
import verdeThumb3 from '../assets/projects/verde-thumb-3.webp';
import mieAyamImg from '../assets/projects/mie-ayam-full.jpg';
import sambalImg from '../assets/projects/sambal-sedap.webp';

export const PROJECT_CATEGORIES = [
  'ALL',
  'UMKM BRAND',
  'JASA/LOCAL SERVICES',
  'COFFEE SHOP',
  'FASHION & APPAREL',
];

export const DESIGN_FORMAT_TYPES = [
  'Poster & Feed Sosmed',
  'Spanduk & Banner Promosi',
  'Packaging & Label Produk',
  'Branding & Identitas Visual',
  'Brosur & Materi Cetak',
];

export const PROJECTS_DATA = [
  {
    id: 'verde-harvest',
    title: 'Verde Harvest - Glow Immune & Green Detox',
    category: 'UMKM BRAND',
    mediaFormat: 'Poster & Feed Sosmed',
    tagline: 'Segarkan Tubuhmu Dari Dalam',
    coverImage: verdeMain,
    gallery: [
      {
        id: 'v1',
        title: 'Poster Feed Utama',
        image: verdeThumb1,
      },
      {
        id: 'v2',
        title: 'Kandungan Nutrisi (Lemon & Honey)',
        image: verdeThumb2,
      },
      {
        id: 'v3',
        title: 'Variasi Produk Detox Botol',
        image: verdeThumb3,
      },
    ],
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    client: 'Verde Harvest Beverages',
    year: '2024',
    description:
      'Perancangan materi promosi visual komersial untuk produk minuman detoks dan imunitas tubuh berbahan dasar 100% buah dan sayur segar. Fokus desain menekankan kesegaran alami, palet warna vibran hijau dan jingga cerah, serta tipografi playful yang menarik target audiens gaya hidup sehat.',
  },
  {
    id: 'mie-ayam-kampung',
    title: 'Waktunya! Mie Ayam - Promo Spanduk & Feed',
    category: 'UMKM BRAND',
    mediaFormat: 'Spanduk & Banner Promosi',
    tagline: 'Waktunya ! Mie Ayam Lezat & Halal',
    coverImage: mieAyamImg,
    gallery: [
      {
        id: 'm1',
        title: 'Materi Banner Promosi',
        image: mieAyamImg,
      },
    ],
    tools: ['Adobe Photoshop', 'CorelDRAW'],
    client: 'Warung Mie Ayam Pakde',
    year: '2024',
    description:
      'Desain materi promosi spanduk dan konten media sosial dengan aksen merah berani, menonjolkan visual uap panas dan tekstur mie ayam lezat siap saji yang menggugah selera pelanggan.',
  },
  {
    id: 'sambal-sedap-cobek',
    title: 'Sambal Sedap - Sambal Cobek Panas Nusantara',
    category: 'UMKM BRAND',
    mediaFormat: 'Poster & Feed Sosmed',
    tagline: 'Sensasi Pedas Sambal Cobek Asli',
    coverImage: sambalImg,
    gallery: [
      {
        id: 's1',
        title: 'Feed Promo Sambal Cobek',
        image: sambalImg,
      },
    ],
    tools: ['Adobe Photoshop', 'Figma'],
    client: 'Resto Sambal Sedap',
    year: '2024',
    description:
      'Desain konten promosi digital kuliner nusantara dengan komposisi cabai segar, cobek batu tradisional, serta penonjolan label 100% cabai segar tanpa pengawet.',
  },
  {
    id: 'kopi-senja-roastery',
    title: 'Kopi Senja - Signature Cold Brew Branding',
    category: 'COFFEE SHOP',
    mediaFormat: 'Packaging & Label Produk',
    tagline: 'Kopi Nusantara Dari Hati',
    coverImage: verdeMain, // Fallback preview
    gallery: [
      {
        id: 'c1',
        title: 'Kemasan Botol Cold Brew',
        image: verdeMain,
      },
    ],
    tools: ['Adobe Illustrator', 'Figma'],
    client: 'Senja Roastery & Cafe',
    year: '2024',
    description:
      'Pengembangan identitas visual label botol kopi cold brew dan poster menu meja dengan gaya rustic modern yang elegan untuk kedai kopi lokal.',
  },
  {
    id: 'gentlemen-barbershop',
    title: 'The Classic Cut - Barbershop Social Assets',
    category: 'JASA/LOCAL SERVICES',
    mediaFormat: 'Brosur & Materi Cetak',
    tagline: 'Gaya Rambut Presisi & Berkelas',
    coverImage: sambalImg, // Fallback preview
    gallery: [
      {
        id: 'b1',
        title: 'Pricelist & Promo Service',
        image: sambalImg,
      },
    ],
    tools: ['Adobe Illustrator', 'Photoshop'],
    client: 'The Classic Cut Barbershop',
    year: '2023',
    description:
      'Pembuatan aset visual promosi layanan potong rambut, pricelist cetak tahan air, serta konten template Instagram feed bertema vintage maskulin.',
  },
  {
    id: 'urban-apparel-streetwear',
    title: 'Hustle Culture - Streetwear Merch Graphics',
    category: 'FASHION & APPAREL',
    mediaFormat: 'Branding & Identitas Visual',
    tagline: 'Bold Typography & Edgy Illustrations',
    coverImage: mieAyamImg, // Fallback preview
    gallery: [
      {
        id: 'f1',
        title: 'T-Shirt Back Graphic Artwork',
        image: mieAyamImg,
      },
    ],
    tools: ['Adobe Illustrator', 'Photoshop'],
    client: 'Hustle Culture Clothing',
    year: '2024',
    description:
      'Desain grafis sablon t-shirt dan packaging box untuk lini pakaian streetwear dengan tipografi ekspresif dan ilustrasi vektor detail tinggi.',
  },
];

