import { HttpException } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { v4 } from 'uuid';

export class UploadService {
  async uploadImage(req: any) {
    const parts = req.parts();
    const uploaded = [];
    for await (const part of parts) {
      if (part.file) {
        console.log(part.file._readableState.buffer);
        const filename = `${v4()}-${Date.now()}.${part.mimetype.split('/')[1]}`;
        const valid = this.validateImage(part.file._readableState.buffer[0]);
        if (!valid) {
          throw new HttpException(
            'Invalid file type. png and JPEG are allowed.',
            400,
          );
        }
        const uploadPath = `uploads/${filename}`;
        await pipeline(part.file, createWriteStream(uploadPath));
        uploaded.push(filename);
      }
    }
    if (uploaded.length == 1) {
      return { uploaded: uploaded[0] };
    }
    return { uploaded };
  }
  async uploadPdf(req: any) {
    const parts = req.parts();
    const uploaded = [];
    for await (const part of parts) {
      if (part.file) {
        const filename = `${v4()}-${Date.now()}.${part.mimetype.split('/')[1]}`;
        const valid = this.validatePdf(part.file._readableState.buffer[0]);
        if (!valid) {
          throw new HttpException('Invalid file type. pdf are allowed.', 400);
        }
        const uploadPath = `uploads/${filename}`;
        await pipeline(part.file, createWriteStream(uploadPath));
        uploaded.push(filename);
      }
    }
    if (uploaded.length == 1) {
      return { uploaded: uploaded[0] };
    }
    return { uploaded };
  }
  async uploadVideo(req: any) {
    const parts = req.parts();
    const uploaded = [];
    for await (const part of parts) {
      if (part.file) {
        const filename = `${v4()}-${Date.now()}.${part.mimetype.split('/')[1]}`;
        const valid = this.validateVideo(part.file._readableState.buffer[0]);
        if (!valid) {
          throw new HttpException('Invalid file type. video are allowed.', 400);
        }
        const uploadPath = `uploads/${filename}`;
        await pipeline(part.file, createWriteStream(uploadPath));
        uploaded.push(filename);
      }
    }
    if (uploaded.length == 1) {
      return { uploaded: uploaded[0] };
    }
    return { uploaded };
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
