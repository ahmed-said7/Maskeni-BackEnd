import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload') // Grouping the endpoints under a common tag
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload an image' }) // Summary for the endpoint
  uploadImage(@Req() req: any) {
    return this.uploadService.uploadImage(req);
  }

  @Post('video')
  @ApiOperation({ summary: 'Upload a video' }) // Summary for the endpoint
  uploadVideo(@Req() req: any) {
    return this.uploadService.uploadVideo(req);
  }

  @Post('audio')
  @ApiOperation({ summary: 'Upload an audio file' }) // Summary for the endpoint
  uploadPdf(@Req() req: any) {
    return this.uploadService.uploadPdf(req);
  }
}
