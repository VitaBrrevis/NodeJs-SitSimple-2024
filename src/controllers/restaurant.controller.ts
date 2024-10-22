import { Controller, Get, Post, Body, Render, UploadedFile, UseInterceptors, Redirect, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Request } from 'express';
import { Express } from 'express'; 
import { RestaurantService } from '../services/restaurant.service';  

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('/restaurantregistration')
  @Render('restaurant-register')
  showRegistrationPage() {
    return {};
  }

  @Post('/submit-registration')
  @UseInterceptors(FileInterceptor('photo'))
  async registerRestaurant(
    @Body() body: Request['body'],
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    const { establishmentName, email, phone, socialMedia, website } = body;

    let photoPath = null;
    try {
      if (file) {
        photoPath = await this.restaurantService.uploadPhoto(file);
      }

      await this.restaurantService.insertRestaurantData(establishmentName, email, phone, socialMedia, website, photoPath);

    
      return res.redirect('/'); // потрібно буде змінити редірект на /booking коли буде готова ця сторінка
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
