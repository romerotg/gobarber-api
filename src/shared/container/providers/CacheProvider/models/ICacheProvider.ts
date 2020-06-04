export default interface ICacheProvider {
  recover<T>(key: string): Promise<T | null>;
  save<T>(key: string, value: T): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
