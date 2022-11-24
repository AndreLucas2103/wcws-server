import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
    async getServerRun(): Promise<string> {
        return 'Server is running';
    }
}
