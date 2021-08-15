import { viewport } from './viewport';

export const screen = {
  width: window.screen.width * viewport.pixelRatio,
  height: window.screen.height * viewport.pixelRatio,
  orientation: window.screen?.orientation?.type
};
