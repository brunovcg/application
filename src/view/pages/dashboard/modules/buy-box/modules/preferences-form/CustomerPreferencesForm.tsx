import { Button, Form, Section } from '../../../../../../components';
import CustomerCounty from './modules/customer-county/CustomerCounty';
import StyledCustomerPreferencesForm from './CustomerPreferencesForm.styled';
import ZipCode from './modules/zip-code/ZipCode';
import TypeOfOwner from './modules/type-of-owner/TypeOfOwner';
import LTV from './modules/ltv/LTV';
import PropertyAge from './modules/property-age/PropertyAge';
import YearsOfOwnership from './modules/years-of-ownership/YearsOfOwnership';
import Weights from './modules/weights/Weights';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../../../utils/hooks';
import MotivationsPreferences from './modules/motivations-preferences/MotivationsPreferences';
import { useContext, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { userQueries } from '../../../../../../../apis/queries';
import { DataHelper } from '../../../../../../../utils/helpers';
import TypeOfProperty from './modules/type-of-property/TypeOfProperty';
import CustomerPreferencesInfo from './modules/customer-preferences-info/CustomerPreferencesInfo';
import schema from './CustomerPreferencesForm.schema';
import { CustomerPreferencesFormData } from './CustomerPreferencesForm.types';
import { ZipCodeRef } from './modules/zip-code/ZipCode.types';
import { TypeOfOwnerRef } from './modules/type-of-owner/TypeOfOwner.types';
import { LTVRef } from './modules/ltv/LTV.types';
import { YrsOwnedRef } from './modules/years-of-ownership/YearsOfOwnership.types';
import { PropertyAgeRef } from './modules/property-age/PropertyAge.types';
import { MotivationsPreferencesRef } from './modules/motivations-preferences/MotivationsPreferences.types';
import { WeightsRef } from './modules/weights/Weights.types';
import { PropertyTypeRef } from './modules/type-of-property/TypeOfProperty.types';
import { OriginalCountyByCustomer } from '../../../../../../../apis/queries/counties/types';
import { CategoriesWeightMapped } from '../../../../../../../apis/queries/user/types';
import Feedback from './modules/feedback/Feedback';
import { FormRef } from '../../../../../../components/modules/form-group/form/Form.types';
import { CustomerPreferencesSubmissionDialogProps } from '../../../../../../dialogs/customer-preferences-submission-dialog/CustomerPreferencesSubmissionDialog.types';
import { SelectorRef } from '../../../../../../components/modules/form-group/selector/Selector.types';
import useCustomerPreferencesFormPermissions from './CustomerPreferencesForm.permissions';
import { UserSessionContext } from '../../../../../../../contexts/modules/user-session/UserSessionContext';
import { DialogsContext } from '../../../../../../../contexts/modules/dialogs/DialogsContext';

const { useGetCustomerPreferenceForCountyQuery } = userQueries;
const { isEmptyObject } = DataHelper;

export default function CustomerPreferencesForm() {
  const { sessionUser } = useContext(UserSessionContext);

  const [formIsReady, setFormIsReady] = useState(false);
  const [validWeightSum, setValidWeightSum] = useState(false);
  const [customerUsername, setCustomerUsername] = useState('');
  const [county, setCounty] = useState<OriginalCountyByCustomer>({} as OriginalCountyByCustomer);
  const { openDialog } = useContext(DialogsContext);
  const customerRef = useRef<SelectorRef>(null);
  const permit = useCustomerPreferencesFormPermissions();

  const { t } = useTranslation();
  const formRef = useRef<FormRef>(null);

  const path = useTranslationPath('Pages.Dashboard.BuyBox');

  const { userPreferencesForCounty, userPreferencesForCountyIsLoading } = useGetCustomerPreferenceForCountyQuery(
    customerUsername,
    county?.id
  );

  const zipCodeRef = useRef<ZipCodeRef>(null);
  const typeOfOwnerRef = useRef<TypeOfOwnerRef>(null);
  const ltvRef = useRef<LTVRef>(null);
  const yrsOwnedRef = useRef<YrsOwnedRef>(null);
  const propertyAgeRef = useRef<PropertyAgeRef>(null);
  const weightsRef = useRef<WeightsRef>(null);
  const motivationsRef = useRef<MotivationsPreferencesRef>(null);
  const singleFamilyRef = useRef<PropertyTypeRef>(null);
  const multiFamilyRef = useRef<PropertyTypeRef>(null);
  const condoRef = useRef<PropertyTypeRef>(null);
  const commercialRef = useRef<PropertyTypeRef>(null);
  const landRef = useRef<PropertyTypeRef>(null);
  const othersRef = useRef<PropertyTypeRef>(null);

  const {
    ownerTypePriorities,
    yrsOwnedPriorities,
    ltvPriorities,
    yearsOldPriorities,
    propertyTypePriorities,
    categoriesWeight,
    zipCodePriorities,
    motivationPriorities,
    totalValuePriorities,
    livingAreaPriorities,
    lotSizePriorities,
    lastUpdated,
  } = userPreferencesForCounty ?? {};

  const formatFormData = useCallback(
    (data: CustomerPreferencesFormData, countyId?: string) => ({
      countyId: countyId ?? String(county?.id),
      username: customerUsername,
      step: 'all',
      categoriesWeight: data?.categoriesWeight ?? [],
      livingAreaPriorities: Object.values(data?.livingAreaPriorities ?? []).flat(),
      lotSizePriorities: Object.values(data?.lotSizePriorities ?? []).flat(),
      ltvPriorities: Object.values(data?.ltvPriorities ?? []),
      motivationPriorities: data?.motivationPriorities ?? [],
      ownerTypePriorities: Object.values(data?.ownerTypePriorities ?? []).flat(),
      propertyTypePriorities: Object.values(data?.propertyTypePriorities ?? []).flat(),
      totalValuePriorities: Object.values(data?.totalValuePriorities ?? []).flat(),
      yearsOldPriorities: Object.values(data?.yearsOldPriorities ?? []).flat(),
      yrsOwnedPriorities: Object.values(data?.yrsOwnedPriorities ?? []).flat(),
      zipCodePriorities: data?.zipCodePriorities ?? [],
    }),
    [customerUsername, county?.id]
  );

  const errors = !validWeightSum;

  const customerPreferenceSubmissionsPayload = {
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
  };

  const openSubmissionDialog = () =>
    openDialog({
      id: 'CustomerPreferencesSubmissionDialog',
      props: customerPreferenceSubmissionsPayload as CustomerPreferencesSubmissionDialogProps,
    });

  const openErrorDialog = () => {
    const errorMessage = validWeightSum ? '' : t(path('PreferencesForm.CategoryWeightsMessage'));

    openDialog({ id: 'ErrorDialog', props: { errorMessage } });
  };

  useLayoutEffect(() => {
    if (!isEmptyObject(userPreferencesForCounty)) {
      setFormIsReady(true);
    } else {
      setFormIsReady(false);
    }
  }, [userPreferencesForCounty]);

  useLayoutEffect(() => {
    if (sessionUser.isCustomer) {
      setCustomerUsername(sessionUser.username);
    }
  }, [sessionUser.isCustomer, sessionUser.username]);

  const defaultTypeOfPropertyProps = {
    customerUsername,
    countyId: county?.id,
  };

  return (
    <StyledCustomerPreferencesForm className="im-customer-preferences-form-container">
      <Form
        formName="customer-preferences"
        onSubmit={() => {}}
        schema={schema}
        defaultSubmit={false}
        className="im-customer-preferences-form"
        ref={formRef}
      >
        <CustomerCounty username={customerUsername} setUsername={setCustomerUsername} setCounty={setCounty} customerRef={customerRef} />
        {(userPreferencesForCountyIsLoading || !formIsReady) && (
          <Feedback
            customerSelected={!!customerUsername}
            loading={userPreferencesForCountyIsLoading}
            countySelected={!!county?.id}
            username={customerUsername}
          />
        )}
        {formIsReady && (
          <>
            <div className="im-form-fields">
              <div className="im-row-group">
                <CustomerPreferencesInfo date={lastUpdated} />
              </div>
              <ZipCode data={zipCodePriorities} ref={zipCodeRef} />
              <div className="im-column-group">
                <PropertyAge data={yearsOldPriorities} ref={propertyAgeRef} />
                <YearsOfOwnership data={yrsOwnedPriorities} ref={yrsOwnedRef} />
              </div>
              <div className="im-row-group">
                <TypeOfOwner data={ownerTypePriorities} ref={typeOfOwnerRef} />
                <LTV data={ltvPriorities} ref={ltvRef} />
              </div>

              <div className="im-row-group">
                <Section contentClassName="im-preferences-type-of-property" sectionTitle="Type Of Property" width="100%">
                  <TypeOfProperty
                    PropertyTypeLabel="SingleFamily"
                    className="im-single-family"
                    priority={propertyTypePriorities?.sfh.priority}
                    totalValueList={totalValuePriorities?.sfh}
                    livingAreaList={livingAreaPriorities?.sfh}
                    lotSizeList={lotSizePriorities?.sfh}
                    propertyType="sfh"
                    ref={singleFamilyRef}
                    {...defaultTypeOfPropertyProps}
                  />
                  <TypeOfProperty
                    PropertyTypeLabel="MultiFamily"
                    className="im-multi-family"
                    priority={propertyTypePriorities?.units.priority}
                    totalValueList={totalValuePriorities?.units}
                    livingAreaList={livingAreaPriorities?.units}
                    lotSizeList={lotSizePriorities?.units}
                    propertyType="units"
                    ref={multiFamilyRef}
                    {...defaultTypeOfPropertyProps}
                  />
                  <TypeOfProperty
                    PropertyTypeLabel="Condo"
                    className="im-condo"
                    priority={propertyTypePriorities?.condo.priority}
                    totalValueList={totalValuePriorities?.condo}
                    livingAreaList={livingAreaPriorities?.condo}
                    lotSizeList={lotSizePriorities?.condo}
                    propertyType="condo"
                    ref={condoRef}
                    {...defaultTypeOfPropertyProps}
                  />
                  <TypeOfProperty
                    PropertyTypeLabel="Commercial"
                    className="im-commercial"
                    priority={propertyTypePriorities?.commercial.priority}
                    totalValueList={totalValuePriorities?.commercial}
                    livingAreaList={livingAreaPriorities?.commercial}
                    lotSizeList={lotSizePriorities?.commercial}
                    propertyType="commercial"
                    ref={commercialRef}
                    {...defaultTypeOfPropertyProps}
                  />
                  <TypeOfProperty
                    PropertyTypeLabel="Land"
                    className="im-land"
                    priority={propertyTypePriorities?.land.priority}
                    totalValueList={totalValuePriorities?.land}
                    livingAreaList={livingAreaPriorities?.land}
                    lotSizeList={lotSizePriorities?.land}
                    propertyType="land"
                    ref={landRef}
                    {...defaultTypeOfPropertyProps}
                  />
                  <TypeOfProperty
                    PropertyTypeLabel="Others"
                    className="im-others"
                    priority={propertyTypePriorities?.others.priority}
                    totalValueList={totalValuePriorities?.others}
                    livingAreaList={livingAreaPriorities?.others}
                    lotSizeList={lotSizePriorities?.others}
                    propertyType="others"
                    ref={othersRef}
                    {...defaultTypeOfPropertyProps}
                  />
                </Section>
              </div>
              <Weights data={categoriesWeight as CategoriesWeightMapped} setValidWeightSum={setValidWeightSum} ref={weightsRef} />
              {!sessionUser.isCustomer && <MotivationsPreferences data={motivationPriorities} ref={motivationsRef} />}
            </div>
            {permit.updatePreferences && (
              <Section contentClassName="im-preferences-form-submit-wrapper">
                <Button
                  text={t('Common.Submit')}
                  className="im-preferences-form-submit"
                  onClick={errors ? openErrorDialog : openSubmissionDialog}
                  stopPropagation
                  preventDefault
                  icon="checklist"
                />
              </Section>
            )}
          </>
        )}
      </Form>
    </StyledCustomerPreferencesForm>
  );
}
