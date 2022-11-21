import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
