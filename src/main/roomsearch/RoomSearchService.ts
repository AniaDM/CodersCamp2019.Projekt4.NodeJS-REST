
async function searchOffers(
    numberOfGuests?: number, 
    minPrice?: number, 
    maxPrice?: number, 
    minAverageRating?: number, 
    location?: string, 
    additionalServices?: Array) {
    const offers = await RoomOffer
        .find({
            numberOfGuests: { $gte: numberOfGuests },
            price: { $gte: minPrice, $lte: maxPrice },
            averageRating: { $gte: minAverageRating },
            roomLocation: location,
            additionalServices: additionalServices
        })

    return offers
}