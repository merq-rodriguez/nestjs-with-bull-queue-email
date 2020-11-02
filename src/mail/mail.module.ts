import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { CommonModule } from "../common/common.module";
import { MailProcessor } from "./ mail.processor";
import { MailService } from "./mail.service";
import { BullModule } from "@nestjs/bull";
import { MailController } from "./mail.controller";
import { BullConfigService, MailerConfigService } from "../common";

@Module({
  imports: [
    CommonModule,
    MailerModule.forRootAsync({
      imports: [CommonModule],
      useExisting: MailerConfigService
    }),
    BullModule.registerQueueAsync({
      name: 'mail-queue',
      imports: [CommonModule],
      useExisting: BullConfigService,
    })
  ],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
  exports: [MailService, MailProcessor]
})
export class MailModule{}