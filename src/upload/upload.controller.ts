import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Upload') // Grouping the endpoints under a common tag
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FilesInterceptor('image', 10))
  @ApiOperation({ summary: 'Upload an image' }) // Summary for the endpoint
  uploadImage(@UploadedFiles() file: Express.Multer.File[]) {
    // return file;
    return this.uploadService.uploadImage(file);
  }

  // @Post('video')
  // @ApiOperation({ summary: 'Upload a video' }) // Summary for the endpoint
  // uploadVideo(@Req() req: any) {
  //   return this.uploadService.uploadVideo(req);
  // }

  // @Post('audio')
  // @ApiOperation({ summary: 'Upload an audio file' }) // Summary for the endpoint
  // uploadPdf(@Req() req: any) {
  //   return this.uploadService.uploadPdf(req);
  // }
}
