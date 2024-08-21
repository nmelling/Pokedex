
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      // INIT_DATA: boolean;
    }
  }
}

export {}
