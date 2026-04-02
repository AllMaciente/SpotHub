import { Injectable } from '@nestjs/common';
import { Snowflake } from 'nodejs-snowflake';

@Injectable()
export class SnowflakeService {
  private snowflake: Snowflake;
  constructor() {
    this.snowflake = new Snowflake({
      custom_epoch: 1672531200000, // Custom epoch (January 1, 2023)
      instance_id: Number(process.env.SNOWFLAKE_INSTANCE_ID) || 0, // Instance ID (0-1023)
    });
  }

  getNextId(): bigint {
    return BigInt(this.snowflake.getUniqueID().toString());
  }
}
