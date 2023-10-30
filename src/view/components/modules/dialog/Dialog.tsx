import { StyledDialog, StyledDialogButton } from './Dialog.styled';
import { useTranslation } from 'react-i18next';
import { DialogProps } from './Dialog.types';
import { ButtonIcon, Button, Popover } from '../..';
import { useOnClickOutside, useDevice } from '../../../../utils/hooks';
import { useContext, useMemo, useRef } from 'react';
import { ClassNameHelper, DataHelper } from '../../../../utils/helpers';
import { DialogsContext } from '../../../../contexts/modules/dialogs/DialogsContext';

const { filterMap } = DataHelper;

export default function Dialog({
  content,
  title,
  buttons,
  width,
  height,
  closeOnOutsideClick,
  defaultCloseIcon = true,
  defaultCloseButton = true,
  maxHeight,
  minHeight,
  maxWidth,
  minWidth,
  useButtonsPortal,
  dialogId,
  onCancel,
}: DialogProps) {
  const containerRef = useRef(null);

  const { closeDialog, dialogSubscriptions } = useContext(DialogsContext);

  const currentDialog = dialogSubscriptions[`${dialogId}`];

  const handleCloseDialog = () => {
    onCancel?.();
    closeDialog(dialogId);
  };

  const { t } = useTranslation();

  useOnClickOutside(containerRef, handleCloseDialog, !!closeOnOutsideClick);

  const { isMobile } = useDevice();

  const buttonClasses = ClassNameHelper.conditional({
    ['im-dialog-buttons']: true,
    ['im-mobile-dialog-buttons']: isMobile,
  });

  const hasButtons = !!buttons || defaultCloseButton;

  const buttonsPortal = `im-buttons-portal-${dialogId}`;

  const handleAddedButtons =
    buttons &&
    filterMap(
      buttons,
      (button) => !button.hide && button.show !== false,
      (button) => {
        Reflect.deleteProperty(button, 'hide');
        return <Button key={button.text as string} {...button} usePortal={useButtonsPortal ? buttonsPortal : undefined} />;
      }
    );

  const buttonsRenderer = (
    <StyledDialogButton className="im-dialog-buttons-wrapper">
      {hasButtons && (
        <div className={buttonClasses}>
          <div id={buttonsPortal} className="im-dialog-buttons-portal" />
          {handleAddedButtons}
          {defaultCloseButton && (
            <Button
              icon="cancel"
              text={t('Common.Close')}
              onClick={handleCloseDialog}
              variant="error"
              width={isMobile ? '100%' : undefined}
            />
          )}
        </div>
      )}
    </StyledDialogButton>
  );

  const buttonsHandler = useMemo(() => {
    if (isMobile && hasButtons) {
      return <Popover trigger={<Button text={t('Common.Actions')} icon="menu" flexGrow />} content={buttonsRenderer} skidding={0} />;
    }

    return buttonsRenderer;
  }, [isMobile, buttonsRenderer, hasButtons]);

  const dialogContainer = (
    <>
      <div className="im-dialog-content">{content}</div>
      {defaultCloseIcon && (
        <div className="im-dialog-close-icon">
          <ButtonIcon icon="close" onClick={handleCloseDialog} />
        </div>
      )}
      {buttonsHandler}
    </>
  );

  return (
    <StyledDialog
      className={`im-dialog ${dialogId}`}
      width={width}
      height={height}
      maxHeight={maxHeight}
      minHeight={minHeight}
      maxWidth={maxWidth}
      minWidth={minWidth}
      zIndex={currentDialog.zIndex}
      hasTitle={!!title}
      open
    >
      <div className="im-dialog-container" ref={containerRef}>
        {title && <div className="im-dialog-title">{title}</div>}
        {dialogContainer}
      </div>
    </StyledDialog>
  );
}
