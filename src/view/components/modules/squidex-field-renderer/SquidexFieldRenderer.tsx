import { Button, Icon, InjectedHTML, Text, Title, Video } from '../..';
import { StyledSquidexFieldRenderer } from './SquidexFieldRenderer.styled';
import { SquidexFieldRendererProps } from './SquidexFieldRenderer.types';
import { ServicesEndpointsConfigs } from '../../../../configs';
import Constants from '../../../../utils/constants/Constants';
import { useContext, useMemo, useState } from 'react';
import { SquidexFile } from '../../../../apis/services/squidex-services/Squidex.services.types';
import { SquidexServices } from '../../../../apis/services';
import { DialogsContext } from '../../../../contexts/modules/dialogs/DialogsContext';

const { squidex, vimeo } = ServicesEndpointsConfigs;
const { NOT_NUMBER } = Constants.REGEX;

const SquidexFileField = ({ field }: { field: SquidexFile }) => {
  const [loadingFile, setLoadingFile] = useState(false);

  return (
    <Button
      icon="fileDownload"
      loading={loadingFile}
      text={field.displayname}
      styling="outlined"
      onClick={async () => {
        setLoadingFile(true);
        SquidexServices.downloadAsset(field.file[0], () => setLoadingFile(false));
      }}
      textNoWrap
      className="im-squidex-field-file"
    />
  );
};

export default function SquidexFieldRenderer({ field }: SquidexFieldRendererProps) {
  const { openDialog } = useContext(DialogsContext);

  const openZoomedImage = (imageLink: string, imageCaption: string) => {
    openDialog({
      id: 'ImageDialog',
      props: {
        src: imageLink,
        alt: imageCaption,
        width: '70vw',
      },
    });
  };

  const decodeField = useMemo(() => {
    const { schemaName } = field;

    switch (schemaName) {
      case 'image': {
        const { image, caption } = field;

        const imageLink = `${squidex.baseURL}/${squidex.assets}/${image[0]}`;

        return (
          <div className="im-squidex-field-image">
            <span onClick={() => openZoomedImage(imageLink, caption)}>
              <img src={imageLink} alt={field.caption} />
            </span>
          </div>
        );
      }

      case 'paragraph': {
        return <Text text={field.text} className="im-squidex-field-paragraph" />;
      }
      case 'title': {
        return <Title text={field.title} className="im-squidex-field-title" />;
      }
      case 'playbook': {
        return <div className="im-squidex-field-playbook">{field.title}</div>;
      }
      case 'video': {
        return (
          <div className="im-squidex-field-video">
            <Video src={vimeo.iframe + field.link.replace(NOT_NUMBER, '')} title={field.name} />
          </div>
        );
      }
      case 'link': {
        return (
          <div className="im-squidex-field-link">
            <Icon icon="link" />
            <a href={field.url}>{field.text}</a>
          </div>
        );
      }
      case 'file': {
        return <SquidexFileField field={field} />;
      }

      case 'richtext': {
        return (
          <div className="im-squidex-field-richtext">
            <InjectedHTML html={field.richtext} />
          </div>
        );
      }

      default: {
        return null;
      }
    }
  }, []);

  return <StyledSquidexFieldRenderer className="im-squidex-field">{decodeField}</StyledSquidexFieldRenderer>;
}
