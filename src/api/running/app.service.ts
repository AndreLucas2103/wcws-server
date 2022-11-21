import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getServerRun(): string {
        return 'Server is running';
    }
}
