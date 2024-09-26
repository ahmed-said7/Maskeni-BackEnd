import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { UserSchema } from 'src/user/user.schema';
import { ReactionModule } from 'src/reaction/reaction.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question, QuestionSchema } from './question.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { SearchQuery } from 'src/share/share.module';

@Module({
  imports: [
    ApiModule,
    ReactionModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: Question.name,
        schema: QuestionSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Question.name,
        useFactory: async () => {
          const schema = QuestionSchema;
          schema.pre<SearchQuery>(/^find/, function () {
            if (!this.getOptions().skipFilter) {
              this.find({
                isDeleted: false,
                // isAccepted: true,
                isArchived: false,
              });
            }
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
