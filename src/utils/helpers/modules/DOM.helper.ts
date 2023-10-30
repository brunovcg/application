import { WithPrefix } from '../../../types';

abstract class DOMHelper {
  static windowNextZIndex() {
    return (
      Math.max(
        ...Array.from(document.querySelectorAll('body *'), (el) => parseFloat(window.getComputedStyle(el).zIndex)).filter(
          (zIndex) => !Number.isNaN(zIndex)
        ),
        0
      ) + 1
    );
  }

  static downloadFile(args: { file: File | Blob; filename: string }) {
    const aElement = document.createElement('a');
    aElement.setAttribute('download', args.filename);
    const href = URL.createObjectURL(args.file);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
  }

  static openLink(link: WithPrefix<'http'>, mode: 'newTab' | 'redirect' = 'newTab') {
    const aElement = document.createElement('a');
    aElement.href = link;
    if (mode === 'newTab') {
      aElement.setAttribute('target', '_blank');
    }

    aElement.click();
  }
}

export default DOMHelper;
