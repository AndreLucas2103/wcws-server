import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';

@Module({
  providers: [MensagemService]
})
export class MensagemModule {}
