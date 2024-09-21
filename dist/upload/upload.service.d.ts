export declare class UploadService {
    uploadImage(req: any): Promise<{
        uploaded: any;
    }>;
    uploadPdf(req: any): Promise<{
        uploaded: any;
    }>;
    uploadVideo(req: any): Promise<{
        uploaded: any;
    }>;
    validatePdf(buffer: Buffer): boolean;
    validateVideo(buffer: Buffer): boolean;
    validateImage(buffer: Buffer): boolean;
}
