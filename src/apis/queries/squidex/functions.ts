import { ServicesEndpointsConfigs } from '../../../configs';
import Constants from '../../../utils/constants/Constants';
import { DataHelper, DateTimeHelper, LetterCaseHelper } from '../../../utils/helpers';
import { VimeoVideosThumbnailsResponse } from '../../services/vimeo-services/Vimeo.services.types';
import { Detail, DirectMail, FormattedTraining, HotSheets, MemoizedMappedTraining, SkipTracing } from './types';
import i18next from 'i18next';
import { FAQDataResponse, SquidexFile, SquidexLink, TrainingData } from '../../services/squidex-services/Squidex.services.types';

const { filterMap } = DataHelper;
const { formatDate } = DateTimeHelper;
const { camelToTitleCase } = LetterCaseHelper;
const { vimeo } = ServicesEndpointsConfigs;
const { NOT_NUMBER } = Constants.REGEX;

export const getFAQSearchContent = (data: FAQDataResponse) => {
  let searchContent = data.question;

  data.answer.forEach((field) => {
    if (field.schemaName === 'paragraph') {
      searchContent += ` ${field.text.toLowerCase()}`;
    }

    if (field.schemaName === 'link') {
      searchContent += ` ${field.text.toLowerCase()}`;
    }

    if (field.schemaName === 'image') {
      searchContent += ` ${field.caption.toLowerCase()}`;
    }

    if (field.schemaName === 'video') {
      searchContent += ` ${field.name.toLowerCase()}`;
    }

    if (field.schemaName === 'title') {
      searchContent += ` ${field.title.toLowerCase()}`;
    }

    if (field.schemaName === 'file') {
      searchContent += ` ${field.displayname.toLowerCase()}`;
    }
  });

  return searchContent;
};

export const formatDirectMail = (directMail: DirectMail) => {
  const { lastModified, data: serviceData } = directMail ?? {
    lastModified: '',
    data: { description: '', details: [], name: ' ', products: { products: [], addons: [] } },
  };
  const { description, details, name, products } = serviceData;
  const { addons, products: serviceProducts } = products;

  return {
    lastModified,
    description,
    details: details?.map((detail: Detail) => detail.detail),
    name,
    addons,
    products: serviceProducts,
  };
};

export const formatSkipTracing = (skipTracing: SkipTracing) => {
  const { lastModified, data: serviceData } = skipTracing ?? {
    lastModified: '',
    data: { description: '', details: [], name: ' ', products: {} },
  };
  const { description, details, name, products } = serviceData;

  return {
    lastModified,
    description,
    details: details?.map((detail: Detail) => detail.detail),
    name,
    products: Array.isArray(products) ? products : [products],
  };
};

export const formatHotSheets = (hotSheets: HotSheets) => {
  const { lastModified, data: serviceData } = hotSheets ?? {
    lastModified: '',
    data: { description: '', details: [], name: ' ', products: {} },
  };
  const { description, details, name, products } = serviceData;

  const mappedProducts = filterMap(
    Object.keys(products),
    (item) => !item.startsWith('schema'),
    (item) => ({
      column1: camelToTitleCase(item) + i18next.t('Pages.Content.Products.HotSheetsComponent.AllLevels'),
      column2: products[item as keyof typeof products],
    })
  );

  return {
    lastModified,
    description,
    details: details?.map((detail: Detail) => detail.detail),
    name,
    products: mappedProducts,
  };
};

export const formatTraining = (videoData: TrainingData, videoId: string) => {
  const { name, trainingLevel, date, resources, description, stageIndex, ...rest } = videoData ?? {};
  return {
    videoId,
    name,
    trainingLevel,
    description: description ?? '',
    date: new Date(date),
    resources: resources ?? [],
    formattedDate: formatDate(date, { ignoreClientTimeZone: true, format: 'onlyDate' }),
    files: (resources?.filter((resource) => resource.schemaName === 'file') ?? []) as SquidexFile[],
    links: (resources?.filter((resource) => resource.schemaName === 'link') ?? []) as SquidexLink[],
    stageIndex,
    ...rest,
    video: vimeo.iframe + videoId,
  };
};

export const formatToVideosAndVideosId = (videos?: TrainingData[]) =>
  videos?.reduce(
    (accumulator, current) => {
      const currentVideoId = current.video.replace(NOT_NUMBER, '');
      accumulator.videosIds.push(currentVideoId);
      accumulator.videos.push(formatTraining(current, currentVideoId));
      return accumulator;
    },
    {
      videos: [],
      videosIds: [],
    } as MemoizedMappedTraining
  ) ?? { videos: [], videosIds: [] };

export const insertThumbnailToTraining = (videos?: FormattedTraining[], videosThumbs?: VimeoVideosThumbnailsResponse) =>
  videos?.map((video) => ({
    ...video,
    thumbnail: videosThumbs?.[video.videoId as keyof typeof videosThumbs] ?? '',
  }));
