import { BullModuleOptions, BullOptionsFactory } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  constructor(private readonly configService: ConfigService){}

  createBullOptions(): BullModuleOptions {
    return this.getBullOptions()
  }

  getBullOptions(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get('redis.host'),
        port: this.configService.get('redis.port'),
      },
    };
  }
}