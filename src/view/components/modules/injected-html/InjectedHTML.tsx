import DOMPurify from 'dompurify';
import { forwardRef } from 'react';
import { InjectedHTMLProps, InjectedHTMLRef } from './InjectedHTML.types';
import { ClassNameHelper } from '../../../../utils/helpers';

DOMPurify.addHook('afterSanitizeAttributes', function (node) {
  if ('target' in node) {
    node.setAttribute('target', '_blank');
  }
  if (!node.hasAttribute('target') && (node.hasAttribute('xlink:href') || node.hasAttribute('href'))) {
    node.setAttribute('xlink:show', 'new');
  }
});

function InsertedHtml({ html, className, onClick }: InjectedHTMLProps, ref?: InjectedHTMLRef) {
  const classes = ClassNameHelper.conditional({ ['im-injected-html']: true, [String(className)]: !!className });

  return (
    <span
      style={{ cursor: onClick ? 'pointer' : 'auto' }}
      onClick={onClick}
      className={classes}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}

export default forwardRef(InsertedHtml);
