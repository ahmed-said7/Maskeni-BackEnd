import { UploadService } from './upload.service';
export declare class UploadController {
  private readonly uploadService;
  constructor(uploadService: UploadService);
  uploadImage(req: any): Promise<{
    uploaded: any;
  }>;
  uploadVideo(req: any): Promise<{
    uploaded: any;
  }>;
  uploadPdf(req: any): Promise<{
    uploaded: any;
  }>;
}
