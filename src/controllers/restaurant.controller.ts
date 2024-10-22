import { Controller, Get, Post, Body, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Express } from 'express'; 
import { RestaurantService } from '../services/restaurant.service';  // Import the service

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}  // Inject the service

  @Get('/restaurantregistration')
  @Render('restaurant-register')
  showRegistrationPage() {
    return {};
  }

  @Post('/submit-registration')
@UseInterceptors(FileInterceptor('photo'))
async registerRestaurant(
  @Body() body: Request['body'],
  @UploadedFile() file: Express.Multer.File
) {
  const { establishmentName, email, phone, socialMedia, website } = body;

  let photoPath = null;
  try {
    
    // if (file) {
    //   photoPath = await this.restaurantService.uploadPhoto(file);
    // }

    // Insert restaurant data
    await this.restaurantService.insertRestaurantData(establishmentName, email, phone, socialMedia, website, photoPath);

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

  
}
