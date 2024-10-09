export abstract class ValueObject<TObject extends {}> {
  protected readonly data: TObject;
  protected readonly ignoredKeys: (keyof TObject)[] = [];

  constructor(data: TObject) {
    this.data = Object.freeze(data);
  }

  equals(object?: ValueObject<TObject>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (object.data === undefined) {
      return false;
    }

    return this.shallowEqual(this.data, object.data);
  }

  ignore(property: (keyof TObject)[]) {
    for (const key of property) {
      this.ignoredKeys.push(key);
    }
  }

  protected shallowEqual(firstObject: TObject, secondObject: TObject): boolean {
    if (firstObject === secondObject) {
      return true;
    }

    const keys1 = Object.keys(firstObject).filter(
      (key) => !this.ignoredKeys.includes(key as keyof TObject),
    );
    const keys2 = Object.keys(secondObject).filter(
      (key) => !this.ignoredKeys.includes(key as keyof TObject),
    );

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (firstObject[key as keyof TObject] !== secondObject[key as keyof TObject]) {
        return false;
      }
    }

    return true;
  }
}
