/* eslint-disable no-await-in-loop */
import { GridType, Speed, TileType } from '../../types';
import { horizontalDivision, verticalDivision } from '.';

export default async function recursiveDivision(
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  row: number,
  col: number,
  height: number,
  width: number,
  isDark: boolean,
  setDisabled: (disabled: boolean) => void,
  speed: Speed
) {
  if (height <= 1 || width <= 1) {
    return;
  }

  if (height > width) {
    await horizontalDivision(
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      isDark,
      setDisabled,
      speed
    );
  } else {
    await verticalDivision(
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      isDark,
      setDisabled,
      speed
    );
  }
}
