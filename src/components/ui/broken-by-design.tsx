import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

/* Inlined styles for self-contained 3D Glass Fracture */
const BBD2_CSS = `/* broken by design. ---------------------------------------------------- */

.bbd2 {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  isolation: isolate;
  background: #030407;
  perspective: 1250px;
  container-type: inline-size;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  user-select: none;
  z-index: 100;
}

.bbd2-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 62% 50% at 50% 42%,
      rgba(245, 158, 11, 0.12), transparent 62%),
    radial-gradient(ellipse 100% 80% at 50% 118%,
      rgba(56, 189, 248, 0.15), transparent 60%),
    #030407;
}

.bbd2-stage {
  position: absolute;
  inset: 6% 4.5%;
}

/* ------- title ------------------------------------------------------ */

.bbd2-title,
.bbd2-slice {
  position: absolute;
  display: grid;
  place-items: center;
  pointer-events: none;
  white-space: nowrap;
  font-weight: 800;
  font-size: clamp(24px, 7.5cqw, 130px);
  letter-spacing: -0.035em;
  line-height: 1;
  text-transform: uppercase;
}

.bbd2-title {
  inset: 0;
  z-index: 1;
  opacity: 0;
  animation: bbd2-cracks-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.bbd2-title--under span,
.bbd2-title--under .bbd2-stack {
  color: rgba(188, 198, 220, 0.22);
}

.bbd2--portrait .bbd2-title,
.bbd2--portrait .bbd2-slice {
  font-size: clamp(32px, 14cqw, 130px);
}

.bbd2-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.08em;
  transform: rotate(-6deg);
  line-height: 0.95;
}

.bbd2-stack em {
  font-style: normal;
  display: block;
}

/* ------- cracks through the void ------------------------------------ */

.bbd2-cracks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  animation: bbd2-cracks-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.85)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.9));
}

@keyframes bbd2-cracks-in {
  to { opacity: 1; }
}

.bbd2-cracks path {
  fill: none;
  vector-effect: non-scaling-stroke;
}

.bbd2-cracks-line path {
  stroke: #fbbf24;
  stroke-width: 2.4;
}

.bbd2-cracks-glow path {
  stroke: rgba(245, 158, 11, 0.5);
  stroke-width: 7;
}

.bbd2-cracks-fine path {
  stroke: #38bdf8;
  stroke-width: 1.6;
}

/* ------- glass ------------------------------------------------------ */

.bbd2-pane {
  position: absolute;
  inset: 0;
  z-index: 5;
  transform-style: preserve-3d;
  pointer-events: none;
}

.bbd2-shard {
  position: absolute;
  transform-origin: 50% 50%;
  pointer-events: auto;
  will-change: transform, opacity, filter;
  transition: filter 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  filter:
    brightness(1.15)
    drop-shadow(0 25px 35px rgba(0, 0, 0, 0.95))
    drop-shadow(0 0 16px rgba(245, 158, 11, 0.35));
}

.bbd2-shard--hot {
  z-index: 40 !important;
  filter:
    brightness(1.45)
    drop-shadow(0 42px 60px rgba(0, 0, 0, 0.9))
    drop-shadow(0 0 40px rgba(245, 158, 11, 0.75)) !important;
}

.bbd2-inlay {
  position: absolute;
  inset: 0;
  overflow: hidden;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  pointer-events: none;
  border-radius: 8px;
}

.bbd2-glassimg {
  position: absolute;
  inset: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(245, 158, 11, 0.3);
}

.bbd2-glassimg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      132deg,
      rgba(245, 158, 11, 0.25) 0%,
      rgba(56, 189, 248, 0.18) 30%,
      transparent 46%,
      transparent 60%,
      rgba(236, 72, 153, 0.2) 100%
    );
  mix-blend-mode: screen;
}

.bbd2-slice > span,
.bbd2-slice > .bbd2-stack {
  color: rgba(255, 255, 255, 0.9);
  mix-blend-mode: screen;
  filter: blur(0.3px);
  transform: var(--jt);
  text-shadow: 0 0 18px rgba(245, 158, 11, 0.5);
}

.bbd2-slice > .bbd2-stack {
  transform: var(--jt) rotate(-6deg);
}

.bbd2-specular {
  position: absolute;
  inset: 0;
  opacity: 0;
  background:
    radial-gradient(
      42% 42% at var(--mx, 50%) var(--my, 50%),
      rgba(255, 240, 200, 0.55),
      rgba(245, 158, 11, 0.2) 46%,
      transparent 72%
    );
  mix-blend-mode: screen;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.bbd2-shard--hot .bbd2-specular {
  opacity: 1;
}

.bbd2-shattered {
  pointer-events: none !important;
}
`;

export interface BrokenByDesignProps {
  assetsBase?: string;
  title?: string;
  onEnter?: () => void;
}

type Piece = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
  ring: number;
};

const DESKTOP: Piece[] = [
  { id: 'desktop-01a', x: 80.214, y: 5.299, w: 15.445, h: 72.943, cx: 87.96, cy: 41.83, ring: 2 },
  { id: 'desktop-01b', x: 92.39, y: 31.004, w: 6.144, h: 52.762, cx: 95.32, cy: 58.4, ring: 2 },
  { id: 'desktop-02a', x: 31.285, y: 7.44, w: 15.614, h: 40.023, cx: 38.98, cy: 27.34, ring: 1 },
  { id: 'desktop-02b', x: 5.073, y: 6.313, w: 31.567, h: 39.572, cx: 20.94, cy: 26.04, ring: 1 },
  { id: 'desktop-02c', x: 4.791, y: 9.808, w: 19.786, h: 25.93, cx: 14.63, cy: 22.6, ring: 1 },
  { id: 'desktop-03a', x: 18.771, y: 38.444, w: 28.636, h: 52.649, cx: 32.92, cy: 64.66, ring: 1 },
  { id: 'desktop-03b', x: 4.735, y: 35.964, w: 15.558, h: 11.612, cx: 12.63, cy: 41.88, ring: 1 },
  { id: 'desktop-03c', x: 3.044, y: 46.111, w: 26.719, h: 45.547, cx: 16.52, cy: 68.43, ring: 1 },
  { id: 'desktop-04a', x: 42.785, y: 7.892, w: 25.536, h: 36.077, cx: 55.55, cy: 25.82, ring: 0 },
  { id: 'desktop-04b', x: 50.057, y: 7.554, w: 34.16, h: 29.876, cx: 67.08, cy: 22.55, ring: 0 },
  { id: 'desktop-05a', x: 37.655, y: 46.786, w: 14.149, h: 18.489, cx: 44.79, cy: 55.86, ring: 0 },
  { id: 'desktop-05b', x: 46.11, y: 37.88, w: 34.611, h: 26.945, cx: 63.28, cy: 51.24, ring: 0 },
  { id: 'desktop-06a', x: 44.645, y: 68.659, w: 32.694, h: 24.464, cx: 60.94, cy: 80.5, ring: 0 },
  { id: 'desktop-06b', x: 47.238, y: 66.404, w: 26.945, h: 12.852, cx: 60.85, cy: 72.55, ring: 0 },
  { id: 'desktop-07a', x: 74.972, y: 57.61, w: 12.12, h: 34.498, cx: 81.14, cy: 74.69, ring: 2 },
  { id: 'desktop-07b', x: 84.273, y: 66.855, w: 10.654, h: 25.028, cx: 89.54, cy: 79.65, ring: 2 },
];

const MOBILE: Piece[] = [
  { id: 'mobile-01a', x: 51.817, y: 3.633, w: 39.625, h: 22.343, cx: 71.45, cy: 14.78, ring: 2 },
  { id: 'mobile-01b', x: 7.972, y: 4.338, w: 60.258, h: 19.469, cx: 38.39, cy: 14.13, ring: 2 },
  { id: 'mobile-01c', x: 59.789, y: 3.958, w: 13.013, h: 5.369, cx: 66.3, cy: 6.81, ring: 2 },
  { id: 'mobile-02a', x: 7.034, y: 19.36, w: 36.811, h: 34.111, cx: 25.44, cy: 36.36, ring: 0 },
  { id: 'mobile-02b', x: 10.082, y: 18.872, w: 48.886, h: 24.024, cx: 34.23, cy: 30.99, ring: 0 },
  { id: 'mobile-03a', x: 10.316, y: 69.685, w: 35.287, h: 13.178, cx: 27.84, cy: 76.36, ring: 1 },
  { id: 'mobile-03b', x: 9.144, y: 73.59, w: 60.844, h: 22.397, cx: 39.62, cy: 84.6, ring: 1 },
  { id: 'mobile-04a', x: 8.91, y: 55.965, w: 67.057, h: 22.56, cx: 42.38, cy: 67.14, ring: 0 },
  { id: 'mobile-04b', x: 13.834, y: 52.603, w: 56.389, h: 11.714, cx: 41.79, cy: 58.6, ring: 0 },
  { id: 'mobile-04c', x: 42.556, y: 56.508, w: 47.831, h: 13.503, cx: 66.0, cy: 63.31, ring: 0 },
  { id: 'mobile-05a', x: 63.54, y: 11.985, w: 29.426, h: 14.479, cx: 78.43, cy: 19.28, ring: 1 },
  { id: 'mobile-05b', x: 57.796, y: 16.595, w: 34.584, h: 28.145, cx: 75.03, cy: 30.56, ring: 1 },
  { id: 'mobile-06a', x: 61.313, y: 71.529, w: 26.495, h: 24.403, cx: 74.68, cy: 83.73, ring: 2 },
  { id: 'mobile-06b', x: 76.905, y: 67.462, w: 14.42, h: 18.113, cx: 83.76, cy: 76.57, ring: 2 },
  { id: 'mobile-07a', x: 32.474, y: 46.312, w: 54.396, h: 10.521, cx: 58.97, cy: 51.44, ring: 0 },
  { id: 'mobile-07b', x: 43.494, y: 37.961, w: 48.3, h: 18.872, cx: 67.53, cy: 47.37, ring: 0 },
];

const ATLAS = {
  desktop: { url: 'atlas-desktop.png', w: 900, h: 2807 },
  mobile: { url: 'atlas-mobile.png', w: 900, h: 3287 },
};

const ATLAS_RECTS: Record<string, Record<string, [number, number, number, number]>> = {
  desktop: {
    'desktop-01a': [2, 2, 274, 647],
    'desktop-01b': [278, 2, 109, 468],
    'desktop-02a': [478, 651, 277, 355],
    'desktop-02b': [2, 1057, 560, 351],
    'desktop-02c': [2, 2240, 351, 230],
    'desktop-03a': [389, 2, 508, 467],
    'desktop-03b': [482, 2691, 276, 103],
    'desktop-03c': [2, 651, 474, 404],
    'desktop-04a': [2, 1410, 453, 320],
    'desktop-04b': [2, 1732, 606, 265],
    'desktop-05a': [584, 2472, 251, 164],
    'desktop-05b': [2, 1999, 614, 239],
    'desktop-06a': [2, 2472, 580, 217],
    'desktop-06b': [2, 2691, 478, 114],
    'desktop-07a': [457, 1410, 215, 306],
    'desktop-07b': [355, 2240, 189, 222],
  },
  mobile: {
    'mobile-01a': [523, 1496, 338, 412],
    'mobile-01b': [2, 1911, 514, 359],
    'mobile-01c': [468, 3091, 111, 99],
    'mobile-02a': [2, 2, 314, 629],
    'mobile-02b': [2, 633, 417, 443],
    'mobile-03a': [412, 2622, 301, 243],
    'mobile-03b': [2, 1496, 519, 413],
    'mobile-04a': [2, 1078, 572, 416],
    'mobile-04b': [2, 2873, 481, 216],
    'mobile-04c': [2, 2622, 408, 249],
    'mobile-05a': [541, 2272, 251, 267],
    'mobile-05b': [318, 2, 295, 519],
    'mobile-06a': [615, 2, 226, 450],
    'mobile-06b': [416, 2272, 123, 334],
    'mobile-07a': [2, 3091, 464, 194],
    'mobile-07b': [2, 2272, 412, 348],
  },
};

function spriteStyle(setKey: 'desktop' | 'mobile', id: string) {
  const sheet = ATLAS[setKey];
  const rect = ATLAS_RECTS[setKey][id];
  const sx = rect[0],
    sy = rect[1],
    fw = rect[2],
    fh = rect[3];
  const sizeX = (sheet.w / fw) * 100;
  const sizeY = (sheet.h / fh) * 100;
  const posX = sheet.w > fw ? (sx / (sheet.w - fw)) * 100 : 0;
  const posY = sheet.h > fh ? (sy / (sheet.h - fh)) * 100 : 0;
  return {
    backgroundSize: sizeX.toFixed(3) + '% ' + sizeY.toFixed(3) + '%',
    backgroundPosition: posX.toFixed(3) + '% ' + posY.toFixed(3) + '%',
  };
}

const CRACKS: Record<string, { w: number; h: number; main: string[]; fine: string[] }> = {
  desktop: {
    w: 1774,
    h: 887,
    main: [
      'M1616 807L1432 812L1402 805L1397 797L1385 790',
      'M769 404L812 402L1359 327L1381 321',
      'M1381 321L1390 300L1443 241L1467 231',
      'M1381 321L1386 326L1410 329L1435 338',
      'M695 402L701 391L724 374L747 365',
      'M656 484L629 473L611 455L604 434',
      'M1436 339L1436 379L1428 438L1404 489',
      'M1122 817L1135 817',
      'M832 590L835 587L854 586L895 587',
      'M657 484L660 481L664 443L670 430',
      'M696 403L706 403L708 408',
      'M75 501L89 329L102 318L124 310L136 298',
      'M1318 543L1321 583',
      'M110 765L78 711',
      'M918 817L1014 817',
      'M62 661L66 629',
      'M852 646L846 640L832 591',
      'M129 61L814 67L842 90',
      'M173 805L720 807L735 803L756 778L777 770',
      'M819 816L809 814L789 801L783 775L778 770',
      'M1174 818L1331 818',
      'M853 646L870 639L888 615L895 588',
      'M834 816L877 816',
      'M1667 796L1681 773L1688 750',
      'M748 365L762 385L768 403',
      'M1436 338L1442 331L1467 265L1470 237',
      'M94 267L87 239L92 100',
      'M1320 584L1283 582L1274 573',
      'M1403 490L1358 504L1331 525L1318 542',
      'M1689 749L1716 741L1729 732',
      'M1273 572L910 581L896 587',
      'M1274 571L1293 550L1317 543',
      'M696 420L763 409L768 404',
      'M1673 115L1674 131',
      'M1621 806L1640 806',
      'M75 503L66 597L66 628',
      'M1508 127L1500 119L1497 105L1487 86L1480 79L1465 75L1286 69L884 64L867 68L853 84L842 90',
      'M1508 127L1527 115L1541 80L1556 63L1579 56L1633 54',
      'M1508 127L1502 152L1468 230',
      'M778 769L781 757L843 671L852 647',
      'M1675 133L1736 671',
      'M1404 490L1434 526L1688 749',
      'M1384 789L1380 759L1321 585',
      'M604 433L608 429L664 429',
      'M1383 790L1370 806L1341 818',
      'M842 90L835 131L753 337L748 364',
      'M95 268L112 280L125 284L136 298',
      'M831 590L819 587L685 518L664 502L657 485',
      'M688 418L694 403',
      'M136 298L494 342L510 351L603 433',
      'M687 419L670 430',
    ],
    fine: [
      'M82 502L76 502',
      'M1468 231L1469 236',
      'M1653 60L1665 71',
      'M94 268L88 272',
      'M1671 98L1671 103',
      'M63 685L66 691',
      'M1039 817L1029 817',
      'M664 430L652 442',
      'M1457 249L1468 237',
      'M696 418L705 409',
      'M665 430L670 430',
      'M93 97L93 93',
      'M1737 680L1737 675',
      'M1672 111L1672 106',
      'M61 666L61 674',
      'M688 419L695 419',
      'M1670 89L1670 93',
      'M117 777L111 767',
      'M1738 689L1738 684',
      'M93 85L93 89',
      'M1739 697L1739 692',
    ],
  },
  mobile: {
    w: 853,
    h: 1844,
    main: [
      'M579 81L594 81',
      'M609 1745L596 1754L570 1762',
      'M610 1744L605 1710L518 1517L505 1465',
      'M489 691L508 709L684 822L725 835',
      'M576 82L561 82',
      'M265 925L272 965',
      'M751 1230L763 1210L767 1195L769 1121L766 1102L748 1079L742 1059',
      'M162 106L147 106',
      'M491 626L501 636L509 634',
      'M750 1231L725 1236L691 1257L527 1455L505 1465',
      'M527 84L541 84',
      'M75 165L72 285L78 313L87 322L93 336',
      'M528 638L570 492L591 482L605 448L717 314L734 303L748 299',
      'M164 105L508 86',
      'M524 85L510 85',
      'M769 1256L764 1242L751 1231',
      'M596 80L609 80',
      'M742 1058L767 1043L778 1008',
      'M787 251L770 615L755 787L748 812L726 835',
      'M611 80L625 79',
      'M748 1547L742 1623',
      'M513 521L508 562L494 588',
      'M769 1258L772 1272',
      'M423 694L428 663L448 610L468 595L493 589',
      'M773 120L775 177L767 212',
      'M709 782L714 773L754 306L750 299',
      'M424 695L488 691',
      'M218 956L228 937L240 930L264 925',
      'M544 83L559 83',
      'M423 696L415 709L363 849L349 862L279 903L270 912L265 924',
      'M488 490L470 486L459 479L362 389L124 339L94 337',
      'M130 1273L172 1276L370 1316L471 1446L482 1456L505 1465',
      'M217 957L184 967L143 994L127 998',
      'M489 491L499 512L513 520',
      'M514 520L525 509L527 480',
      'M490 626L484 648L488 690',
      'M379 1762L188 1762',
      'M127 998L121 992L104 990L84 975L80 961L66 401',
      'M127 998L119 1018L84 1043L78 1082L89 1233L106 1256L122 1263L129 1272',
      'M527 659L528 639',
      'M494 589L490 625',
      'M741 1058L273 966',
      'M778 988L776 897L768 872',
      'M708 782L687 777L532 677L527 660',
      'M527 480L549 450L740 227L749 219L767 212',
      'M527 480L498 484L490 490',
      'M767 871L734 851L726 836',
      'M218 957L228 964L259 968L271 966',
      'M70 412L70 402L66 401',
      'M527 638L510 634',
      'M611 1745L627 1753L654 1760L694 1761',
      'M84 1703L92 1326L96 1310L106 1297L122 1285L129 1273',
      'M93 338L76 353L65 386',
      'M749 298L761 263L759 252L763 242',
      'M767 212L780 225L787 245',
    ],
    fine: [
      'M761 1403L761 1411',
      'M703 74L711 74',
      'M741 1635L741 1625',
      'M772 1287L772 1283',
      'M65 390L66 401',
      'M695 75L683 75',
      'M759 1426L759 1434',
      'M753 1492L753 1501',
      'M737 1679L737 1673',
      'M758 1445L758 1437',
      'M765 1359L765 1367',
      'M738 1668L738 1661',
      'M763 1389L763 1381',
      'M768 1333L768 1329',
      'M749 1536L749 1545',
      'M735 1702L735 1696',
      'M723 1746L719 1750',
      'M630 78L640 78',
      'M754 1489L754 1481',
      'M659 77L648 77',
      'M769 1322L769 1317',
      'M760 1422L760 1415',
      'M752 1503L752 1512',
      'M766 1355L766 1350',
      'M389 1762L384 1762',
      'M733 1715L733 1724',
      'M755 1471L755 1478',
      'M771 1299L771 1294',
      'M665 76L672 76',
      'M132 107L137 107',
      'M514 657L526 660',
      'M751 1515L751 1523',
      'M509 633L512 622',
      'M760 96L753 92',
      'M756 1459L756 1467',
      'M764 1378L764 1370',
      'M767 1340L767 1344',
      'M750 1534L750 1526',
      'M710 787L709 783',
      'M736 1690L736 1682',
      'M762 1400L762 1393',
      'M91 1738L100 1747',
      'M734 1704L734 1713',
      'M770 1306L770 1310',
      'M740 1637L740 1646',
      'M739 1648L739 1657',
      'M757 1456L757 1449',
    ],
  },
};

const BASE_POSE: Record<string, Partial<SpringState>> = {
  'desktop-05a': { rx: 3.2, ry: -4.6, tz: 22 },
  'desktop-07b': { rx: -2.4, ry: 3.8, tz: 14 },
  'mobile-07a': { rx: 2.8, ry: -3.6, tz: 18 },
  'mobile-01b': { rx: -2, ry: 2.6, tz: 10 },
};

function jitter(seed: number) {
  const r = (n: number) => {
    const s = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  return {
    tx: (r(1) - 0.5) * 24,
    ty: (r(2) - 0.5) * 18,
    rot: (r(3) - 0.5) * 4.8,
  };
}

/* Highly Audible Realistic Broken Glass Touch & Edge Scrape Sound */
function playGlassHoverChime(ctx: AudioContext) {
  const now = ctx.currentTime;

  // 1. Crystal Glass Edge Ping / Delicate Clink
  const pingOsc = ctx.createOscillator();
  const pingGain = ctx.createGain();
  const baseFreq = 2600 + Math.random() * 1200; // 2.6kHz - 3.8kHz glass resonance

  pingOsc.type = 'sine';
  pingOsc.frequency.setValueAtTime(baseFreq, now);
  pingOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.96, now + 0.08);

  pingGain.gain.setValueAtTime(0.35, now);
  pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  pingOsc.connect(pingGain);
  pingGain.connect(ctx.destination);

  pingOsc.start(now);
  pingOsc.stop(now + 0.09);

  // 2. Secondary Harmonic Crystal Ping
  const ping2 = ctx.createOscillator();
  const ping2Gain = ctx.createGain();
  ping2.type = 'triangle';
  ping2.frequency.setValueAtTime(baseFreq * 1.5, now);
  ping2.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.06);

  ping2Gain.gain.setValueAtTime(0.18, now);
  ping2Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

  ping2.connect(ping2Gain);
  ping2Gain.connect(ctx.destination);

  ping2.start(now);
  ping2.stop(now + 0.06);

  // 3. Crisp Glass Friction & Edge Scratch
  const size = Math.floor(ctx.sampleRate * 0.04);
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / size) ** 2;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(5200, now);
  filter.Q.setValueAtTime(3.5, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.28, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(now);
}

/* Preload and auto-detect exact glass breaking impact offset */
let cachedShatterBuffer: AudioBuffer | null = null;
let shatterStartOffset = 0.22; // default exact impact start

async function initShatterAudioBuffer(ctx: AudioContext) {
  if (cachedShatterBuffer) return;
  try {
    const res = await fetch('/sounds/glass-shatter.webm');
    const arrayBuffer = await res.arrayBuffer();
    const decoded = await ctx.decodeAudioData(arrayBuffer);
    cachedShatterBuffer = decoded;

    // Scan for the exact loud glass impact peak (> 0.06 amplitude)
    const channelData = decoded.getChannelData(0);
    for (let i = 0; i < channelData.length; i++) {
      if (Math.abs(channelData[i]) > 0.06) {
        // start 10ms right before the impact
        const sampleIdx = Math.max(0, i - Math.floor(decoded.sampleRate * 0.01));
        shatterStartOffset = sampleIdx / decoded.sampleRate;
        break;
      }
    }
  } catch {
    // fallback
  }
}

function playUserGlassAudio(ctx?: AudioContext | null) {
  try {
    if (ctx && cachedShatterBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = cachedShatterBuffer;
      source.connect(ctx.destination);
      source.start(0, shatterStartOffset);
    } else {
      const a = new Audio('/sounds/glass-shatter.webm');
      a.currentTime = shatterStartOffset || 0.22;
      a.volume = 1.0;
      a.play().catch(() => {});
    }
  } catch {
    // ignore
  }
}

type SpringState = { rx: number; ry: number; tz: number; px: number; py: number; sc: number };

function baseOf(id: string, seed: number): SpringState {
  const r = (n: number) => {
    const s = Math.sin(seed * 91.7 + n * 269.5) * 43758.5453;
    return s - Math.floor(s);
  };
  return {
    rx: (r(1) - 0.5) * 8.5,
    ry: (r(2) - 0.5) * 9.5,
    tz: 20 + r(3) * 38,
    px: (r(4) - 0.5) * 8,
    py: (r(5) - 0.5) * 8,
    sc: 1,
    ...BASE_POSE[id],
  };
}

function toTransform(s: SpringState) {
  return (
    `translate3d(${s.px.toFixed(2)}px, ${s.py.toFixed(2)}px, ${s.tz.toFixed(2)}px)` +
    ` rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)` +
    ` scale(${s.sc.toFixed(4)})`
  );
}

export const BrokenByDesign: React.FC<BrokenByDesignProps> = ({
  assetsBase = 'https://cdn.jsdelivr.net/gh/gughigug/broken-by-design-assets@main',
  title = 'VIEW HARSH PORTFOLIO',
  onEnter,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const [portrait, setPortrait] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [ready, setReady] = useState(false);
  const [isShattered, setIsShattered] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 1/1)');
    const apply = () => setPortrait(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const pieces = portrait ? MOBILE : DESKTOP;
  const setKey = portrait ? 'mobile' : 'desktop';
  const cracks = CRACKS[setKey];
  const jitters = useMemo(() => pieces.map((_, i) => jitter(i + 1)), [pieces]);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    const urls = [
      `${assetsBase}/${ATLAS[setKey].url}`,
      `${assetsBase}/sound-on.png`,
      `${assetsBase}/sound-off.png`,
    ];
    const timeout = setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 2000);
    Promise.all(
      urls.map(
        (u) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = u;
          })
      )
    ).then(() => {
      if (!cancelled) {
        clearTimeout(timeout);
        setReady(true);
      }
    });

    // Initialize audio decoding and unlock AudioContext on first pointer activity
    try {
      audioRef.current ??= new AudioContext();
      initShatterAudioBuffer(audioRef.current);
    } catch {
      // ignore
    }

    const unlockAudio = () => {
      try {
        audioRef.current ??= new AudioContext();
        if (audioRef.current.state === 'suspended') {
          audioRef.current.resume().catch(() => {});
        }
      } catch {}
    };
    window.addEventListener('pointermove', unlockAudio, { once: true });
    window.addEventListener('pointerdown', unlockAudio, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      window.removeEventListener('pointermove', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
    };
  }, [assetsBase, setKey]);

  /* Cinematic Super Ultra Slow-Motion Shatter & Enter Handler (9.5s) */
  const handleShatter = () => {
    if (isShattered) return;
    setIsShattered(true);
    setScreenShake(true);
    setFlash(true);

    try {
      audioRef.current ??= new AudioContext();
      if (audioRef.current.state === 'suspended') audioRef.current.resume().catch(() => {});
      playUserGlassAudio(audioRef.current);
    } catch {
      playUserGlassAudio(null);
    }

    // Multi-Phase Super Ultra Slow-Motion 3D Glass Shatter with Giant Zooming Hero Shard
    const root = rootRef.current;
    if (root) {
      const shards = Array.from(root.querySelectorAll<HTMLElement>('[data-shard]'));
      const P = setKey === 'mobile' ? MOBILE : DESKTOP;
      shards.forEach((el, i) => {
        const p = P[i];
        const isHeroShard =
          (setKey === 'desktop' && (p.id === 'desktop-05b' || p.id === 'desktop-04a')) ||
          (setKey === 'mobile' && (p.id === 'mobile-04a' || p.id === 'mobile-02b'));

        const dx = p.cx - 50;
        const dy = p.cy - 50;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const randomRotX = (Math.random() - 0.5) * 450;
        const randomRotY = (Math.random() - 0.5) * 450;
        const randomRotZ = (Math.random() - 0.5) * 320;

        if (isHeroShard) {
          // HERO SHARD: Zooms directly into screen, expands huge across viewport, then dissolves into website
          el.style.zIndex = '999';
          el.animate(
            [
              {
                transform: el.style.transform,
                opacity: 1,
                filter: 'brightness(2.2) drop-shadow(0 0 35px #fbbf24)',
                offset: 0,
              },
              {
                transform: `translate3d(${-p.x * 0.4}vw, ${-p.y * 0.3}vh, 250px) rotateX(12deg) rotateY(-10deg) scale(2.2)`,
                opacity: 1,
                filter: 'brightness(2.4) drop-shadow(0 0 50px rgba(245, 158, 11, 0.9))',
                offset: 0.25,
              },
              {
                transform: `translate3d(${-p.x * 0.6}vw, ${-p.y * 0.5}vh, 580px) rotateX(6deg) rotateY(-5deg) scale(6.8)`,
                opacity: 0.95,
                filter: 'brightness(2.6) drop-shadow(0 0 80px rgba(56, 189, 248, 0.8))',
                offset: 0.62,
              },
              {
                transform: `translate3d(${-p.x * 0.8}vw, ${-p.y * 0.7}vh, 1100px) rotateX(20deg) rotateY(-12deg) scale(18)`,
                opacity: 0,
                filter: 'brightness(3.5) blur(20px)',
                offset: 1,
              },
            ],
            {
              duration: 8500, // 8.5s majestic slow motion hero zoom!
              easing: 'cubic-bezier(0.08, 0.9, 0.16, 1)',
              fill: 'forwards',
            }
          );
        } else {
          // SURROUNDING SHARDS: Float outward gracefully in zero-G
          el.animate(
            [
              {
                transform: el.style.transform,
                opacity: 1,
                filter: 'brightness(2.2) drop-shadow(0 0 35px #fbbf24)',
                offset: 0,
              },
              {
                transform: `translate3d(${ux * 120}px, ${uy * 120}px, 130px) rotateX(${randomRotX * 0.12}deg) rotateY(${randomRotY * 0.12}deg) scale(0.98)`,
                opacity: 1,
                filter: 'brightness(2.0) drop-shadow(0 0 25px rgba(245, 158, 11, 0.7))',
                offset: 0.15,
              },
              {
                transform: `translate3d(${ux * 360}px, ${uy * 360}px, 280px) rotateX(${randomRotX * 0.35}deg) rotateY(${randomRotY * 0.35}deg) scale(0.88)`,
                opacity: 0.92,
                filter: 'brightness(1.8)',
                offset: 0.45,
              },
              {
                transform: `translate3d(${ux * 750}px, ${uy * 750}px, 480px) rotateX(${randomRotX * 0.65}deg) rotateY(${randomRotY * 0.65}deg) scale(0.58)`,
                opacity: 0.78,
                filter: 'brightness(1.8)',
                offset: 0.75,
              },
              {
                transform: `translate3d(${ux * 1800}px, ${uy * 1800}px, 950px) rotateX(${randomRotX}deg) rotateY(${randomRotY}deg) rotateZ(${randomRotZ}deg) scale(0.04)`,
                opacity: 0,
                filter: 'brightness(3.0) blur(18px)',
                offset: 1,
              },
            ],
            {
              duration: 8500,
              easing: 'cubic-bezier(0.05, 0.9, 0.15, 1)',
              fill: 'forwards',
            }
          );
        }
      });
    }

    setTimeout(() => {
      setFlash(false);
      setScreenShake(false);
    }, 700);

    // Crossfade to main website as the giant shard expands past the camera
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 4800);
  };

  /* Portrait vs Landscape title node */
  const titleNode = portrait ? (
    <span className="bbd2-stack">
      {title.split(' ').map((w, i) => (
        <em key={i}>{w}</em>
      ))}
    </span>
  ) : (
    <span>{title}</span>
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return;

    const shards = Array.from(root.querySelectorAll<HTMLElement>('[data-shard]'));
    const P = setKey === 'mobile' ? MOBILE : DESKTOP;

    shards.forEach((el, i) => {
      el.style.transform = toTransform(baseOf(P[i].id, i + 1));
    });

    const cur: SpringState[] = shards.map((_, i) => baseOf(P[i].id, i + 1));
    const tgt: SpringState[] = shards.map((_, i) => baseOf(P[i].id, i + 1));
    const hovered = new Set<number>();

    let raf = 0;
    let running = false;
    let globalX = 0;
    let globalY = 0;

    const wake = () => {
      if (!running && !isShattered) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      if (isShattered) return;
      let alive = false;
      const k = 0.12;
      for (let i = 0; i < shards.length; i++) {
        const c = cur[i];
        const t = tgt[i];
        c.rx += (t.rx - c.rx) * k;
        c.ry += (t.ry - c.ry) * k;
        c.tz += (t.tz - c.tz) * k;
        c.px += (t.px - c.px) * k;
        c.py += (t.py - c.py) * k;
        c.sc += (t.sc - c.sc) * k;
        const d =
          Math.abs(t.rx - c.rx) +
          Math.abs(t.ry - c.ry) +
          Math.abs(t.tz - c.tz) +
          Math.abs(t.px - c.px) +
          Math.abs(t.py - c.py);
        if (d > 0.01) alive = true;
        shards[i].style.transform = toTransform(c);
      }
      if (alive) raf = requestAnimationFrame(tick);
      else running = false;
    };

    const setParallax = () => {
      for (let i = 0; i < shards.length; i++) {
        if (hovered.has(i)) continue;
        const b = baseOf(P[i].id, i + 1);
        const depth = 1 - P[i].ring * 0.32;
        tgt[i].px = b.px - globalX * 24 * depth;
        tgt[i].py = b.py - globalY * 18 * depth;
        tgt[i].rx = b.rx + globalY * 3.2 * depth;
        tgt[i].ry = b.ry - globalX * 4 * depth;
        tgt[i].tz = b.tz;
        tgt[i].sc = b.sc;
      }
    };

    const onRootMove = (e: PointerEvent) => {
      if (isShattered) return;
      const r = root.getBoundingClientRect();
      globalX = (e.clientX - r.left) / r.width - 0.5;
      globalY = (e.clientY - r.top) / r.height - 0.5;
      setParallax();
      wake();
    };

    const onRootLeave = () => {
      globalX = 0;
      globalY = 0;
      tgt.forEach((t, i) => {
        if (!hovered.has(i)) Object.assign(t, baseOf(P[i].id, i + 1));
      });
      wake();
    };

    root.addEventListener('pointermove', onRootMove);
    root.addEventListener('pointerleave', onRootLeave);

    shards.forEach((el, i) => {
      const onMove = (e: PointerEvent) => {
        if (isShattered) return;
        const r = el.getBoundingClientRect();
        const lx = (e.clientX - r.left) / r.width - 0.5;
        const ly = (e.clientY - r.top) / r.height - 0.5;
        const b = baseOf(P[i].id, i + 1);
        tgt[i].rx = b.rx - ly * 14;
        tgt[i].ry = b.ry + lx * 17;
        tgt[i].tz = b.tz + 92;
        tgt[i].sc = 1.035;
        el.style.setProperty('--mx', `${((lx + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${((ly + 0.5) * 100).toFixed(1)}%`);
        wake();
      };

      const onEnterHover = () => {
        if (isShattered) return;
        hovered.add(i);
        el.classList.add('bbd2-shard--hot');

        // Play audible crisp glass friction & chime tone on hover!
        if (soundOn) {
          try {
            audioRef.current ??= new AudioContext();
            const ctx = audioRef.current;
            if (ctx.state === 'suspended') ctx.resume().catch(() => {});
            playGlassHoverChime(ctx);
          } catch {
            /* ignore */
          }
        }
      };

      const onLeaveHover = () => {
        hovered.delete(i);
        el.classList.remove('bbd2-shard--hot');
        Object.assign(tgt[i], baseOf(P[i].id, i + 1));
        setParallax();
        wake();
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerenter', onEnterHover);
      el.addEventListener('pointerleave', onLeaveHover);
      el.addEventListener('click', handleShatter);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [setKey, ready, soundOn, isShattered]);

  return (
    <>
      <style>{BBD2_CSS}</style>
      <motion.section
        ref={rootRef}
        onClick={handleShatter}
        animate={
          screenShake
            ? {
                x: [-12, 12, -8, 8, -4, 4, 0],
                y: [8, -8, 6, -6, 2, -2, 0],
                scale: [1, 1.04, 0.98, 1],
              }
            : {}
        }
        transition={{ duration: 0.45 }}
        className={`bbd2 ${portrait ? 'bbd2--portrait' : ''} ${
          isShattered ? 'bbd2-shattered' : 'cursor-pointer'
        }`}
        aria-label={title}
      >
        {/* Violent Shatter White/Amber Flash */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-50 bg-gradient-to-tr from-amber-400 via-white to-cyan-300 pointer-events-none mix-blend-overlay"
            />
          )}
        </AnimatePresence>

        <div className="bbd2-bg" aria-hidden="true" />

        <div className="bbd2-stage">
          {ready && (
            <>
              {/* Exposed word in the gaps: transitions to ENTERING PORTFOLIO with infinite neon glow pulse */}
              <div className="bbd2-title bbd2-title--under" aria-hidden="true">
                {isShattered ? (
                  <motion.span
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{
                      scale: [1, 1.07, 0.98, 1.05, 1],
                      opacity: [0.9, 1, 0.85, 1, 0.9],
                      filter: [
                        'drop-shadow(0 0 20px rgba(245,158,11,0.8)) drop-shadow(0 0 40px rgba(245,158,11,0.5))',
                        'drop-shadow(0 0 45px rgba(245,158,11,1)) drop-shadow(0 0 80px rgba(56,189,248,0.9)) drop-shadow(0 0 120px rgba(245,158,11,0.8))',
                        'drop-shadow(0 0 25px rgba(245,158,11,0.8)) drop-shadow(0 0 50px rgba(56,189,248,0.6))',
                        'drop-shadow(0 0 50px rgba(245,158,11,1)) drop-shadow(0 0 90px rgba(245,158,11,0.9))',
                        'drop-shadow(0 0 20px rgba(245,158,11,0.8)) drop-shadow(0 0 40px rgba(245,158,11,0.5))',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="inline-block text-amber-300 font-black tracking-[0.16em] uppercase"
                    style={{
                      textShadow:
                        '0 0 20px #f59e0b, 0 0 45px #f59e0b, 0 0 75px #38bdf8',
                    }}
                  >
                    ENTERING PORTFOLIO...
                  </motion.span>
                ) : (
                  titleNode
                )}
              </div>

              {/* The fracture network lines */}
              <svg
                className="bbd2-cracks"
                viewBox={`0 0 ${cracks.w} ${cracks.h}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <g className="bbd2-cracks-glow">
                  {cracks.main.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>
                <g className="bbd2-cracks-line">
                  {cracks.main.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>
                <g className="bbd2-cracks-fine">
                  {cracks.fine.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>
              </svg>

              {/* Glass Shards Pane */}
              <div className="bbd2-pane" aria-hidden="true">
                {pieces.map((p, i) => {
                  const j = jitters[i];
                  const atlasUrl = `${assetsBase}/${ATLAS[setKey].url}`;
                  const sprite = spriteStyle(setKey, p.id);
                  return (
                    <div
                      key={p.id}
                      data-shard
                      className="bbd2-shard"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.w}%`,
                        height: `${p.h}%`,
                        zIndex: 10 + (2 - p.ring),
                      }}
                    >
                      <div
                        className="bbd2-inlay"
                        style={{
                          WebkitMaskImage: `url(${atlasUrl})`,
                          maskImage: `url(${atlasUrl})`,
                          WebkitMaskSize: sprite.backgroundSize,
                          maskSize: sprite.backgroundSize,
                          WebkitMaskPosition: sprite.backgroundPosition,
                          maskPosition: sprite.backgroundPosition,
                        }}
                      >
                        <div
                          className="bbd2-glassimg"
                          style={{
                            backgroundImage: `url(${atlasUrl})`,
                            backgroundSize: sprite.backgroundSize,
                            backgroundPosition: sprite.backgroundPosition,
                          }}
                        />
                        <div
                          className="bbd2-slice"
                          style={{
                            width: `${10000 / p.w}%`,
                            height: `${10000 / p.h}%`,
                            left: `${-(p.x / p.w) * 100}%`,
                            top: `${-(p.y / p.h) * 100}%`,
                            ['--jt' as string]: `translate(${j.tx.toFixed(1)}px, ${j.ty.toFixed(
                              1
                            )}px) rotate(${j.rot.toFixed(2)}deg)`,
                          }}
                        >
                          {titleNode}
                        </div>
                        <div className="bbd2-specular" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Sound Toggle */}
        <button
          type="button"
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all pointer-events-auto"
          aria-label="Toggle Sound"
          onClick={(e) => {
            e.stopPropagation();
            setSoundOn(!soundOn);
          }}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
        </button>
      </motion.section>
    </>
  );
};

export default BrokenByDesign;
