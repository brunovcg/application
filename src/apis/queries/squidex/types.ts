import { FAQCategory, SquidexField, SquidexFile, SquidexLink } from '../../services/squidex-services/Squidex.services.types';

export type Detail = { detail: string };

type DirectMailAddon = {
  image?: string[];
  name: string;
  priceRange1: number;
  priceRange2: number;
  priceRange3: number;
  priceRange4: number;
  schemaId: string;
  schemaName: string;
};

type DirectMailProduct = {
  image?: string[];
  name: string;
  priceRange1: number;
  priceRange2: number;
  priceRange3: number;
  priceRange4: number;
  schemaId: string;
  schemaName: string;
};

type HotSheetProduct = {
  monthlyCost: string;
  ongoingCost: string;
  schemaId: string;
  schemaName: string;
};

type HotSheetProducts = HotSheetProduct | HotSheetProduct[];

type SkipTracingProduct = {
  corporateOwned: number;
  premiumSkipTracing: number;
  schemaId: string;
  schemaName: string;
  withEmailAddresses: number;
  withoutEmailAddresses: number;
};

type SkipTracingProducts = SkipTracingProduct | SkipTracingProduct[];

type DirectMailName = 'Direct Mail';

type HotSheetsName = 'Hot Sheets (New Leads)';

type SkipTracingName = 'Skip Tracing';

export type DirectMail = {
  lastModified: string;
  data: {
    description: string;
    details: Detail[];
    name: DirectMailName;
    order: number;
    products: {
      addons: DirectMailAddon[];
      products: DirectMailProduct[];
      schemaId: string;
      schemaName: string;
    };
  };
};

export type HotSheets = {
  lastModified: string;
  data: {
    description: string;
    details: Detail[];
    name: HotSheetsName;
    order: number;
    products: HotSheetProducts;
  };
};

export type SkipTracing = {
  lastModified: string;
  data: {
    description: string;
    details: Detail[];
    name: HotSheetsName;
    order: number;
    products: SkipTracingProducts;
  };
};

export type ServiceNames = DirectMailName | HotSheetsName | SkipTracingName;

export type SessionResponseStageVideo = {
  date: string;
  description?: string;
  name: string;
  resources: (SquidexLink | SquidexFile)[];
  schemaId: string;
  schemaName: 'training';
  trainingLevel: string;
  video: string;
};

export type SessionResponseStage = {
  image: string[];
  name: string;
  schemaId: string;
  schemaName: string;
  showText: false;
  videos: SessionResponseStageVideo[];
};

export type SessionResponseData = {
  date: Date;
  datefrom: Date;
  dateto: Date;
  description: string;
  image: string[];
  name: string;
  stages: SessionResponseStage[];
  trainingLevel: string;
};

export type MappedSession = Omit<SessionResponseData, 'stages' | 'datefrom' | 'dateto'> & {
  id: string;
  index: number;
  videosStats: {
    daysCount: number;
    videosCount: number;
  };
  stages: (SessionResponseStage & { image: string; index: number })[];
  image: string;
  dateFrom: Date;
  dateTo: Date;
  formattedDateFrom: string;
  formattedDateTo: string;
};

export type MappedSquidexField = SquidexField & {
  id: string;
};

export type FAQData = {
  answer: MappedSquidexField[];
  category: FAQCategory;
  question: string;
};

export type FAQ = FAQData & {
  modified: string;
  id: string;
  content: string;
};

export type ListFaqs = FAQ[];

export type ListFaqsByCategory = {
  name: FAQCategory;
  questions: ListFaqs;
}[];

export type MappedFaqs = { list: ListFaqs; listByCategory: ListFaqsByCategory; categories: FAQCategory[] };

export type FormattedTraining = {
  schemaName: 'training';
  videoId: string;
  name: string;
  trainingLevel: string;
  description: string;
  date: Date;
  resources: (SquidexFile | SquidexLink)[];
  formattedDate: string;
  video: string;
  files: SquidexFile[];
  links: SquidexLink[];
  stageIndex?: number;
};

export type TrainingWithThumbnail = FormattedTraining & {
  thumbnail: string;
};

export type MemoizedMappedTraining = { videos: FormattedTraining[]; videosIds: string[] };

export type MappedTrainingVideoWithIndex = {
  stageIndex: number;
  date: string;
  description?: string;
  name: string;
  resources: (SquidexFile | SquidexLink)[];
  schemaId: string;
  schemaName: 'training';
  trainingLevel: string;
  video: string;
};

export type UseSignatureSolutionQueryProps = {
  isReady: boolean;
};
