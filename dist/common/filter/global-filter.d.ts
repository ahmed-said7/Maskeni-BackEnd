import { ArgumentsHost, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseExceptionFilter } from '@nestjs/core';
import { Error } from 'mongoose';
interface MongoError {
  driver?: boolean;
  code?: number;
  name?: string;
  statusCode?: number;
  status?: string;
  errmsg: string;
  index?: string;
}
interface ServerError {
  message?: string;
  code?: number;
}
export declare class CatchAppExceptionsFilter extends BaseExceptionFilter {
  private configService;
  constructor(configService: ConfigService);
  catch(exception: any, host: ArgumentsHost): void;
  handleDuplicationError(exception: MongoError, object: ServerError): void;
  handleMongoValidatioError(
    exception: Error.ValidationError,
    object: ServerError,
  ): void;
  handleCastError(exception: Error.CastError, object: ServerError): void;
  handleNestError(
    exception: {
      message: string[];
      statusCode: number;
    },
    object: ServerError,
  ): void;
  handleHttpException(exception: HttpException, object: ServerError): void;
  internalError(res: any, exception: any): void;
}
export {};
