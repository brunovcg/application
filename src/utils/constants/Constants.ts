/* eslint-disable no-useless-escape */
import i18n from '../../locales/i18n';

abstract class Constants {
  static COMPONENTS = {
    table: {
      ALL_TABLE_SIZE: 'All',
    },
  } as const;

  static ADDITIONAL_TRAINING = 'Additional Training';

  static CSV_TEMPLATES = {
    SUPPRESSION_TEMPLATE: 'id,address_type,street_name,unit_type,unit_number,city,zip_code,owner_first_name,owner_last_name,stop_flag',
  } as const;

  static SCALING_SYSTEM_CATEGORIES = {
    PRIMARY: 'primary',
    ADDITIONAL: 'additional',
  } as const;

  static AD_SENSE_TYPE = {
    Facebook: 'FB',
    Bing: 'BI',
    Google: 'GL',
  } as const;

  static ENVIRONMENT_KEYS = {
    SMARTY_STREETS_KEY: 'REACT_APP_SMART_STREETS_KEY',
    FORCE_BACK_END_ENV: 'REACT_APP_FORCE_BACK_END_ENV',
  } as const;

  static ENVIRONMENTS = ['development', 'production', 'staging'] as const;

  static BACKGROUND_COLORS = {
    primary: 'var(--primary-color)',
    error: 'var(--error-color)',
    white: 'var(--container-white-color)',
    light: 'var(--container-light-color)',
    medium: 'var(--container-medium-color)',
    deep: 'var(--container-deep-color)',
    dark: 'var(--container-dark-color)',
    regular: 'var(--container-regular-color)',
    border: 'var(--border-color)',
    transparent: '(--transparent)',
    hover: 'var(--hover-color)',
    hoverDark: 'var(--hover-dark-color)',
  } as const;

  static COLORS = {
    primary: 'var(--primary-color)',
    error: 'var(--error-color)',
    valid: 'var(--valid-color)',
    warning: 'var(--warning-color)',
    ['primary-dark']: 'var(--primary-dark-color)',
    dark: 'var(--typeface-dark-color)',
    light: 'var(--typeface-light-color)',
    disabled: 'var(--disabled-color)',
    hover: 'var(--hover-color)',
    white: 'var(--typeface-white-color)',
    medium: 'var(--typeface-medium-color)',
  } as const;

  static HTTP_RESPONSE_ERRORS = {
    EXPIRED_TOKEN: 'TokenExpiredError',
  } as const;

  static STATUS = {
    ACTIVE: 'A',
    INACTIVE: 'I',
  } as const;

  static USER = {
    STATUS: {
      ACTIVE: 'A',
      INACTIVE: 'I',
    },
    TYPES: {
      INTERNAL_USER: 'I',
      CUSTOMER: 'C',
    },
    TYPES_DISPLAY: {
      I: 'Internal',
      C: 'Customer',
    },
  } as const;

  static DATA_MINER_QA_STATUS = {
    DQ: 'Disqualified',
    Q: 'Qualified',
    NV: 'Not Verified',
    M: 'Wrong Motivation',
  } as const;

  static SKIP_TRACE_VENDORS = {
    'Skip Force': 'SkipForce',
    'Skip Force Mail': 'SkipForceMail',
    'Launch Skip': 'LaunchSkip',
    'Skip Gene': 'SkipGene',
    'TLO': 'TLO',
  } as const;

  static OWNER_TYPES = {
    'Individual': 'individual',
    'Estate': 'estate',
    'Company': 'company',
    'Trust': 'trust',
    'Not Classified': 'noclassification',
  } as const;

  static HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    UNPROCESSABLE_CONTENT: 402,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVER_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    CANCELED: 'canceled',
    NETWORK_ERROR: 'Network Error',
  } as const;

  static PROCESS_STATUS = {
    Pending: 'P',
    Error: 'E',
    Completed: 'C',
  };

  static EVENTS = {
    RENEW_SESSION: 'RENEW_SESSION',
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
  } as const;

  static KEYBOARD = {
    KEYS: ['Enter', ' ', 'Tab', 'Shift', 'Escape'],
  } as const;

  static MOTIVATION_SOURCES = {
    CUSTOMER: 'customer',
  } as const;

  static QUERIES = {
    DRIVING_FOR_DOLLARS: 'DRIVING_FOR_DOLLARS',
    LIST_ADDRESS_MOTIVATIONS: 'LIST_ADDRESS_MOTIVATIONS',
    LIST_CUSTOMERS: 'LIST_CUSTOMERS',
    LIST_ALL_USERS: 'LIST_ALL_USERS',
    LIST_STATES: 'LIST_STATES',
    LIST_COUNTIES_BY_CUSTOMER: 'LIST_COUNTIES_BY_CUSTOMER',
    LIST_COUNTIES_BY_STATES: 'LIST_COUNTIES_BY_STATES',
    LIST_DEMOGRAPHICS_BY_USER_DATE: 'LIST_DEMOGRAPHICS_BY_USER_DATE',
    LIST_FAQS: 'LIST_FAQS',
    LIST_GROUPS: 'LIST_GROUPS',
    LIST_CUSTOMER_AD_SENSE_CONFIGS: 'LIST_CUSTOMER_AD_SENSE_CONFIGS',
    LIST_CUSTOMER_WITH_ACTIVE_AUDIENCES: 'LIST_CUSTOMER_WITH_ACTIVE_AUDIENCES',
    GROUP_DETAIL: 'GROUP_DETAIL',
    LIST_CUSTOMER_AUDIENCES: 'LIST_CUSTOMER_AUDIENCES',
    LIST_PERMISSIONS: 'LIST_PERMISSIONS',
    LIST_MOTIVATIONS: 'LIST_MOTIVATIONS',
    LIST_MOTIVATION_SOURCES: 'LIST_MOTIVATION_SOURCES',
    LIST_SERVICES: 'LIST_SERVICES',
    LIST_TRAININGS: 'LIST_TRAININGS',
    LIST_TRAINING_SESSIONS: 'LIST_TRAINING_SESSIONS',
    LIST_VENDORS: 'LIST_VENDORS',
    LIST_MOTIVATION_GROUPS: 'LIST_MOTIVATION_GROUPS',
    MAILING_LIST: 'MAILING_LIST',
    MOTIVATION_SOURCE: 'MOTIVATION_SOURCE',
    CUSTOMER_PREFERENCE_FOR_COUNTY: 'CUSTOMER_PREFERENCE_FOR_COUNTY',
    GET_CUSTOMER: 'GET_CUSTOMER',
    GET_DEFAULT_PRIORITIES_FOR_PROPERTY: 'GET_DEFAULT_PRIORITIES_FOR_PROPERTY',
    CUSTOMER_PURCHASED_PROPERTIES: 'CUSTOMER_PURCHASED_PROPERTIES',
    TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
    SIGNATURE_SOLUTION: 'SIGNATURE_SOLUTION',
    SUPPORT_EFFECTIVE_DATES: 'SUPPORT_EFFECTIVE_DATES',
    USER: 'USER',
    LIST_ROLES: 'LIST_ROLES',
    LIST_ADDRESS_MINER_SUBMISSION: 'LIST_ADDRESS_MINER_SUBMISSION',
    LIST_MINER_SUBMISSION_BY_ADDRESS: 'LIST_MINER_SUBMISSION_BY_ADDRESS',
    LIST_MOTIVATION_SOURCE_GROUPS: 'LIST_MOTIVATION_SOURCE_GROUPS',
    LIST_CUSTOMERS_SUBSCRIPTIONS: 'LIST_CUSTOMERS_SUBSCRIPTIONS',
    LIST_PROCESS_STATUS: 'LIST_PROCESS_STATUS',
    GET_PARAMETERS: 'GET_PARAMETERS',
  } as const;

  static STORAGE = {
    SUFFIX: {
      IM_APPLICATION: 'IM_APPLICATION',
    },
    PREFIX: {
      JWT: 'JWT',
      SQUIDEX_JWT: 'SQUIDEX_JWT',
      LAST_LOGIN: 'LAST_LOGIN',
    },
  } as const;

  static DEAL_SOURCES = {
    DML: { initial: 'DML', name: 'Direct Mail' },
    HSC: { initial: 'HSC', name: 'Hot Sheet - Cold Calling' },
    HST: { initial: 'HST', name: 'Hot Sheet - Texting' },
    STC: { initial: 'STC', name: 'Skip Trace - Cold Calling' },
    STT: { initial: 'STT', name: 'Skip Trace - Texting' },
    OTH: { initial: 'OTH', name: 'Other' },
  } as const;

  static TIERS = {
    GOLD_TIER: { name: 'gold-tier', display: 'Gold Tier' },
    PLATINUM_TIER: { name: 'platinum-tier', display: 'Platinum Tier' },
  } as const;

  static TOAST_IDS = {
    RENEW_SESSION: 'RENEW_SESSION',
    REQUEST_CANCELED: 'REQUEST_CANCELED',
    NETWORK_ERROR: 'NETWORK_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',
    SUPPORT_TICKET_ERROR: 'SUPPORT_TICKET_ERROR',
  } as const;

  static REGEX = {
    MIN_ONE_NUMBER: /.*\d.*$/g,
    MIN_ONE_UPPERCASE: /(?=.*[A-Z]).*$/g,
    MIN_ONE_SYMBOL_SUPPORT: /(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`]).*$/g,
    MIN_ONE_LOWERCASE: /(?=.*[a-z]).*$/g,
    MIN_SIX_MAX_NINE_CHARACTERS: /(?=.{6,99}).*$/g,
    NO_WHITE_SPACES: /^\S*$/g,
    DASH_UNDERSCORE_DOT: /_|\.|-/g,
    CAPITAL_LETTERS: /([A-Z])/g,
    NOT_NUMBER: /[^\d]/g,
    NOT_NUMBER_CURRENCY: /\D/g,
    NOT_NUMBER_CURRENCY_SEPARATORS: /[^\d\.,]/g,
    ONLY_NUMBERS: /^\d+$/,
    HTTP_LINK: /(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
    IS_EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
  } as const;

  static STOP_MAILING_FLAGS = {
    AUDANTIC: 'A',
    NO_SUPPRESSION: '\u0000',
    RETURNED: 'R',
    MAIL_ONLY: 'M',
    STOP_MAILING: 'S',
  } as const;

  static TRAINING_LEVELS = [
    { id: 1, name: i18n.t('Pages.ScalingSystem.AdditionalTraining.Levels.Basic'), accessor: 'basic', color: 'valid' as const },
    {
      id: 2,
      name: i18n.t('Pages.ScalingSystem.AdditionalTraining.Levels.Intermediate'),
      accessor: 'intermediate',
      color: 'primary' as const,
    },
    {
      id: 3,
      name: i18n.t('Pages.ScalingSystem.AdditionalTraining.Levels.Advanced'),
      accessor: 'advanced',
      color: 'error' as const,
    },
    {
      id: 4,
      name: i18n.t('Pages.ScalingSystem.AdditionalTraining.Levels.Varied'),
      accessor: 'varied',
      color: 'medium' as const,
    },
  ] as const;
}

export default Constants;
