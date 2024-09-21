"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const promises_1 = require("stream/promises");
const uuid_1 = require("uuid");
class UploadService {
    async uploadImage(req) {
        const parts = req.parts();
        const uploaded = [];
        for await (const part of parts) {
            if (part.file) {
                const filename = `${(0, uuid_1.v4)()}-${Date.now()}.${part.mimetype.split('/')[1]}`;
                const valid = this.validateImage(part.file._readableState.buffer[0]);
                if (!valid) {
                    throw new common_1.HttpException('Invalid file type. png and JPEG are allowed.', 400);
                }
                const uploadPath = `uploads/${filename}`;
                await (0, promises_1.pipeline)(part.file, (0, fs_1.createWriteStream)(uploadPath));
                uploaded.push(filename);
            }
        }
        if (uploaded.length == 1) {
            return { uploaded: uploaded[0] };
        }
        return { uploaded };
    }
    async uploadPdf(req) {
        const parts = req.parts();
        const uploaded = [];
        for await (const part of parts) {
            if (part.file) {
                const filename = `${(0, uuid_1.v4)()}-${Date.now()}.${part.mimetype.split('/')[1]}`;
                const valid = this.validatePdf(part.file._readableState.buffer[0]);
                if (!valid) {
                    throw new common_1.HttpException('Invalid file type. pdf are allowed.', 400);
                }
                const uploadPath = `uploads/${filename}`;
                await (0, promises_1.pipeline)(part.file, (0, fs_1.createWriteStream)(uploadPath));
                uploaded.push(filename);
            }
        }
        if (uploaded.length == 1) {
            return { uploaded: uploaded[0] };
        }
        return { uploaded };
    }
    async uploadVideo(req) {
        const parts = req.parts();
        const uploaded = [];
        for await (const part of parts) {
            if (part.file) {
                const filename = `${(0, uuid_1.v4)()}-${Date.now()}.${part.mimetype.split('/')[1]}`;
                const valid = this.validateVideo(part.file._readableState.buffer[0]);
                if (!valid) {
                    throw new common_1.HttpException('Invalid file type. video are allowed.', 400);
                }
                const uploadPath = `uploads/${filename}`;
                await (0, promises_1.pipeline)(part.file, (0, fs_1.createWriteStream)(uploadPath));
                uploaded.push(filename);
            }
        }
        if (uploaded.length == 1) {
            return { uploaded: uploaded[0] };
        }
        return { uploaded };
    }
    validatePdf(buffer) {
        const magicNumbers = buffer.slice(0, 4).toString('hex');
        return magicNumbers === '25504446';
    }
    validateVideo(buffer) {
        return buffer.slice(4, 12).toString('hex') === '66747970';
    }
    validateImage(buffer) {
        const magicNumbers = buffer.slice(0, 4).toString('hex');
        return magicNumbers === '89504e47' || magicNumbers.startsWith('ffd8ff');
    }
}
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map