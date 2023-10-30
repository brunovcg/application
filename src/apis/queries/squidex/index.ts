import { useQuery } from 'react-query';
import { VimeoServices, SquidexServices } from '../../services';
import Constants from '../../../utils/constants/Constants';
import { useCallback, useContext, useMemo } from 'react';
import {
  DirectMail,
  HotSheets,
  ListFaqs,
  ListFaqsByCategory,
  MappedFaqs,
  MappedTrainingVideoWithIndex,
  MemoizedMappedTraining,
  ServiceNames,
  SkipTracing,
} from './types';
import { ServicesEndpointsConfigs } from '../../../configs';
import { DateTimeHelper } from '../../../utils/helpers';
import {
  formatDirectMail,
  formatHotSheets,
  formatSkipTracing,
  formatToVideosAndVideosId,
  getFAQSearchContent,
  insertThumbnailToTraining,
} from './functions';
import {
  AdditionalTraining,
  FAQCategory,
  MappedSignatureSolutionData,
  PrimaryTraining,
  SignatureSolutionTrainingSession,
  SquidexPlaybook,
  TrainingData,
} from '../../services/squidex-services/Squidex.services.types';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';

const { QUERIES } = Constants;
const { LIST_VENDORS, LIST_SERVICES, LIST_TRAININGS, LIST_TRAINING_SESSIONS, LIST_FAQS, TERMS_AND_CONDITIONS, SIGNATURE_SOLUTION } =
  QUERIES;

const { formatDate } = DateTimeHelper;

const { squidex } = ServicesEndpointsConfigs;

const useListVendorsQuery = () => {
  const { data, isLoading } = useQuery(LIST_VENDORS, SquidexServices.listVendors, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const mappedVendors = useMemo(
    () =>
      data?.items
        ?.sort((current, next) => current.data.order - next.data.order)
        ?.map((item) => ({
          ...item.data,
          logo: `${squidex.baseURL}/${squidex.assets}/${item?.data?.logo}`,
        })) ?? [],
    [data]
  );

  return { vendors: mappedVendors, vendorsIsLoading: isLoading };
};

const useListServicesQuery = () => {
  const { data, isLoading } = useQuery(LIST_SERVICES, SquidexServices.listServices, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const findService = useCallback((service: ServiceNames) => data?.items?.find((item) => item.data.name === service), [data?.items]);

  const mappedServices = useMemo(
    () => ({
      directMail: formatDirectMail(findService('Direct Mail') as unknown as DirectMail),
      hotSheets: formatHotSheets(findService('Hot Sheets (New Leads)') as HotSheets),
      skipTracing: formatSkipTracing(findService('Skip Tracing') as unknown as SkipTracing),
    }),
    [findService]
  );

  return { services: mappedServices, servicesIsLoading: isLoading };
};

const useListVideosThumbnailsQuery = (videosIds: string[], queryId: string) => {
  const { data, isLoading } = useQuery(`LIST_VIMEO_VIDEOS_THUMBNAILS-${queryId}`, () => VimeoServices.getThumbnails(videosIds), {
    enabled: !!videosIds?.length,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { videosThumbs: data, videosThumbsIsLoading: isLoading };
};

const useListTrainingSessions = () => {
  const { data, isLoading } = useQuery(LIST_TRAINING_SESSIONS, SquidexServices.listTrainingSessions, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const mappedTrainingSessionsResponse = useMemo(
    () =>
      data?.items
        .map((session, index) => {
          const { id, data: sessionData } = session;
          const { name, stages, trainingLevel, description, image, datefrom, dateto } = sessionData ?? {};
          return {
            id: id,
            index,
            name,
            stages: stages.map((stage, stageIndex) => ({
              ...stage,
              index: stageIndex,
              image: `${squidex.baseURL}/${squidex.assets}/${stage.image[0]}`,
            })),
            trainingLevel,
            description: description ?? '',
            dateFrom: new Date(datefrom),
            dateTo: dateto ? new Date(dateto) : null,
            image: `${squidex.baseURL}/${squidex.assets}/${image[0]}`,
            formattedDateTo: dateto ? formatDate(dateto, { ignoreClientTimeZone: true, format: 'onlyDate' }) : null,
            formattedDateFrom: formatDate(datefrom, { ignoreClientTimeZone: true, format: 'onlyDate' }),
            videosStats: stages.reduce(
              (accumulator, next) => {
                accumulator.daysCount++;
                next.videos.forEach(() => {
                  accumulator.videosCount++;
                });

                return accumulator;
              },
              { daysCount: 0, videosCount: 0 }
            ),
          };
        })
        .sort((current, next) => Number(next.dateFrom) - Number(current.dateFrom)),
    [data]
  );

  return { trainingSessions: mappedTrainingSessionsResponse ?? [], trainingSessionsIsLoading: isLoading };
};

const useListTrainingsQuery = () => {
  const { data, isLoading } = useQuery(LIST_TRAININGS, SquidexServices.listTrainings, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const memoizedMappedTraining = useMemo(
    () => formatToVideosAndVideosId(data?.items.map((item) => item.data)),
    [data]
  ) as MemoizedMappedTraining;

  const { videosThumbs, videosThumbsIsLoading } = useListVideosThumbnailsQuery(memoizedMappedTraining?.videosIds, 'training');

  const videosWithThumbnail = useMemo(
    () => insertThumbnailToTraining(memoizedMappedTraining?.videos, videosThumbs)?.sort((a, b) => Number(b.date) - Number(a.date)),
    [videosThumbs]
  );
  return { trainings: videosWithThumbnail ?? [], trainingsIsLoading: isLoading || videosThumbsIsLoading };
};

const useTrainingSessionsStages = (videos: MappedTrainingVideoWithIndex[], queryId: string) => {
  const memoizedMappedTraining = useMemo(() => formatToVideosAndVideosId(videos), [videos.length]);

  const { videosThumbs, videosThumbsIsLoading } = useListVideosThumbnailsQuery(memoizedMappedTraining?.videosIds, queryId);

  const videosWithThumbnail = useMemo(() => insertThumbnailToTraining(memoizedMappedTraining?.videos, videosThumbs), [videosThumbs]);

  return { trainings: videosWithThumbnail, trainingsIsLoading: videosThumbsIsLoading };
};

const useFAQsQuery = () => {
  const { data, isLoading } = useQuery(LIST_FAQS, SquidexServices.listFAQ, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const mappedFaqs = useMemo(() => {
    const categoriesIndexes = {} as { [key in FAQCategory]: number };
    let currentIndex = 0;
    return data?.items?.reduce(
      (accumulator: MappedFaqs, current) => {
        const mappedCurrentQuestion = {
          id: current.id,
          modified: current.lastModified,
          content: getFAQSearchContent(current.data),
          ...current.data,
          answer: current.data.answer.map((field, index) => ({ ...field, id: `${field.schemaName}-${index}` })),
        };
        accumulator.list.push(mappedCurrentQuestion);

        const currentCategory = current.data.category;

        if (!(currentCategory in categoriesIndexes)) {
          categoriesIndexes[`${currentCategory}`] = currentIndex;
          accumulator.categories.push(currentCategory);
          currentIndex++;
        }

        if (!accumulator.listByCategory[Number(categoriesIndexes[`${currentCategory}`])]) {
          accumulator.listByCategory.push({ name: currentCategory, questions: [mappedCurrentQuestion] });
        } else {
          accumulator.listByCategory[Number(categoriesIndexes[`${currentCategory}`])].questions.push(mappedCurrentQuestion);
        }

        return accumulator;
      },
      {
        list: [] as ListFaqs,
        listByCategory: [] as ListFaqsByCategory,
        categories: [] as FAQCategory[],
      }
    );
  }, [data]);

  return { faqs: mappedFaqs ?? { list: [], listByCategory: [], categories: [] }, faqsIsLoading: isLoading };
};

const useSignatureSolutionQuery = () => {
  const { sessionUser } = useContext(UserSessionContext);

  const { data, isLoading } = useQuery(SIGNATURE_SOLUTION, SquidexServices.getSignatureSolution, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!sessionUser.squidexJwt,
  });

  const mappedItems = useMemo(
    () =>
      data?.items?.reduce((acc, current) => {
        const primary = [] as PrimaryTraining[];
        const additional = [] as AdditionalTraining[];

        current.data.sessions.forEach((session) => {
          if (session.category === 'primary') {
            primary.push(session as PrimaryTraining);
            return;
          }
          if (session.category === 'additional') {
            additional.push(session as AdditionalTraining);
          }
        });

        acc[current.data.order - 1] = { ...current.data, primaryTraining: primary, additionalTraining: additional };

        return acc;
      }, [] as MappedSignatureSolutionData[]),
    [data]
  );

  const signatureSolutionLoading = isLoading || !mappedItems?.length;

  return { signatureSolution: mappedItems, signatureSolutionLoading };
};

const useSignatureSolutionSessionQuery = (session?: SignatureSolutionTrainingSession) => {
  const mappedSession = session?.signaturesolutiontrainings.reduce(
    (acc, current) => {
      if (current.schemaName === 'training') {
        acc.videos.push(current);
      }
      if (current.schemaName === 'playbook') {
        acc.playbook.push(current as SquidexPlaybook);
      }

      return acc;
    },
    { videos: [], playbook: [] } as { videos: TrainingData[]; playbook: SquidexPlaybook[] }
  );

  const memoizedMappedVideos = useMemo(() => {
    if (!mappedSession) {
      return { videos: [], videosIds: [] };
    }

    return formatToVideosAndVideosId(mappedSession.videos as unknown as TrainingData[]);
  }, [mappedSession?.videos.length]);

  const { videosThumbs, videosThumbsIsLoading } = useListVideosThumbnailsQuery(
    memoizedMappedVideos?.videosIds,
    `${session?.title}-${session?.title}`
  );

  const mappedSessionWithVideoThumbnails = useMemo(() => {
    if (!mappedSession) {
      return [];
    }

    return [
      ...mappedSession.playbook,
      ...memoizedMappedVideos.videos.map((videoData) => ({ ...videoData, thumbnail: videosThumbs?.[videoData.videoId] })),
    ];
  }, [videosThumbs]);

  if (!mappedSession) {
    return { mappedSession: [], sessionIsLoading: true };
  }

  return { mappedSession: mappedSessionWithVideoThumbnails, sessionIsLoading: videosThumbsIsLoading };
};

const useTermsAndConditionsQuery = () => {
  const { data, isLoading } = useQuery(TERMS_AND_CONDITIONS, SquidexServices.getTermsAndConditions, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mappedData = data?.items[0].data.clauses.map((item, index) => ({
    clause: { ...item, sections: item.sections.map((section, sectionIndex) => ({ ...section, id: String(sectionIndex) })) },
    id: index,
  }));

  return { terms: mappedData, termsIsLoading: isLoading };
};

export default {
  useListVendorsQuery,
  useListServicesQuery,
  useListTrainingsQuery,
  useListTrainingSessions,
  useTrainingSessionsStages,
  useFAQsQuery,
  useTermsAndConditionsQuery,
  useSignatureSolutionQuery,
  useSignatureSolutionSessionQuery,
};
