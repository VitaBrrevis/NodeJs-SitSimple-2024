import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHomePage() {
    return {
      headerContent: this.appService.getHeaderContent(),
      footerContent: this.appService.getFooterContent(),
    };
  }
}
