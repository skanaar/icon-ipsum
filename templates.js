import { Vec, dist, add, diff, mult, mag, normalize, rot } from './Vec.js'

export const templates = [
  {
    name: 'circle',
    edges: [
      { only: 'circle', start: Vec(2, 12), end: Vec(22, 12), height: 20 },
      { only: 'patch', start: Vec(8, 12), end: Vec(16, 12), height: 8 },
    ],
  },
  {
    name: 'circle-flair',
    edges: [
      { only: 'circle-flair', start: Vec(2, 12), end: Vec(22, 12), height: 20 },
      { only: 'patch', start: Vec(9, 12), end: Vec(15, 12), height: 6 },
    ],
  },
  {
    name: 'circle-barred',
    edges: [
      { only: 'circle', start: Vec(2, 12), end: Vec(22, 12), height: 20 },
      { only: 'L taper', not: 'prefer-straight', start: Vec(2, 12), end: Vec(22, 12), height: 20 },
    ],
  },
  {
    name: 'circle-flair-barred',
    edges: [
      { only: 'circle-flair', start: Vec(2, 12), end: Vec(22, 12), height: 20 },
      { only: 'L taper', not: 'prefer-straight', start: Vec(2, 12), end: Vec(22, 12), height: 20 },
    ],
  },
  {
    name: 'rectangle',
    edges: [
      { start: Vec(4, 8), end: Vec(20, 8), height: 16, only: 'L', not: 'in tall' },
      { start: Vec(20, 8), end: Vec(20, 16), height: 8, only: 'S', not: 'out' },
      { start: Vec(20, 16), end: Vec(4, 16), height: 16, only: 'L', not: 'in tall' },
      { start: Vec(4, 16), end: Vec(4, 8), height: 8, only: 'S', not: 'out' },
    ],
  },
  {
    name: 'card',
    edges: [
      { start: Vec(4, 6), end: Vec(20, 6), height: 16, only: 'L', not: 'in tall' },
      { start: Vec(20, 6), end: Vec(20, 18), height: 12, only: 'M', not: 'out' },
      { start: Vec(20, 18), end: Vec(4, 18), height: 16, only: 'L', not: 'in tall' },
      { start: Vec(4, 18), end: Vec(4, 6), height: 12, only: 'M', not: 'out' },
      { only: 'patch', start: Vec(10, 12), end: Vec(14, 12), height: 4 },
    ],
  },
  {
    name: 'square-patch',
    edges: [
      { start: Vec(2, 2), end: Vec(22, 2), height: 20, only: 'L', not: 'out deep' },
      { start: Vec(22, 2), end: Vec(22, 22), height: 20, only: 'L', not: 'out deep' },
      { start: Vec(22, 22), end: Vec(2, 22), height: 20, only: 'L', not: 'out deep' },
      { start: Vec(2, 22), end: Vec(2, 2), height: 20, only: 'L', not: 'out deep' },
      { only: 'patch ortho', start: Vec(9, 12), end: Vec(15, 12), height: 6 },
    ],
  },
  {
    name: 'square',
    edges: [
      { start: Vec(7, 7), end: Vec(17, 7), height: 10, only: 'M', not: 'in' },
      { start: Vec(17, 7), end: Vec(17, 17), height: 10, only: 'M', not: 'in' },
      { start: Vec(17, 17), end: Vec(7, 17), height: 10, only: 'M', not: 'in' },
      { start: Vec(7, 17), end: Vec(7, 7), height: 10, only: 'M', not: 'in' },
      { only: 'patch ortho', start: Vec(10, 12), end: Vec(14, 12), height: 4 },
    ],
  },
  {
    name: 'trapeze',
    edges: [
      { only: 'patch', start: Vec(10, 4), end: Vec(14, 4), height: 4 },
      { start: Vec(12 - 3, 8), end: Vec(12 + 3, 8), height: 10, only: 'M', not: 'in out' },
      { start: Vec(12 + 3, 8), end: Vec(12 + 8, 16), height: 10, only: 'M', not: 'in out' },
      { start: Vec(12 + 8, 16), end: Vec(12 - 8, 16), height: 10, only: 'M', not: 'in out' },
      { start: Vec(12 - 8, 16), end: Vec(12 - 3, 8), height: 10, only: 'M', not: 'in out' },
      { only: 'patch', start: Vec(10, 20), end: Vec(14, 20), height: 4 },
    ],
  },
  {
    name: 'rhomb',
    edges: [
      { start: Vec(12, 4), end: Vec(20, 12), height: 11, only: 'M', not: 'in' },
      { start: Vec(20, 12), end: Vec(12, 20), height: 11, only: 'M', not: 'in' },
      { start: Vec(12, 20), end: Vec(4, 12), height: 11, only: 'M', not: 'in' },
      { start: Vec(4, 12), end: Vec(12, 4), height: 11, only: 'M', not: 'in' },
      { only: 'patch ortho', start: Vec(10, 12), end: Vec(14, 12), height: 4 },
    ],
  },
  {
    name: 'rhomb-patch',
    edges: [
      { start: Vec(12, 2), end: Vec(22, 12), height: 14, only: 'L', not: 'out deep' },
      { start: Vec(22, 12), end: Vec(12, 22), height: 14, only: 'L', not: 'out deep' },
      { start: Vec(12, 22), end: Vec(2, 12), height: 14, only: 'L', not: 'out deep' },
      { start: Vec(2, 12), end: Vec(12, 2), height: 14, only: 'L', not: 'out deep' },
      { only: 'patch ortho', start: Vec(10, 12), end: Vec(14, 12), height: 4 },
    ],
  },
  {
    name: 'triangle',
    edges: [
      ...[0, 1, 2].map((i) => {
        const p = (i) =>
          Vec(12 + 9 * Math.sin((i * 2 * Math.PI) / 3), 14 - 9 * Math.cos((i * 2 * Math.PI) / 3))
        return { start: p(i), end: p(i + 1), height: 14, only: 'L taper', not: 'tall deep' }
      }),
    ],
  },
  {
    name: 'triangle-patch',
    edges: [
      ...[0, 1, 2].map((i) => {
        const p = (i) =>
          Vec(12 + 11 * Math.sin((i * 2 * Math.PI) / 3), 14 - 11 * Math.cos((i * 2 * Math.PI) / 3))
        return { start: p(i), end: p(i + 1), height: 16, only: 'L taper', not: 'out in' }
      }),
      { only: 'patch hex', not: 'empty', start: Vec(9, 14), end: Vec(15, 14), height: 6 },
    ],
  },
]
