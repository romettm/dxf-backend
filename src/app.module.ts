import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/dxf-backend', { useNewUrlParser: true }),
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}