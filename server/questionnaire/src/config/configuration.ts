import { registerAs } from '@nestjs/config';
import { pgConfig } from './postgres.config';
import { EnumConfig } from './enumConfig/enumConfig';

export const databaseConfig = registerAs(EnumConfig.DATABASE, () => ({
  pg: { ...pgConfig() },
}));
