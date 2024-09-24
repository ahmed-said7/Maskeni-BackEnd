import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ type: Boolean, default: false })
  isPaid?: Date;
  @Prop({ type: Number, default: 1 })
  quantity?: number;
  @Prop({ type: String })
  qrCode?: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Event.name })
  event: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  eventOwner: Types.ObjectId;
}

export type TicketDocument = HydratedDocument<Ticket>;
export const TicketSchema = SchemaFactory.createForClass(Ticket);
