import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Container, LoadingSpinner, MessageContainer, Title, Dialog } from '../../components';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../utils/hooks';
import { CustomerPreferencesFormData } from '../../pages/dashboard/modules/buy-box/modules/preferences-form/CustomerPreferencesForm.types';
import { CategoriesWeightMapped, CategoriesWeightTypes } from '../../../apis/queries/user/types';
import StyledCustomerPreferencesSubmissionDialog from './CustomerPreferencesSubmissionDialog.styled';
import ZipCodeChanges from './zip-code-changes/ZipCodeChanges';
import TypeOfOwnerChanges from './type-of-owner-changes/TypeOfOwnerChanges';
import LTVChanges from './ltv-changes/LTVChanges';
import YearsOfOwnershipChanges from './years-of-ownership-changes/YearsOfOwnershipChanges';
import PropertyAgeChanges from './property-age-changes/PropertyAgeChanges';
import WeightsChanges from './weight-changes/WeightsChanges';
import MotivationsChanges from './motivations-changes/MotivationsChanges';
import PropertyTypeChanges from './property-type-changes/PropertyTypeChanges';
import { DialogButtons } from '../../components/modules/dialog/Dialog.types';
import { CustomerPreferencesSubmissionDialogProps, SubmissionState } from './CustomerPreferencesSubmissionDialog.types';
import { UserServices } from '../../../apis/services';
import { CustomerPreferenceSubmissionPayload } from '../../../apis/services/user-services/User.services.types';
import { useQueryClient } from 'react-query';
import Constants from '../../../utils/constants/Constants';
import { DialogsContext } from '../../../contexts/modules/dialogs/DialogsContext';
import { UserSessionContext } from '../../../contexts/modules/user-session/UserSessionContext';

const { CUSTOMER_PREFERENCE_FOR_COUNTY } = Constants.QUERIES;

export default function CustomerPreferencesSubmissionDialog(props: CustomerPreferencesSubmissionDialogProps) {
  const {
    categoriesWeight,
    formatFormData,
    singleFamilyRef,
    multiFamilyRef,
    condoRef,
    commercialRef,
    othersRef,
    landRef,
    county,
    customerUsername,
    formRef,
    customerRef,
    ltvRef,
    motivationsRef,
    propertyAgeRef,
    typeOfOwnerRef,
    weightsRef,
    yrsOwnedRef,
    zipCodeRef,
  } = props;

  const [submission, setSubmission] = useState<SubmissionState>(null);
  const queryClient = useQueryClient();
  const { getValues } = formRef.current ?? {};
  const { t } = useTranslation();
  const path = useTranslationPath('Dialogs.CustomerPreferencesSubmissionDialog');
  const [formData, setFormData] = useState<CustomerPreferencesFormData>({} as CustomerPreferencesFormData);
  const [formChangesLoaded, setFormChangesLoaded] = useState(false);
  const { closeDialog, openDialog } = useContext(DialogsContext);
  const { sessionUser } = useContext(UserSessionContext);

  const handleSubmit = (data: CustomerPreferencesFormData) => {
    const payload = formatFormData(data);
    payload.motivationPriorities = payload.motivationPriorities.map((item) => ({ ...item, priority: item.priority / 100 }));
    setSubmission('loading');

    const submitFunction = sessionUser.isCustomer ? UserServices.updateCustomerOwnPreferences : UserServices.submitCustomerPreferences;

    submitFunction(payload as CustomerPreferenceSubmissionPayload)
      .then(async () => {
        await queryClient.refetchQueries(`${CUSTOMER_PREFERENCE_FOR_COUNTY}-${customerUsername}-${county?.id}`);
        setSubmission('success');
      })
      .catch(() => setSubmission('error'));
  };

  const openApplyToOthersDialog = () => {
    closeDialog('CustomerPreferencesSubmissionDialog');
    openDialog({ id: 'ApplyPreferencesToOthersDialog', props: { county, customerUsername, formatFormData, formRef, customerRef } });
  };

  const checkCategoriesWeight = useCallback(
    (initialCategoriesState: CategoriesWeightMapped, currentCategoriesState: CategoriesWeightMapped) => {
      const categoriesList = Object.keys(initialCategoriesState);

      const changes: { category: CategoriesWeightTypes; priority: number; initialPriority: number }[] = [];

      categoriesList.forEach((category) => {
        const initialPriority = initialCategoriesState[category as keyof typeof initialCategoriesState];
        const priority = currentCategoriesState[category as keyof typeof currentCategoriesState];

        if (initialPriority !== priority && !!priority) {
          changes.push({ category: category as CategoriesWeightTypes, priority, initialPriority });
        }
      });

      return changes;
    },
    []
  );

  const formDataChanges = useMemo(() => {
    const formattedData = formatFormData(formData);

    return {
      livingAreaPrioritiesChanges: formattedData.livingAreaPriorities.filter(
        (item) => item.livingArea !== item.initialValue || item.priority !== item.initialPriority
      ),
      zipCodePrioritiesChanges: formattedData.zipCodePriorities.filter((item) => item.priority !== item.initialPriority),
      motivationPrioritiesChanges: formattedData.motivationPriorities.filter((item) => item.priority !== item.initialPriority),
      totalValuePrioritiesChanges: formattedData.totalValuePriorities.filter(
        (item) => item.totalValue !== item.initialValue || item.priority !== item.initialPriority
      ),
      lotSizePrioritiesChanges: formattedData.lotSizePriorities.filter(
        (item) => item.lotSize !== item.initialValue || item.priority !== item.initialPriority
      ),
      ltvPrioritiesChanges: formattedData.ltvPriorities.filter((item) => item.priority !== item.initialPriority),
      ownerTypePrioritiesChanges: formattedData.ownerTypePriorities.filter((item) => item.priority !== item.initialPriority),
      propertyTypePrioritiesChanges: formattedData.propertyTypePriorities.filter((item) => item.priority !== item.initialPriority),
      yearsOldPrioritiesChanges: formattedData.yearsOldPriorities.filter((item) => item.priority !== item.initialPriority),
      yrsOwnedPrioritiesChanges: formattedData.yrsOwnedPriorities.filter((item) => item.priority !== item.initialPriority),
      categoriesWeightChanges: checkCategoriesWeight(categoriesWeight, formattedData.categoriesWeight),
    };
  }, [formData]);

  const {
    zipCodePrioritiesChanges,
    ownerTypePrioritiesChanges,
    ltvPrioritiesChanges,
    yrsOwnedPrioritiesChanges,
    yearsOldPrioritiesChanges,
    categoriesWeightChanges,
    motivationPrioritiesChanges,
    propertyTypePrioritiesChanges,
    lotSizePrioritiesChanges,
    livingAreaPrioritiesChanges,
    totalValuePrioritiesChanges,
  } = formDataChanges;

  const [zipCodeChanges, setZipCodeChanges] = useState(zipCodePrioritiesChanges);
  const [typeOfOwnerChanges, setTypeOfOwnerChanges] = useState(ownerTypePrioritiesChanges);
  const [ltvChanges, setLtvChanges] = useState(ltvPrioritiesChanges);
  const [yearsOwnedChanges, setYearsOwnedChangesChanges] = useState(yrsOwnedPrioritiesChanges);
  const [propertyAgeChanges, setPropertyAgeChanges] = useState(yearsOldPrioritiesChanges);
  const [propertyTypeChanges, setPropertyTypeChanges] = useState(propertyTypePrioritiesChanges);
  const [lotSizeChanges, setLotSizeChanges] = useState(lotSizePrioritiesChanges);
  const [livingAreaChanges, setLivingAreaChanges] = useState(livingAreaPrioritiesChanges);
  const [totalValueChanges, setTotalValueChanges] = useState(totalValuePrioritiesChanges);
  const [weightChanges, setWeightChanges] = useState(categoriesWeightChanges);
  const [motivationsChanges, setMotivationsChanges] = useState(motivationPrioritiesChanges);

  const commonPropertyTypeProps = {
    propertyTypeChanges,
    setPropertyTypeChanges,
    lotSizeChanges,
    setLotSizeChanges,
    livingAreaChanges,
    setLivingAreaChanges,
    totalValueChanges,
    setTotalValueChanges,
  };

  const hasChanges =
    zipCodeChanges.length +
      typeOfOwnerChanges.length +
      ltvChanges.length +
      yearsOwnedChanges.length +
      propertyAgeChanges.length +
      propertyTypeChanges.length +
      lotSizeChanges.length +
      livingAreaChanges.length +
      totalValueChanges.length +
      weightChanges.length +
      motivationsChanges.length >
    0;

  useEffect(() => {
    setZipCodeChanges(zipCodePrioritiesChanges);
    setTypeOfOwnerChanges(ownerTypePrioritiesChanges);
    setLtvChanges(ltvPrioritiesChanges);
    setYearsOwnedChangesChanges(yrsOwnedPrioritiesChanges);
    setPropertyAgeChanges(yearsOldPrioritiesChanges);
    setPropertyTypeChanges(propertyTypePrioritiesChanges);
    setLotSizeChanges(lotSizePrioritiesChanges);
    setLivingAreaChanges(livingAreaPrioritiesChanges);
    setTotalValueChanges(totalValuePrioritiesChanges);
    setWeightChanges(categoriesWeightChanges);
    setMotivationsChanges(motivationPrioritiesChanges);
  }, [formDataChanges]);

  const renderer = () => {
    if (!formChangesLoaded) {
      return (
        <div className="im-loading">
          <LoadingSpinner message />
        </div>
      );
    }

    if (submission === 'loading') {
      return (
        <div className="im-loading">
          <LoadingSpinner message={t(path('Applying'))} />
        </div>
      );
    }
    if (submission === 'error') {
      return <MessageContainer text={t('HTTP.Errors.NetworkError')} variant="error" fontSize="large" />;
    }

    if (submission === 'success') {
      return (
        <div className="im-applied-changes">
          <MessageContainer text={t(path('ChangesApplied'))} variant="valid" fontSize="medium" />
          <MessageContainer
            width="fit-content"
            text={<Title text={t(path('ApplyUpdatedToOtherCounties'), { countyName: county.stateCounty })} />}
            variant="info"
          />
        </div>
      );
    }

    if (!hasChanges) {
      return (
        <div className="im-no-changes">
          <MessageContainer text={t(path('NoChanges'))} variant="warning" fontSize="medium" />
          <MessageContainer
            width="fit-content"
            text={<Title text={t(path('ApplyCurrentToOtherCounties'), { countyName: county.stateCounty })} />}
            variant="info"
          />
        </div>
      );
    }

    return (
      <div className="im-changes-container">
        <MessageContainer text={t(path('ReviewChanges'))} width="100%" variant="info" fontSize="medium" />
        <ZipCodeChanges zipCodeChanges={zipCodeChanges} setZipCodeChanges={setZipCodeChanges} zipCodeRef={zipCodeRef} />
        <TypeOfOwnerChanges
          typeOfOwnerChanges={typeOfOwnerChanges}
          setTypeOfOwnerChanges={setTypeOfOwnerChanges}
          typeOfOwnerRef={typeOfOwnerRef}
        />
        <LTVChanges ltvChanges={ltvChanges} setLtvChanges={setLtvChanges} ltvRef={ltvRef} />
        <YearsOfOwnershipChanges
          yearsOwnedChanges={yearsOwnedChanges}
          setYearsOwnedChangesChanges={setYearsOwnedChangesChanges}
          yrsOwnedRef={yrsOwnedRef}
        />
        <PropertyAgeChanges
          propertyAgeChanges={propertyAgeChanges}
          setPropertyAgeChanges={setPropertyAgeChanges}
          propertyAgeRef={propertyAgeRef}
        />
        <PropertyTypeChanges type="sfh" typeRef={singleFamilyRef} {...commonPropertyTypeProps} />
        <PropertyTypeChanges type="units" typeRef={multiFamilyRef} {...commonPropertyTypeProps} />
        <PropertyTypeChanges type="condo" typeRef={condoRef} {...commonPropertyTypeProps} />
        <PropertyTypeChanges type="commercial" typeRef={commercialRef} {...commonPropertyTypeProps} />
        <PropertyTypeChanges type="land" typeRef={landRef} {...commonPropertyTypeProps} />
        <PropertyTypeChanges type="others" typeRef={othersRef} {...commonPropertyTypeProps} />
        <WeightsChanges weightChanges={weightChanges} setWeightChanges={setWeightChanges} weightsRef={weightsRef} />
        <MotivationsChanges
          motivationsChanges={motivationsChanges}
          setMotivationsChanges={setMotivationsChanges}
          motivationsRef={motivationsRef}
        />
      </div>
    );
  };

  useEffect(() => {
    setFormData(() => getValues?.() as CustomerPreferencesFormData);

    const loader = setTimeout(() => {
      setFormChangesLoaded(true);
    }, 500);

    return () => clearTimeout(loader);
  }, []);

  const content = (
    <StyledCustomerPreferencesSubmissionDialog>
      <Container className="im-customer-preferences-dialog-content" width="100%">
        {renderer()}
      </Container>
    </StyledCustomerPreferencesSubmissionDialog>
  );

  const buttons: DialogButtons = [
    {
      show: submission === 'success' || (!hasChanges && formChangesLoaded),
      icon: 'copy',
      text: t(path('CopyPreferences'), { countyName: county.stateCounty }),
      onClick: openApplyToOthersDialog,
      variant: 'primary',
    },
    {
      show: submission === 'success',
      icon: 'done',
      text: t('Common.Done'),
      onClick: () => {
        closeDialog('CustomerPreferencesSubmissionDialog');
        customerRef.current?.clearSelector();
      },
      variant: 'valid',
    },
    {
      show: hasChanges && formChangesLoaded && submission === null,
      type: 'submit',
      text: t(path('Apply')),
      icon: 'done',
      onClick: () => handleSubmit(getValues?.() as CustomerPreferencesFormData),
    },
    {
      show: formChangesLoaded && submission === null,
      icon: 'undo',
      text: t('Common.Back'),
      onClick: () => closeDialog('CustomerPreferencesSubmissionDialog'),
      variant: 'error',
    },
  ];

  return (
    <Dialog
      dialogId="CustomerPreferencesSubmissionDialog"
      content={content}
      title={t(path('Title'))}
      width="700px"
      minHeight="432px"
      closeOnOutsideClick={false}
      defaultCloseButton={false}
      buttons={buttons}
      useButtonsPortal
    />
  );
}
