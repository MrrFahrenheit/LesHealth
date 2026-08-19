import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";

@Injectable()

export class UvService{
    constructor(private readonly httpService:HttpService) {}

 async getUv(lat: number, lon: number) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(
                    'https://currentuvindex.com/api/v1/uvi',
                    {
                        params: {
                            latitude: lat,
                            longitude: lon,
                        },
                    },
                ),
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching UV index:', error);

            throw new HttpException(
                'Unable to retrieve UV index',
                HttpStatus.BAD_GATEWAY,
            );
        }
    }
}