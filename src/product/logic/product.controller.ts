/* eslint-disable prettier/prettier */
// src/product/product.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/role.enum';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('create')
  @Roles(UserRole.Seller)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('getAllProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
