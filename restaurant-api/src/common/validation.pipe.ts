import { BadRequestException, Injectable } from "@nestjs/common";


@Injectable()
export class MyValidation {
    constructor() {

    }

    validateCreate({ name, address, city, longitude, latitude }) {
        if (!city || !address || !name || !longitude || !latitude) {
            throw new BadRequestException("city, address, city, longitude, latitude are required");
        }
    }

    validateGet(city: string, longitude: number, latitude: number, distance: number) {
        if (!latitude || !longitude || !distance || !city) {
            throw new BadRequestException('Latitude, longitude, and distance are required.');
        }

        if (distance < 0) {
            throw new BadRequestException('distance cannot be less than zero');
        }
    }

    validateId(restId: number) {
        if (!restId) {
            throw new BadRequestException('id is required');
        }
    }

    validateName(name: string) {
        if (!name) {
            throw new BadRequestException('name is required');
        }
    }
}