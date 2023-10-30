import styled from 'styled-components';
import { StyledImageDialogProps } from './ImageDialog.types';

const StyledImageDialog = styled.div<StyledImageDialogProps>`
  width: 100%;

  .im-dialog-image-tag {
    width: ${(props) => props.width};
    display: ${(props) => props.isLoading && 'none'};
  }
`;

export default StyledImageDialog;
