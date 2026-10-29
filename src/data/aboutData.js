// Initial Data for Skills and Certificates in Section 2 (About Me)
import illustratorImg from '../assets/portfolio/Illustrator.webp';
import photoshopImg from '../assets/portfolio/Photoshop.webp';
import figmaImg from '../assets/portfolio/Figma.webp';
import corelImg from '../assets/portfolio/Corel.webp';
import canvaImg from '../assets/portfolio/Canva.webp';

export const INITIAL_SKILLS = [
  {
    id: 'skill-illustrator',
    name: 'Adobe Illustrator',
    logo: illustratorImg,
    level: 'Vector & Branding Specialist',
  },
  {
    id: 'skill-photoshop',
    name: 'Adobe Photoshop',
    logo: photoshopImg,
    level: 'Photo Manipulation & Poster Master',
  },
  {
    id: 'skill-figma',
    name: 'Figma',
    logo: figmaImg,
    level: 'UI/UX & Feed Social Prototyping',
  },
  {
    id: 'skill-corel',
    name: 'CorelDRAW',
    logo: corelImg,
    level: 'Print & Commercial Layout',
  },
  {
    id: 'skill-canva',
    name: 'Canva',
    logo: canvaImg,
    level: 'Fast Social Media Assets',
  },
];

export const INITIAL_CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'SMK DESAIN KOMUNIKASI VISUAL',
    issuer: 'Pendidikan Kejuruan Desain Grafis & Multimedia',
    year: '2019 - 2022',
    type: 'pendidikan',
    image: '', // Foto ijazah/sertifikat jika ada
  },
  {
    id: 'cert-2',
    title: 'S1 TEKNIK INFORMATIKA',
    issuer: 'Pendidikan Tinggi Strata 1 (Fokus Front-End & Media Interaktif)',
    year: '2022 - Sekarang',
    type: 'pendidikan',
    image: '',
  },
  {
    id: 'cert-3',
    title: 'SERTIFIKASI DESAIN GRAFIS KOMERSIAL',
    issuer: 'Pelatihan Profesional Desain Komunikasi Visual & Branding',
    year: '2023',
    type: 'sertifikat',
    image: '',
  },
];

