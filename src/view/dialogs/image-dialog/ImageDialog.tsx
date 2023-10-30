import { useState } from 'react';
import { UserFeedback, Dialog } from '../../components';
import StyledImageDialog from './ImageDialog.styled';
import { ImageDialogProps } from './ImageDialog.types';

export default function ImageDialog(args: ImageDialogProps) {
  const [isLoading, setIsLoading] = useState(true);

  const content = (
    <StyledImageDialog className="im-dialog-image" width={args.width} isLoading={isLoading}>
      <img className="im-dialog-image-tag" src={args.src} alt={args.alt} onLoad={() => setIsLoading(false)} />
      {isLoading && <UserFeedback variant="loading" width={args.width} />}
    </StyledImageDialog>
  );

  return <Dialog dialogId="ImageDialog" content={content} defaultCloseIcon={false} closeOnOutsideClick={false} width={args.width} />;
}
