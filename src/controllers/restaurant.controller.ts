import { Controller, Get, Post, Body, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UploadedFile() file: Express.Multer.File
) {
  const { establishmentName, email, phone, socialMedia, website } = body;

  let photoPath = null;
  try {
    if (file) {
        console.log('File detected. Proceeding to upload:', file.originalname); 
        photoPath = await this.restaurantService.uploadPhoto(file);
      } else {
        console.error('No file uploaded'); 
      }

      console.log('Inserting restaurant data. Photo path:', photoPath); 
    await this.restaurantService.insertRestaurantData(establishmentName, email, phone, socialMedia, website, photoPath);

    return { success: true };
  } catch (error) {
    console.error('Error in registerRestaurant:', error);
    return { error: error.message };
  }
}

  
}
