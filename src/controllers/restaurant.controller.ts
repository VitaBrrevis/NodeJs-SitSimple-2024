
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class RestaurantController {
    @Get('/restaurantregistration')
    @Render('restaurant-register')  
    showRegistrationPage() {
        console.log("Restaurant registration page requested.");
    return {};
    }
}
