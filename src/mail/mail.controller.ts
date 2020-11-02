import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Post } from "@nestjs/common";
import { UserSuscriptionDTO } from "./dto/user.dto";
import { getCodeRandom } from "../utils";
import { Queue } from "bull";

@Controller('mail')
export class MailController{
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  @Post('subscription')
  async sendSuscription(@Body() user: UserSuscriptionDTO){
    const code = getCodeRandom(100000, 999999);
    await this.mailQueue.add('subscription', {user, code});
    return {message: 'Send email subscription'}
  }
}