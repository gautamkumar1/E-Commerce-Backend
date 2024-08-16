/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schema/product.schema';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dgsr2ti0d',
  api_key: '896965796646882',
  api_secret: 'hxSgqTWbhwI24brji5rvvJB_Vjc',
});

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // ************* CREATE PRODUCT **************** //
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  // ************* GET ALL PRODUCT **************** //
  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // ************* GET PRODUCT BY ID **************** //
  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // ************* UPDATE PRODUCT **************** //
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  // ************* DELETE PRODUCT **************** //
  async deleteProduct(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }

  // ************* SEARCH AND FILTER PRODUCT **************** //
  async searchProducts(query: string, category: string): Promise<Product[]> {
    const filter = {
      name: { $regex: query, $options: 'i' },
      ...(category && { category }),
    };
    return this.productModel.find(filter).exec();
  }

  // ************* UPLOAD PRODUCT IMAGE **************** //
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  }
}
