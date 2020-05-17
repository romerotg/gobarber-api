import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashedPassword = await hash(payload, 8);
    return hashedPassword;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const passwordMatched = compare(payload, hashed);
    return passwordMatched;
  }
}
