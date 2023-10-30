import { act, render, fireEvent, screen, waitFor } from '@testing-library/react';
import InputFile from './InputFile';

describe('InputFile Component', () => {
  let file: File;
  const filenameOne = 'investorMachine.png';

  beforeEach(() => {
    file = new File(['A File'], filenameOne, { type: 'image/png' });
  });

  const getInputFile = () => screen.getByTestId('im-input-file') as HTMLInputElement & { files: FileList };

  test('It should render correctly, be able to load a file and exclude the file but clicking clear button', () => {
    const { getByTestId } = render(<InputFile />);
    const inputFile = getInputFile();

    act(() => {
      fireEvent.change(inputFile, {
        target: { files: [file] },
      });
    });

    waitFor(() => {});

    const loadedInputFile = getInputFile();

    expect(loadedInputFile.files[0].name).toBe(filenameOne);
    expect(loadedInputFile.files.length).toBe(1);

    const clearButton = getByTestId('im-file-clear');
    act(() => {
      fireEvent.click(clearButton);
    });
    waitFor(() => {});

    const clearedInputFile = getInputFile();
    expect(clearedInputFile.files?.length ?? 0).toBe(0);
  });
});
