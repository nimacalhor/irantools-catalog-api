export type ControllerReturnType = Promise<{
  ok: boolean;
  data: any;
  statusCode: number;
  message?: string;
  pagination?: any;
  metadata?: any;
}>;

export type ErrorReturnType = {
  ok: boolean;
  data: any;
  errorMessage: string;
  errorCode: string;
  statusCode: string | number;
};
