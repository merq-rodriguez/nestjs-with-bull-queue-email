import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull"
import { Logger } from "@nestjs/common"
import { ISuscription } from "./interfaces/subscription.interface"
import { MailService } from "./mail.service"
import { Job } from "bull"

@Processor("mail-queue")
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name)

  constructor(private readonly mailService: MailService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
  }

  @Process('subscription')
  async sendWelcomeEmail(job: Job<ISuscription>): Promise<any> {
    this.logger.log(`Sending subscription email to '${job.data.user.email}'`)
    this.mailService.sendEmailSuscription(job.data.user,'Subscription')
      .catch(e => this.logger.log(`Error Sending subscription email to '${job.data.user.email}'`))
  }
}