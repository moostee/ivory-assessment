import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class Restaurant {
    @ApiHideProperty()
    public id: number;
    @ApiProperty()
    public name: string;
    @ApiProperty()    
    public address: string;
    @ApiProperty()
    public city: string;
    @ApiProperty()
    public latitude: number;
    @ApiProperty()
    public longitude: number;

    constructor(id: number, name: string, address: string, city :string, latitude: number, longitude: number) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
    }
}

export class RestaurantResponse
{
    @ApiProperty()
    public response : string;
    constructor(res: string){
        this.response = res;
    }
}

export class CreateSupportedCities
{
    @ApiProperty()
    public name : string
}