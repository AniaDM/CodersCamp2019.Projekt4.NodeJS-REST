import {RoomOffer} from '../../main/roomsearch/RoomOffer'
import {RoomSearcher, OfferFilter} from '../../main/roomsearch/RoomSearcher'
import { RoomOfferRepository } from '../../main/roomsearch/RoomOfferRepository';


describe('Feature: Room Offer', () => {

    const krakowRoomOffer = {
        offerId: 'asgjhbd',
        roomLocation: 'Krakow',
        dateCheckIn: new Date(),
        dateCheckOut: new Date(),
        price: 85,
        numberOfGuests: 4,
        averageRating: 5
    };
    const wroclawRoomOffer2 = {
        offerId: 'atfyghbsd',
        roomLocation: 'Wroclaw',
        dateCheckIn: new Date(),
        dateCheckOut: new Date(),
        price: 21,
        numberOfGuests: 4,
        averageRating: 5
    };
    const wroclawRoomOffer1 = {
        offerId: 'asjhvbn',
        roomLocation: 'Wroclaw',
        dateCheckIn: new Date(),
        dateCheckOut: new Date(),
        price: 23,
        numberOfGuests: 3,
        averageRating: 3
    };
    const roomOffers: RoomOffer[] = [
        wroclawRoomOffer1, 
    {
        offerId: 'asddtryuhij',
        roomLocation: 'Gdansk',
        dateCheckIn: new Date(),
        dateCheckOut: new Date(),
        price: 35,
        numberOfGuests: 2,
        averageRating: 4
    },
    wroclawRoomOffer2,
    krakowRoomOffer
    ,{
        offerId: 'asyguhd',
        roomLocation: 'Gdansk',
        dateCheckIn: new Date(),
        dateCheckOut: new Date(),
        price: 23,
        numberOfGuests: 1,
        averageRating: 3
    }
];

    describe(`Given room offers`, () => {
        
            const inMemoryRoomOfferRepository: RoomOfferRepository = {
                    getAll(): Promise<RoomOffer[]>{
                        return Promise.resolve(roomOffers);
                    }
            }
        
            const roomSearcher = new RoomSearcher(inMemoryRoomOfferRepository);


        const testCases: TestCase[] = [
            {
                filter: {
                    location: 'Wroclaw'
                },
                expectedResult: [
                    wroclawRoomOffer1,
                    wroclawRoomOffer2
                ]
            },
            {
                filter: {
                    location: 'Krakow'
                },
                expectedResult: [
                    krakowRoomOffer
                ]
            }
        ]

        testCases.forEach(testCase => {

            describe(`When find offers by location ${testCase.filter.location}`, () => {
                it(`Then only offer from location ${testCase.filter.location} should be found`, () => {
                    return expect(roomSearcher.searchOffersBy(testCase.filter)).resolves.toStrictEqual(testCase.expectedResult)
                })
            })

        })

    })

})

type TestCase = {
    filter: OfferFilter,
    expectedResult: RoomOffer[]
}