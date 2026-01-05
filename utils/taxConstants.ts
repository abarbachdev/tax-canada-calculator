
import type { TaxConstants, ProvinceKey } from '../types';

export const TAX_CONSTANTS_2025: TaxConstants = {
  year: 2025,
  federal: {
    brackets: [
      { rate: 0.15, min: 0, max: 55867 },
      { rate: 0.205, min: 55867, max: 111733 },
      { rate: 0.26, min: 111733, max: 173205 },
      { rate: 0.29, min: 173205, max: 246752 },
      { rate: 0.33, min: 246752 },
    ],
    basicPersonalAmount: 15705,
  },
  provinces: {
    ON: {
      name: 'Ontario',
      slug: 'ontario',
      brackets: [
        { rate: 0.0505, min: 0, max: 51446 },
        { rate: 0.0915, min: 51446, max: 102894 },
        { rate: 0.1116, min: 102894, max: 150000 },
        { rate: 0.1216, min: 150000, max: 220000 },
        { rate: 0.1316, min: 220000 },
      ],
    },
    QC: {
      name: 'Quebec',
      slug: 'quebec',
      brackets: [
        { rate: 0.14, min: 0, max: 51780 },
        { rate: 0.19, min: 51780, max: 103545 },
        { rate: 0.24, min: 103545, max: 126000 },
        { rate: 0.2575, min: 126000 },
      ],
    },
    BC: {
      name: 'British Columbia',
      slug: 'british-columbia',
      brackets: [
        { rate: 0.0506, min: 0, max: 47937 },
        { rate: 0.077, min: 47937, max: 95875 },
        { rate: 0.105, min: 95875, max: 110076 },
        { rate: 0.1229, min: 110076, max: 133664 },
        { rate: 0.147, min: 133664, max: 181232 },
        { rate: 0.168, min: 181232, max: 252753 },
        { rate: 0.205, min: 252753 },
      ],
    },
    AB: {
      name: 'Alberta',
      slug: 'alberta',
      brackets: [
        { rate: 0.10, min: 0, max: 148269 },
        { rate: 0.12, min: 148269, max: 177922 },
        { rate: 0.13, min: 177922, max: 237230 },
        { rate: 0.14, min: 237230, max: 355845 },
        { rate: 0.15, min: 355845 },
      ],
    },
    SK: {
      name: 'Saskatchewan',
      slug: 'saskatchewan',
      brackets: [
        { rate: 0.105, min: 0, max: 49720 },
        { rate: 0.125, min: 49720, max: 142058 },
        { rate: 0.145, min: 142058 },
      ],
    },
    MB: {
      name: 'Manitoba',
      slug: 'manitoba',
      brackets: [
        { rate: 0.108, min: 0, max: 47000 },
        { rate: 0.1275, min: 47000, max: 100000 },
        { rate: 0.174, min: 100000 },
      ],
    },
    NB: {
      name: 'New Brunswick',
      slug: 'new-brunswick',
      brackets: [
        { rate: 0.094, min: 0, max: 49958 },
        { rate: 0.14, min: 49958, max: 99916 },
        { rate: 0.16, min: 99916, max: 185064 },
        { rate: 0.195, min: 185064 },
      ],
    },
    NS: {
      name: 'Nova Scotia',
      slug: 'nova-scotia',
      brackets: [
        { rate: 0.0879, min: 0, max: 29590 },
        { rate: 0.1495, min: 29590, max: 59180 },
        { rate: 0.1667, min: 59180, max: 93000 },
        { rate: 0.175, min: 93000, max: 150000 },
        { rate: 0.21, min: 150000 },
      ],
    },
    PE: {
      name: 'Prince Edward Island',
      slug: 'prince-edward-island',
      brackets: [
        { rate: 0.098, min: 0, max: 31984 },
        { rate: 0.138, min: 31984, max: 63969 },
        { rate: 0.167, min: 63969 },
      ],
    },
    NL: {
      name: 'Newfoundland and Labrador',
      slug: 'newfoundland-and-labrador',
      brackets: [
        { rate: 0.087, min: 0, max: 44039 },
        { rate: 0.145, min: 44039, max: 88078 },
        { rate: 0.158, min: 88078, max: 157240 },
        { rate: 0.178, min: 157240, max: 220130 },
        { rate: 0.198, min: 220130, max: 275162 },
        { rate: 0.208, min: 275162, max: 550324 },
        { rate: 0.213, min: 550324, max: 1100648 },
        { rate: 0.218, min: 1100648 },
      ],
    },
  },
  cpp: { rate: 0.0595, max: 4055.5, exemption: 3500 },
  ei: { rate: 0.0166, max: 1049.12 },
  qpp: { rate: 0.064, max: 4492.8, exemption: 3500 },
  qpip: {
    employee: { rate: 0.00494, max: 464.36 },
    employer: { rate: 0.00692, max: 650.48 },
  },
};

export const PROVINCES = Object.entries(TAX_CONSTANTS_2025.provinces).reduce((acc, [key, value]) => {
    acc[key as ProvinceKey] = { name: value.name, slug: value.slug };
    return acc;
}, {} as Record<ProvinceKey, {name: string, slug: string}>);

export const PROVINCE_slug_MAP = Object.fromEntries(
    Object.entries(PROVINCES).map(([key, value]) => [value.slug, key])
);
