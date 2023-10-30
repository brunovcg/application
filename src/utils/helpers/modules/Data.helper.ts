import { UnknownObject } from '../../../types';

abstract class DataHelper {
  static isEmptyObject(object: UnknownObject) {
    return JSON.stringify(object) === '{}';
  }

  static updateArrayOfObject<ObjectType, NewValues>({
    state,
    objectKeyFilter,
    comparisonField,
    newValues,
    callback,
  }: {
    state: ObjectType[];
    objectKeyFilter: string;
    callback?: (newState: ObjectType[]) => void;
    newValues: NewValues;
    comparisonField: string | number;
  }) {
    const newState = [...state];
    const updatedRowIndex = state.findIndex((item) => item[String(objectKeyFilter) as keyof ObjectType] === comparisonField);
    newState.splice(updatedRowIndex, 1, { ...newState[Number(updatedRowIndex)], ...newValues });
    callback?.(newState);
    return newState;
  }

  static filterMap<ArrayType extends unknown[], MapReturn>(
    arr: ArrayType,
    filterFn: (filterItem: ArrayType[number], ...rest: unknown[]) => boolean,
    mapFn: (mapItem: ArrayType[number], index?: number, array?: ArrayType, ...rest: unknown[]) => MapReturn
  ) {
    const isFunction = (fn: (funcItem: ArrayType) => unknown) => typeof fn === 'function';
    return arr.reduce((acc, current, index) => {
      if (isFunction(filterFn) && filterFn(current) === false) return acc;
      const newItem = isFunction(mapFn) ? mapFn(current, index, arr as ArrayType) : current;
      return [...(acc as unknown[]), newItem];
    }, []) as MapReturn[];
  }

  static mask(value: string | number, pattern: string) {
    let i = 0;
    const stringify = value.toString();

    return pattern.replace(/#/g, () => stringify[i++] || '');
  }

  static stringifyFromByte(bytes: number, decimals = 2) {
    const UNIT = 1024;
    const SIZES = ['Bytes', 'KB', 'MB', 'GB'];

    if (bytes == 0) return '0 Byte';

    const index = Math.floor(Math.log(bytes) / Math.log(UNIT));

    return parseFloat((bytes / Math.pow(UNIT, index)).toFixed(decimals)) + ' ' + SIZES[Number(index)];
  }

  static mbToBytes(megaBytes: number) {
    return 1024 * 1024 * megaBytes;
  }

  static arrayIncludesSome(array: string[], target: string[]) {
    return array.some((item) => target.includes(item));
  }

  static removeObjectFalsies(object: Record<string, unknown>) {
    Object.keys(object).forEach((key) => {
      if (!object[key as keyof typeof object]) {
        Reflect.deleteProperty(object, key);
      }
    });

    return object;
  }

  static invertObjectKeysValues<Obj extends Record<string, string>>(object: Obj) {
    const objectEntries = Object.entries(object);

    return objectEntries.reduce((acc, current) => {
      const [value, key] = current;

      acc[key as keyof typeof acc] = value;

      return acc;
    }, {} as { [key in (typeof object)[keyof typeof object]]: keyof typeof object });
  }

  static sliceFromWord(string: string, word: string) {
    const index = string.indexOf(word);
    if (index === -1) {
      return null;
    }
    return string.slice(index);
  }

  static sliceUntilWord(string: string, word: string) {
    const index = string.indexOf(word);
    if (index === -1) {
      return string;
    }
    return string.slice(0, index);
  }

  static stringifyObjectValues(args: { [key: string]: unknown }) {
    const keys = Object.keys(args);

    return keys.reduce((acc, current) => {
      const value = args[`${current}`];

      acc[`${current}`] = value ? String(value) : '';

      return acc;
    }, {} as { [key: string]: string });
  }

  static areObjectsDeepEqual(object1: unknown, object2: unknown) {
    const isObject = (object: unknown) => object != null && typeof object === 'object' && !Array.isArray(object);

    const objKeys1 = Object.keys(object1 as Record<string, unknown>);
    const objKeys2 = Object.keys(object2 as Record<string, unknown>);

    if (objKeys1.length !== objKeys2.length) return false;

    for (const key of objKeys1) {
      const value1 = (object1 as Record<string, unknown>)[`${key}`];
      const value2 = (object2 as Record<string, unknown>)[`${key}`];

      const isObjects = isObject(value1) && isObject(value2);

      if ((isObjects && !this.areObjectsDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
        return false;
      }
    }
    return true;
  }
}

export default DataHelper;
