import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullConfigService } from "./providers/bull-config.service";
import { MailerConfigService } from "./providers/mailer-config.service";
import Configuration from '../common/config/environments.config';
import { join } from "path";

const envFilePath = join(process.cwd(), 'environments/development.env')

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
      envFilePath,
    })
  ],
  providers: [MailerConfigService, BullConfigService],
  exports: [MailerConfigService, BullConfigService],
})
export class CommonModule{}