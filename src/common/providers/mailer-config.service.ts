import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService){}
  
  createMailerOptions(): MailerOptions{
    return this.getMailerOptions()
  }

  private getMailerOptions(): MailerOptions{
    return {
      transport: {
        host: this.configService.get('mail.host'),
        port: this.configService.get('mail.port'),
        secure: this.configService.get<boolean>('mail.secure'),
        // tls: { ciphers: 'SSLv3', }, // gmail
        auth: {
          user: this.configService.get('mail.user'),
          pass: this.configService.get('mail.password'),
        },
      },
      defaults: this.getDefault(),
      template: this.getTemplate()
    }
  }

  private getDefault(){
    return {
      from: `"Company suscription" <${this.configService.get('mail.user')}>`,
    }
  }
  
  private getTemplate(){
    return  {
      dir: join(process.cwd(), "templates"),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    }
  }
}