import { AXES } from 'constants/editor';
import { getScreenSize } from 'tools/editor';

import menu from 'store/menu';
import editor from 'store/editor';

import { getDefaultTransform } from 'components/Editor/menu/edit/transform';

export const files2DataUri = files =>
  Promise.all(files.map(file2DataUri)) as Promise<string[]>;

export async function file2DataUri(file: File): Promise<string[]> {
  return new Promise(resolve => {
    const fr = new FileReader();
    fr.onload = e => resolve(e.target.result);
    fr.readAsDataURL(file);
  });
}

function getImageInitials(url, delta) {
  return new Promise(resolve => {
    const img = new Image();

    img.setAttribute('src', url);
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const canvasSize = getScreenSize();
      const transform = getDefaultTransform();
      const style = {};

      // shift positioning when adding multiple images at once to make it more visible
      transform.translate[AXES.X] += delta;
      transform.translate[AXES.Y] += delta;
      transform.translate[AXES.Z] += delta;

      if (width > canvasSize || height > canvasSize) {
        // adjust img to be smaller than canvas size, to prevent rendering artefacts
        const scale = canvasSize / Math.max(height, width);

        style.width = width * scale;
        style.height = height * scale;
      }

      resolve({ transform, style });
    };
  });
}

// rotate canvas to make bunch of images more visible
// function rotateCanvas() {
//   const canvasRotate = editor.canvasProps.transform.rotate;
//   const canvasNotRotated = Object.values(canvasRotate).every(v => v === 0);

//   if (canvasNotRotated) {
//     canvasRotate[AXES.X] = 300;
//     canvasRotate[AXES.Y] = 60;
//   }
// }

const TRANSLATE_DELTA = 10; // px

async function addImage(url: string, i: number) {
  const props = await getImageInitials(url, TRANSLATE_DELTA * i);
  editor.add('image', { value: url, ...props });
}

export async function addImages(fileUrls: string[]) {
  fileUrls.forEach(addImage);

  menu.setState(['edit', 'value']);

  // if (fileUrls.length > 1) rotateCanvas();
}
