import { Injectable, NotFoundException } from '@nestjs/common';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {

    private supportedCities: string[] = ['Lagos', 'New York'];

    private restaurants: Restaurant[] = [
        {
            id: 1,
            name: 'The Place Restaurant',
            address: 'Ogunlana Drive, Surulere',
            city: 'Lagos',
            latitude: 12.3456,
            longitude: 98.7654
        },
        {
            id: 2,
            name: 'Yakoyo Restaurant',
            city: 'Lagos',
            address: 'Victoria Island, Lagos',
            latitude: 12.3457,
            longitude: 98.7655
        }
    ];

    private readonly earthRadiusInMeter = 6371 * 1000; // Earth's radius in meters

    // Function to calculate distance between two coordinates using Haversine formula
    private calculateDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = this.earthRadiusInMeter * c;
        return distance;
    }

    // Function to convert degrees to radians
    private degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    getRestaurantsByLocation(latitude: number, longitude: number, distance: number, city: string): Restaurant[] {
        this.isSupportedCity(city);
        return this.restaurants.filter(restaurant => {
            const restaurantDistance = this.calculateDistanceInMeters(latitude, longitude, restaurant.latitude, restaurant.longitude);
            return restaurantDistance <= distance;
        });
    }

    getSingleRestaurant(restaurantId: number) {
        const restuarant = this.findRestaurant(restaurantId)[0];
        return { ...restuarant };
    }

    private isSupportedCity(city: string) {
        const supportedCity = this.supportedCities.find(value => value === city);
        if (!supportedCity) {
            throw new NotFoundException('city is not supported.')
        }
    }

    addRestaurants(name: string, address: string, city: string, latitude: number, longitude: number) {
        const id = this.restaurants.length + 1;
        this.isSupportedCity(city);
        const newRestaurant = new Restaurant(id, name, address, city, latitude, longitude);
        this.restaurants.push(newRestaurant);
        return newRestaurant;
    }

    updateRestaurant(restaurantId: number, name: string, address: string, city: string, latitude: number, longitude: number) {
        const [restaurant, index] = this.findRestaurant(restaurantId);
        const updatedRestaurant = { ...restaurant };
        updatedRestaurant.name = !name ? updatedRestaurant.name : name;
        updatedRestaurant.address = !address ? updatedRestaurant.address : address;
        updatedRestaurant.longitude = !longitude ? updatedRestaurant.longitude : longitude;
        updatedRestaurant.latitude = !latitude ? updatedRestaurant.latitude : latitude;
        updatedRestaurant.city = !city ? updatedRestaurant.city : city;
        return this.restaurants[index] = updatedRestaurant;
    }

    deleteRestaurant(restaurantId: number) {
        const index = this.findRestaurant(restaurantId)[1];
        this.restaurants.splice(index, 1);
    }

    private findRestaurant(id: number): [Restaurant, number] {
        const restaurantIndex = this.restaurants.findIndex(prod => prod.id === id);
        const restaurant = this.restaurants[restaurantIndex];
        if (!restaurant) {
            throw new NotFoundException('Could not find restaurant.');
        }
        return [restaurant, restaurantIndex];
    }


    //# SupportedCitesAddition

    addSupportedCity(name: string) {
        return this.supportedCities.push(name);
    }

    getSupportedCities() {
        return [...this.supportedCities];
    }

    //#endregion

}
