import { Controller, Post, Req } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('image')
  uploadImage(@Req() req: any) {
    return this.uploadService.uploadImage(req);
  }
  @Post('video')
  uploadVideo(@Req() req: any) {
    return this.uploadService.uploadVideo(req);
  }
  @Post('audio')
  uploadPdf(@Req() req: any) {
    return this.uploadService.uploadPdf(req);
  }
}
