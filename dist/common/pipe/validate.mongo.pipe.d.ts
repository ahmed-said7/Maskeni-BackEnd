import { PipeTransform } from '@nestjs/common';
export declare class ValidateObjectIdPipe implements PipeTransform {
    transform(value: string): string;
}