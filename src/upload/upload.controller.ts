import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, UseInterceptors, NestInterceptor, UploadedFiles, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { CreateUploadDTO } from './dto/create-upload.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller('upload')
export class UploadController {

  constructor(private uploadService: UploadService) { }

  // Submit a upload
  @Post('/upload')
  @UseInterceptors(FileInterceptor('dxf'))
  async addUpload(@Res() res, @UploadedFile() file, @Body() body: any) { //@Body() createUploadDTO: CreateUploadDTO
    const newUpload = await this.uploadService.addUpload(file, body); //createUploadDTO
    return res.status(HttpStatus.OK).json({
      message: 'Upload has been submitted successfully!',
      upload: newUpload,
    });
  }

  // Fetch all uploads
  @Get('uploads')
  async getUploads(@Res() res) {
    const uploads = await this.uploadService.getUploads();
    return res.status(HttpStatus.OK).json(uploads);
  }
 
  @Get('reset')
  async deleteUpload(@Res() res) {
    await this.uploadService.deleteUpload();
    return res.status(HttpStatus.OK).json({
      message: 'Uploads has been deleted!',
      
    });
  }

}