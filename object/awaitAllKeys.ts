import { all, props } from 'bluebird';

export async function awaitAllKeys<T>(obj: { [K in keyof T]: Promise<T[K]> }): Promise<T> {
  return props(obj);
}
