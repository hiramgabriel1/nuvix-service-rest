import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  EMAIL_PROVIDER: string;
  EMAIL_PASSWORD_PROVIDER: string;
  SECRET_KEY: string
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    EMAIL_PROVIDER: joi.string().required(),
    EMAIL_PASSWORD_PROVIDER: joi.string().required(),
    SECRET_KEY: joi.string().required()
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  email_provider: envVars.EMAIL_PROVIDER,
  email_password_provider: envVars.EMAIL_PASSWORD_PROVIDER,
  secret_key: envVars.SECRET_KEY
};