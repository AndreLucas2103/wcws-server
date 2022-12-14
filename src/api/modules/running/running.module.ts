import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
    controllers: [AppController],
    imports: [DatabaseModule],
})
export class RunningModule {}
