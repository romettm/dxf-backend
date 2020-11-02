import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { uploadSchema } from './schemas/upload.schema'; // and this

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Upload', schema: uploadSchema }]),
    ], // add 
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}