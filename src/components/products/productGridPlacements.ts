/** Lưới 3×4 — 12 item theo thứ tự hàng, kích thước desktop từ mockup */
export type ProductGridSlot = {
  /** Index trong mảng products.items */
  itemIndex: number;
  col: 1 | 2 | 3;
  row: 1 | 2 | 3 | 4;
  width: number;
  height: number;
};

export const PRODUCT_GRID_GAP_PX = 2;

export const PRODUCT_TILE_STANDARD_W = 175;
export const PRODUCT_TILE_STANDARD_H = 135;
export const PRODUCT_TILE_TALL_H = 185;
export const PRODUCT_TILE_WIDE_W = 260;

/** Thứ tự 1→12: Intro, Cubes↑, HGT, Loin, Portion, Roll→, Skewered, Steak, Semi, Untrim, Welltrim, Belly→ */
export const PRODUCT_GRID_SLOTS: ProductGridSlot[] = [
  { itemIndex: 0, col: 1, row: 1, width: 175, height: 135 },
  { itemIndex: 4, col: 2, row: 1, width: 175, height: 185 },
  { itemIndex: 8, col: 3, row: 1, width: 175, height: 135 },
  { itemIndex: 1, col: 1, row: 2, width: 175, height: 135 },
  { itemIndex: 5, col: 2, row: 2, width: 175, height: 135 },
  { itemIndex: 9, col: 3, row: 2, width: 260, height: 135 },
  { itemIndex: 2, col: 1, row: 3, width: 175, height: 135 },
  { itemIndex: 6, col: 2, row: 3, width: 175, height: 135 },
  { itemIndex: 10, col: 3, row: 3, width: 175, height: 135 },
  { itemIndex: 3, col: 1, row: 4, width: 175, height: 135 },
  { itemIndex: 7, col: 2, row: 4, width: 175, height: 135 },
  { itemIndex: 11, col: 3, row: 4, width: 260, height: 135 },
];

const gap = PRODUCT_GRID_GAP_PX;
const stdW = PRODUCT_TILE_STANDARD_W;
const stdH = PRODUCT_TILE_STANDARD_H;
const tallOverflow = PRODUCT_TILE_TALL_H - PRODUCT_TILE_STANDARD_H;

function colLeft(col: number) {
  return (col - 1) * (stdW + gap);
}

function rowTop(row: number) {
  const row1Base = tallOverflow;
  if (row === 1) return row1Base;
  return row1Base + stdH + gap + (row - 2) * (stdH + gap);
}

export function getProductGridSlotStyle(slot: ProductGridSlot): {
  left: number;
  top: number;
  width: number;
  height: number;
} {
  const left = colLeft(slot.col);
  let top = rowTop(slot.row);

  if (slot.height === PRODUCT_TILE_TALL_H) {
    top = rowTop(1) - tallOverflow;
  }

  return { left, top, width: slot.width, height: slot.height };
}

export const PRODUCT_GRID_WIDTH_PX =
  stdW + gap + stdW + gap + PRODUCT_TILE_WIDE_W;

export const PRODUCT_GRID_HEIGHT_PX =
  tallOverflow + stdH + gap + (stdH + gap) * 2 + stdH;

/** Mobile 2 cột zigzag: cột 1 = item lẻ (1,3,5…), cột 2 = item chẵn (2,4,6…) */
export function splitMobileZigzagColumns(slots: ProductGridSlot[]) {
  return {
    col1: slots.filter((_, i) => i % 2 === 0),
    col2: slots.filter((_, i) => i % 2 === 1),
  };
}

export function getMobileTileAspect(slot: ProductGridSlot): string {
  if (slot.height === PRODUCT_TILE_TALL_H) return "175/185";
  return "175/135";
}
