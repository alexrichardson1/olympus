declare namespace NodeJS {
  export interface ProcessEnv {
    DB_URI: string;
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    DEV_WALLET_PRIVATE_KEY: string;
  }
}
