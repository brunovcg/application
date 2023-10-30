import { Container, MessageContainer, Dialog } from '../../components';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';

export default function ConfirmationDialog({ text, title, buttons }: { text: string; title: string; buttons: DialogButtons }) {
  const content = (
    <Container width="100%">
      <MessageContainer text={text} variant="valid" fontSize="medium" />
    </Container>
  );

  return <Dialog dialogId="ConfirmationDialog" content={content} title={title} width="400px" buttons={buttons} />;
}
