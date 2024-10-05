import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get<string>('CLOUDINARY_NAME'),
      api_key: config.get<string>('CLOUDINARY_KEY'),
      api_secret: config.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadImage(files: Express.Multer.File[]) {
    const uploaded = [];
    console.log(files);
    for (const file of files) {
      const valid = this.validateImage(file.buffer);
      if (!valid) {
        throw new HttpException('Invalid file type', 400);
      }
      const image = await this.uploadFile(file);
      console.log(image);
      uploaded.push(image);
    }
    if (uploaded.length == 1) {
      return { uploaded: uploaded[0] };
    }
    return { uploaded };
  }
  async uploadPdf(files: Express.Multer.File[]) {
    const uploaded = [];
    for (const file of files) {
      const valid = this.validatePdf(file.buffer);
      if (!valid) {
        throw new HttpException('Invalid file type.', 400);
      }
      const pdf = await this.uploadFile(file);
      uploaded.push(pdf);
    }
    if (uploaded.length == 1) {
      return { uploaded: uploaded[0] };
    }
    return { uploaded };
  }
  async uploadVideo(files: Express.Multer.File[]) {
    const uploaded = [];
    for (const file of files) {
      const valid = this.validateImage(file.buffer);
      if (!valid) {
        throw new HttpException('Invalid file type.', 400);
      }
      const video = await this.uploadFile(file);
      uploaded.push(video);
    }
    if (uploaded.length == 1) {
      return { uploaded: uploaded[0] };
    }
    return { uploaded };
  }
  async uploadFile(file: Express.Multer.File) {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const links: string[] = [];
    for (const file of files) {
      const url = await this.uploadFile(file);
      links.push(url);
    }
    return links;
  }
  validatePdf(buffer: Buffer) {
    const magicNumbers = buffer.slice(0, 4).toString('hex');
    return magicNumbers === '25504446';
  }
  validateVideo(buffer: Buffer) {
    return buffer.slice(4, 12).toString('hex') === '66747970';
  }
  validateImage(buffer: Buffer) {
    const magicNumbers = buffer.slice(0, 4).toString('hex');
    return magicNumbers === '89504e47' || magicNumbers.startsWith('ffd8ff');
  }
}
