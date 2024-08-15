/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Request, UseGuards, UnauthorizedException, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateBuyerDto } from 'src/dto/update-buyer.dto';
import { UpdateSellerDto } from 'src/dto/update-seller.dto';


@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/buyer')
  async registerBuyer(@Body() createBuyerDto: any) {
    return this.authService.registerBuyer(createBuyerDto);
  }

  @Post('register/seller')
  async registerSeller(@Body() createSellerDto: any) {
    return this.authService.registerSeller(createSellerDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password, loginDto.userType);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/buyer')
  async updateBuyer(@Request() req, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.authService.updateBuyer(req.user.userId, updateBuyerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/seller')
  async updateSeller(@Request() req, @Body() updateSellerDto: UpdateSellerDto) {
    console.log("req.user.sub: "+req.user);
    
    return this.authService.updateSeller(req.user.userId, updateSellerDto);
  }
}
