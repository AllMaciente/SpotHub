import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hash(pass: string): Promise<string> {
    return argon2.hash(pass, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
    });
  }

  async verify(hash: string, pass: string): Promise<boolean> {
    return argon2.verify(hash, pass);
  }
}
