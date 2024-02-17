import { Injectable, Logger } from '@nestjs/common';
import {
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../app.config';

interface IObjectListOptions {
  Bucket: string;
  Prefix: string;
}

interface IObjectId {
  Bucket: string;
  Key: string;
}

interface IUploadOptions extends IObjectId {
  Body: any;
}

interface ISignUrlOptions extends IObjectId {
  expiresIn?: number;
}

interface ISignMultipartUrlOptions extends ISignUrlOptions {
  UploadId: string;
  PartNumber: number;
}

type IUploadResult = [success: boolean];

@Injectable()
export class AwsS3Service {
  protected readonly logger: Logger = new Logger(AwsS3Service.name);
  protected readonly s3Client: S3Client;
  protected readonly appConfig: GlobalConfig;

  constructor(protected readonly configService: ConfigService) {
    this.appConfig = this.configService.get('global');
    this.s3Client = new S3Client({
      region: this.appConfig.awsRegion,
    });
  }

  async signGet(options: ISignUrlOptions): Promise<string> {
    const { Bucket, Key, ...opt } = options;
    const command = new GetObjectCommand({
      Bucket: Bucket,
      Key: Key,
    });
    return getSignedUrl(this.s3Client, command, { ...opt });
  }

  async signPartPut(options: ISignMultipartUrlOptions): Promise<string> {
    const { Bucket, Key, UploadId, PartNumber, ...opt } = options;
    const command = new UploadPartCommand({
      Bucket: Bucket,
      Key: Key,
      UploadId: UploadId,
      PartNumber: PartNumber,
    });
    return getSignedUrl(this.s3Client, command, { ...opt });
  }

  async signPut(options: ISignUrlOptions): Promise<string> {
    const { Bucket, Key, ...opt } = options;
    const command = new PutObjectCommand({
      Bucket: Bucket,
      Key: Key,
    });

    return getSignedUrl(this.s3Client, command, { ...opt });
  }

  async upload(options: IUploadOptions): Promise<IUploadResult> {
    const result = await this.s3Client.send(new PutObjectCommand(options));
    return [result.$metadata.httpStatusCode === 200];
  }

  async exists(opt: IObjectId): Promise<boolean> {
    const command = new HeadObjectCommand(opt);
    try {
      const response = await this.s3Client.send(command);
      return response.$metadata.httpStatusCode === 200;
    } catch (error) {
      return false;
    }
  }

  async head(opt: IObjectId): Promise<any> {
    const command = new HeadObjectCommand(opt);
    try {
      return await this.s3Client.send(command);
    } catch (error) {
      return undefined;
    }
  }

  async getObject(opt: IObjectId): Promise<null | any> {
    const command = new GetObjectCommand({
      Bucket: opt.Bucket,
      Key: opt.Key,
    });

    try {
      return await this.s3Client.send(command);
    } catch (error) {
      return null;
    }
  }

  // up to 1000 objects only!!!
  async listObjects(opt: IObjectListOptions): Promise<string[]> {
    try {
      const command = new ListObjectsCommand(opt);
      const data = await this.s3Client.send(command);
      return (data.Contents ?? []).map((obj) => obj.Key);
    } catch (error) {
      this.logger.warn(error);
      return [];
    }
  }
}
