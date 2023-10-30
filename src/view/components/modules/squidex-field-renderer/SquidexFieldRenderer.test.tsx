import { render } from '@testing-library/react';
import SquidexFieldRenderer from './SquidexFieldRenderer';
import { MappedSquidexField } from '../../../../apis/queries/squidex/types';

const fileField = {
  id: '234234',
  displayname: 'file name',
  schemaId: '34298237423',
  schemaName: 'file',
  file: ['http://mock.com'],
} as MappedSquidexField;

const imageField = {
  id: '234234',
  caption: 'this is a caption',
  image: ['http:mock.com'],
  schemaId: '34298237423',
  schemaName: 'image',
} as MappedSquidexField;

const paragraphField = {
  id: '234234',
  text: 'this is a paragraph',
  schemaId: '34298237423',
  schemaName: 'paragraph',
} as MappedSquidexField;

const richtextField = {
  id: '234234',
  richtext: '<section><article>This is a richtext</article></section>',
  schemaId: '34298237423',
  schemaName: 'richtext',
} as MappedSquidexField;

const linkField = {
  id: '234234',
  text: 'this is a link',
  url: 'http://www.mock.com',
  schemaId: '34298237423',
  schemaName: 'link',
} as MappedSquidexField;

const titleField = {
  id: '234234',
  title: 'this is a title',
  schemaId: '34298237423',
  schemaName: 'title',
} as MappedSquidexField;

const videoField = {
  id: '234234',
  name: 'im video',
  link: '/00000',
  schemaId: '34298237423',
  schemaName: 'video',
} as MappedSquidexField;

describe('SquidexFieldRenderer Component', () => {
  test('It should render SquidexFileField correctly', () => {
    const { getByText } = render(<SquidexFieldRenderer field={fileField} />);
    const squidexFileField = getByText(/file name/i);
    expect(squidexFileField).toBeInTheDocument();
  });

  test('It should render SquidexImageField correctly', () => {
    const { getByAltText } = render(<SquidexFieldRenderer field={imageField} />);
    const squidexImageField = getByAltText('this is a caption');
    expect(squidexImageField).toBeInTheDocument();
  });
  test('It should render SquidexParagraphField correctly', () => {
    const { getByText } = render(<SquidexFieldRenderer field={paragraphField} />);
    const squidexParagraphField = getByText(/this is a paragraph/i);
    expect(squidexParagraphField).toBeInTheDocument();
  });
  test('It should render SquidexRichtextField correctly', () => {
    const { getByText } = render(<SquidexFieldRenderer field={richtextField} />);
    const richtextString = getByText(/this is a richtext/i);
    expect(richtextString).toBeInTheDocument();

    const section = document.querySelector('section');
    const article = document.querySelector('article');

    expect(section).toBeInTheDocument();
    expect(article).toBeInTheDocument();
  });
  test('It should render SquidexLinkField correctly', () => {
    const { getByText } = render(<SquidexFieldRenderer field={linkField} />);
    const linkText = getByText(/this is a link/i);
    expect(linkText).toBeInTheDocument();
    const anchor = document.querySelector('a');
    expect(anchor).toBeInTheDocument();
  });
  test('It should render SquidexTitleField correctly', () => {
    const { getByText } = render(<SquidexFieldRenderer field={titleField} />);
    const squidexTitle = getByText(/this is a title/i);
    expect(squidexTitle).toBeInTheDocument();
  });
  test('It should render SquidexVideoField correctly', () => {
    render(<SquidexFieldRenderer field={videoField} />);
    const video = document.getElementsByClassName('im-video')[0];
    expect(video).toBeInTheDocument();
  });
});
