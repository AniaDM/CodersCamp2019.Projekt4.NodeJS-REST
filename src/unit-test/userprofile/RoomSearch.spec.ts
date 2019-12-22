import { RoomOffer } from '../../main/roomsearch/RoomOffer'
import { RoomSearcher, OfferFilter } from '../../main/roomsearch/RoomSearcher'
import { RoomOfferRepository } from '../../main/roomsearch/RoomOfferRepository';


describe('Feature: Room Offer', () => {

    const Offer1 = {
        offerId: 'asgjhbd',
        roomLocation: 'Kraków',
        price: 85,
        numberOfGuests: 4,
        averageRating: 5
    };
    const Offer2 = {
        offerId: 'atfyghbsd',
        roomLocation: 'Wrocław',
        price: 21,
        numberOfGuests: 4,
        averageRating: 5
    };
    const Offer3 = {
        offerId: 'asjhvbn',
        roomLocation: 'Wrocław',
        price: 23,
        numberOfGuests: 3,
        averageRating: 3
    };
    const Offer4 = {
        offerId: 'asddtryuhij',
        roomLocation: 'Gdańsk',
        price: 35,
        numberOfGuests: 2,
        averageRating: 4
    };
    const Offer5 = {
        offerId: 'asyguhd',
        roomLocation: 'Gdańsk',
        price: 23,
        numberOfGuests: 1,
        averageRating: 3
    };
    const roomOffers: RoomOffer[] = [
        Offer1,
        Offer2,
        Offer3,
        Offer4,
        Offer5
    ];

    describe(`Given room offers`, () => {

        const inMemoryRoomOfferRepository: RoomOfferRepository = {
            getAll(): Promise<RoomOffer[]> {
                return Promise.resolve(roomOffers);
            }
        }

        const roomSearcher = new RoomSearcher(inMemoryRoomOfferRepository);


        const testCases: TestCase[] = [
            {
                filter: {
                    location: 'Wrocław'
                },
                expectedResult: [
                    Offer2,
                    Offer3
                ]
            },
            {
                filter: {
                    location: 'Kraków'
                },
                expectedResult: [
                    Offer1
                ]
            },
            {
                filter: {
                    maxPrice: 30
                },
                expectedResult: [
                    Offer2,
                    Offer3,
                    Offer5,
                ]
            },
            {
                filter: {
                    maxPrice: 35
                },
                expectedResult: [
                    Offer2,
                    Offer3,
                    Offer4,
                    Offer5,
                ]
            },
            {
                filter: {
                    minPrice: 35
                },
                expectedResult: [
                    Offer1,
                    Offer4,
                ]
            },
            {
                filter: {
                    numberOfGuests: 2
                },
                expectedResult: [
                    Offer1,
                    Offer2,
                    Offer3,
                    Offer4,
                ]
            },
            {
                filter: {
                    minAverageRating: 4
                },
                expectedResult: [
                    Offer1,
                    Offer2,
                    Offer4,
                ]
            },
            {
                filter: {
                    location: "Gdańsk",
                    maxPrice: 30
                },
                expectedResult: [
                    Offer5,
                ]
            },
            {
                filter: {
                    minPrice: 23,
                    minAverageRating: 4
                },
                expectedResult: [
                    Offer1,
                    Offer4,
                ]
            },
        ];

        testCases.forEach(testCase => {

            describe(`When find offers by location ${testCase.filter.location}`, () => {
                it(`Then only offers from location ${testCase.filter.location} should be found`, () => {
                    return expect(roomSearcher.searchOffersBy(testCase.filter)).resolves.toStrictEqual(testCase.expectedResult)
                })
            }),
            describe(`When find offers by max price ${testCase.filter.maxPrice}`, () => {
                it(`Then only offers which price is lower than  ${testCase.filter.maxPrice} should be found`, () => {
                    return expect(roomSearcher.searchOffersBy(testCase.filter)).resolves.toStrictEqual(testCase.expectedResult)
                })
            }),
            describe(`When find offers by min price ${testCase.filter.minPrice}`, () => {
                it(`Then only offers which price is higher than  ${testCase.filter.minPrice} should be found`, () => {
                    return expect(roomSearcher.searchOffersBy(testCase.filter)).resolves.toStrictEqual(testCase.expectedResult)
                })
            }),
            describe(`When find offers by number of guests: ${testCase.filter.numberOfGuests}`, () => {
                it(`Then only offers which number of guests is higher than  ${testCase.filter.numberOfGuests} should be found`, () => {
                        return expect(roomSearcher.searchOffersBy(testCase.filter)).resolves.toStrictEqual(testCase.expectedResult)
                })
            }),
            describe(`When find offers by min average rating: ${testCase.filter.minAverageRating}`, () => {
                it(`Then only offers which min average rating is higher than  ${testCase.filter.minAverageRating} should be found`, () => {
                        return expect(roomSearcher.searchOffersBy(testCase.filter)).resolves.toStrictEqual(testCase.expectedResult)
                })
            })
        });

        type TestCase = {
            filter: OfferFilter,
            expectedResult: RoomOffer[]
        }
    })
})