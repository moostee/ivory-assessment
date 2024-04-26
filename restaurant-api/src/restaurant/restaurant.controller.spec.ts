import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantV1Controller } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { MyValidation } from '../common/validation.pipe';

describe('RestaurantV1Controller', () => {
    let controller: RestaurantV1Controller;
    let service: RestaurantService;
    let validation: MyValidation;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RestaurantV1Controller],
            providers: [RestaurantService, MyValidation],
        }).compile();

        controller = module.get<RestaurantV1Controller>
            (RestaurantV1Controller);
        service = module.get<RestaurantService>(RestaurantService);
        validation = module.get<MyValidation>(MyValidation);
    });

    describe('addRestaurant', () => {
        it('should add a new restaurant with valid input', () => {
            const mockRequestBody = {
                name: 'Test Restaurant',
                address: '123 Test Street',
                city: 'Test City',
                longitude: 0,
                latitude: 0,
            };
            const mockRestaurant = { id: 1, ...mockRequestBody };
            jest.spyOn(validation, 'validateCreate').mockReturnValue(undefined);
            jest.spyOn(service, 'addRestaurants').mockReturnValue(mockRestaurant);

            const result = controller.addRestaurant(mockRequestBody);
            expect(result).toEqual(mockRestaurant);
        });

        it('should throw an error with invalid input', () => {
            const mockRequestBody = {
                name: '',
                address: '',
                city: '',
                longitude: 0,
                latitude: 0,
            }; // Invalid input
            jest.spyOn(validation, 'validateCreate').mockImplementation(() => {
                throw new Error('Validation failed');
            });

            expect(() => controller.addRestaurant(mockRequestBody)).toThrow('Validation failed');
        });
    });

    // Add more test cases for other controller methods
    describe('updateRestaurant', () => {
        it('should add a update restaurant specific input', () => {
            const mockRequestBody = {
                address: '123 Test Street',
                city: '',
                name: '',
                longitude: 2,
                latitude: 4
            };
            const mockRestaurant = { id: 1, name: "test", address: "123 Test Street", city: "Lagos", longitude: 2, latitude: 4 };
            
            jest.spyOn(service, 'updateRestaurant').mockReturnValue(mockRestaurant);

            const result = controller.updateRestaurant(1, mockRequestBody);
            expect(result.address).toEqual(mockRestaurant.address);
            expect(mockRestaurant.city).toEqual("Lagos");
        });
    });
});

