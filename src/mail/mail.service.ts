import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService{
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService
  ) {}

  async sendEmailSuscription(user: any, subject: string): Promise<any> {
    return await this.mailerService.sendMail({
        to: user.email,
        subject: subject, 
        template: 'confirmation',
        context: {
          name: user.name,
          code: user.code,
          url: this.config.get('mail.url_confirm')
        }
      })
  }
}