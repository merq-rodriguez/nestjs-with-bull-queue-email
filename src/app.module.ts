import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [CommonModule, MailModule],
})
export class AppModule {}