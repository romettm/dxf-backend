import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Upload } from './interfaces/upload.interface';
import { CreateUploadDTO } from './dto/create-upload.dto';

import { createReadStream, createWriteStream } from 'fs';
import fetch, { Headers, RequestInit } from "node-fetch";
import FormData = require("form-data");

type Response = DxfResponse | ErrorResponse

interface DxfResponse {
  cornerCount: number,
  warnings: Array<Warning>,
  totalArea: number,
  bboxArea: number,
  filledArea: number,
  numberOfInsertions: number,
  width: number,
  height: number,
  bbox_width: number,
  bbox_height: number,
  lineLengths: Array<number>;
  outline: Outline
  holes: Array<Outline>
}

type Point = [number, number]
type Outline = Array<Point>

interface Warning {
  name: string,
  errorCode: number,
  errorMessage: string,
  extra: Object
} 

interface ErrorResponse {
    errorCode: number;
    message: string;
}


@Injectable()
export class UploadService {

  constructor(@InjectModel('Upload') private uploadModel: Model<Upload>) { }

	async getFileInfo (file: any): Promise<Array<Response> | string> {

	    const api = 'https://k7ztdrfo5i.execute-api.eu-central-1.amazonaws.com/dev/api/dxf';

	    const form = new FormData();
	    
	    form.append('dxf', file.buffer, {
		    filename: file.originalname,
		    contentType: file.mimetype,
		});  
	 
	    const requestOptions: RequestInit = {
	        method: "POST",
	        body: form
	    };

	    try {
	        const response = await fetch(api, requestOptions);
	        const data = await response.json();
	        return data
	    } catch (error) {
	        if (error) {
	            return error.message
	        }
	    }
	}

	isDxf(item: any): item is DxfResponse {
	  return item;
	}

  	async addUpload(file: any, body: any): Promise<any> { //createUploadDTO: CreateUploadDTO
  	 
	  	let response = await this.getFileInfo(file); 
	  	
	  
		
	  	if(this.isDxf( response )){

		  	const fi = response as DxfResponse;
		  	let data = new CreateUploadDTO;
		  	data.name = file.originalname;
		  	data.fi = fi;
		  	data.thickness = body.thickness;
		  	data.date_created = new Date().toISOString().replace('T', ' ').substr(0, 19);
		    const newUpload = await this.uploadModel(data); 
		    return newUpload.save();
		}
  	}  

	async getUploads(): Promise<Upload[]> {
		const uploads = await this.uploadModel.find().exec();
		return uploads;
	}

	async deleteUpload(): Promise<any> {
		var uploads = await this.getUploads();
		await this.uploadModel.deleteMany({});
		return null;
	}

} 