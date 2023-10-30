import { WithPrefix } from '../../../types';

type SquidexItem = {
  created: string;
  createdBy: string;
  editToken: string;
  id: string;
  isDeleted: boolean;
  lastModified: string;
  lastModifiedBy: string;
  schemaDisplayName: string;
  schemaId: string;
  schemaName: string;
  status: string;
  statusColor: string;
  version: number;
};

export type SquidexVendorsResponse = {
  items: SquidexItem &
    {
      data: {
        description: string;
        logo: string[];
        name: string;
        order: number;
        url: WithPrefix<'http'>;
      };
    }[];
};

export type SquidexServicesResponse = {
  items: SquidexItem &
    {
      data: {
        description: string;
        details: { detail: string }[];
        name: 'Direct Mail' | 'Hot Sheets (New Leads)' | 'Skip Tracing';
        order: number;
        products: {
          monthlyCost: string;
          ongoingCost: string;
          schemaId: string;
          schemaName: string;
        };
      };
    }[];
};

export type SquidexParagraph = {
  schemaId: string;
  schemaName: 'paragraph';
  text: string;
};

export type SquidexRichText = {
  richtext: string;
  schemaId: string;
  schemaName: 'richtext';
};

export type SquidexImage = {
  caption: string;
  image: string[];
  schemaId: string;
  schemaName: 'image';
};

export type SquidexTitle = {
  title: string;
  schemaId: string;
  schemaName: 'title';
};

export type SquidexVideo = {
  name: string;
  link: string;
  schemaId: string;
  schemaName: 'video';
};

export type SquidexFile = {
  file: string[];
  displayname: string;
  schemaId: string;
  schemaName: 'file';
};

export type SquidexLink = {
  schemaId: string;
  schemaName: 'link';
  text: string;
  url: WithPrefix<'http'>;
};

export type SquidexPlaybook = {
  book: SquidexFile;
  schemaId: string;
  schemaName: 'playbook';
  thumbnail: [string];
  title: string;
};

export type FAQCategory = 'Billing' | 'List Management' | 'Direct Mail' | 'Skip Trace' | 'Hot Sheets' | 'Dates and Deadlines';

export type SquidexField =
  | SquidexParagraph
  | SquidexImage
  | SquidexFile
  | SquidexLink
  | SquidexTitle
  | SquidexVideo
  | SquidexRichText
  | SquidexPlaybook;

export type FAQDataResponse = {
  answer: SquidexField[];
  category: FAQCategory;
  question: string;
};

export type SquidexFAQsResponse = {
  items: SquidexItem &
    {
      data: FAQDataResponse;
      schemaDisplayName: 'faq';
      id: string;
      lastModified: string;
    }[];
};

export type TrainingData = {
  date: string;
  description?: string;
  name: string;
  resources: (SquidexFile | SquidexLink)[];
  trainingLevel: string;
  video: string;
  schemaId: string;
  schemaName: 'training';
  stageIndex?: number;
};

export type Training = SquidexItem & {
  data: TrainingData;
  schemaDisplayName: 'training';
};

export type TrainingsResponse = {
  items: Training[];
};

export type TrainingSessionsResponse = {
  items: SquidexItem &
    {
      data: {
        datefrom: string;
        dateto: string;
        description: string;
        image: string[];
        name: string;
        stages: {
          image: string[];
          name: string;
          schemaId: string;
          schemaName: 'trainingstage';
          showText: false;
          videos: Training[];
        }[];
        trainingLevel: string;
      };
      schemaDisplayName: 'trainingsession';
      id: string;
      lastModified: string;
    }[];
};

type SquidexClause = {
  sections: (SquidexImage | SquidexRichText)[];
  title: string;
  schemaId: string;
  schemaName: 'clause';
};

export type TermsAndConditionsResponse = {
  items: SquidexItem &
    {
      data: {
        clauses: SquidexClause[];
      };
    }[];
};

export type SignatureSolutionTrainingSession = {
  schemaId: string;
  category: 'primary' | 'additional';
  schemaName: 'siganturesolutionsession';
  fullWidth: boolean;
  signaturesolutiontrainings: (TrainingData | SquidexPlaybook)[];
  thumbnail: [string];
  title: string;
};

export type SignatureSolutionData = {
  sessions: SignatureSolutionTrainingSession[];
  title: string;
  description: string;
  icon: [string];
  order: number;
  fullWidth: boolean;
};

export type SquidexSignatureSolutionResponse = {
  total: number;
  statuses: unknown[];
  items: SquidexItem &
    {
      schemaName: 'signaturesolution';
      data: SignatureSolutionData;
    }[];
};

export type PrimaryTraining = SignatureSolutionTrainingSession & { category: 'primary' };
export type AdditionalTraining = SignatureSolutionTrainingSession & { category: 'additional' };

export type MappedSignatureSolutionData = SignatureSolutionData & {
  primaryTraining: PrimaryTraining[];
  additionalTraining: AdditionalTraining[];
};
