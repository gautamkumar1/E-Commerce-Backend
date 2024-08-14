/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop({ required: true, minlength: 6 })
  username: string;

  @Prop({ required: true, unique: true, minlength: 8 })
  email: string;

  @Prop({ required: true, minlength: 10 })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true, minlength: 3 })
  shopname: string;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
