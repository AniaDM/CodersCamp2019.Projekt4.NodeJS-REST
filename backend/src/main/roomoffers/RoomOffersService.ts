import { CommandResult } from '../sharedkernel/application/CommandResult';
import { isDefined, isNotDefined } from '../utils';
import { RoomOfferRepository } from './RoomOfferRepository';
import { AddRoomOffer } from './AddRoomOffer';
import { UpdateOffer } from './UpdateOffer';
import { RoomOffer } from './RoomOfferRepository';
import { ChangeRoomOfferPublication } from './ChangeRoomOfferPublication';

export class RoomOffersService {
  constructor(private offerRepository: RoomOfferRepository) {}

  addOffer(command: AddRoomOffer): Promise<CommandResult> {
    return this.offerRepository
      .save({ ...command })
      .then(() => CommandResult.success())
      .catch(e =>
        CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
      );
  }

  async changeOfferPublication(command: ChangeRoomOfferPublication): Promise<CommandResult> {
    const foundOffer = await this.offerRepository.findById(command._id);
    if (foundOffer) {
      foundOffer.isPublic = true;
      return this.offerRepository
        .publish(foundOffer)
        .then(() => CommandResult.success())
        .catch(e =>
          CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
        );
    } else {
      return Promise.reject(
        CommandResult.failureDueTo(
          `Offer with id: ${command._id} not found!`
        )
      );
    }
  }

  async updateOffer(command: UpdateOffer): Promise<CommandResult> {
    const foundOffer = await this.offerRepository.findById(command._id);
    if (foundOffer) {
      if(foundOffer.roomLocation !== command.roomLocation && command.roomLocation !== undefined) {
        foundOffer.roomLocation = command.roomLocation;
      }
      if(command.dateCheckIn !== undefined && foundOffer.dateCheckIn !== new Date(command.dateCheckIn)) {
      foundOffer.dateCheckIn = new Date(command.dateCheckIn);
      }
      if(command.dateCheckOut !== undefined && foundOffer.dateCheckOut !== new Date(command.dateCheckOut)) {
      foundOffer.dateCheckOut = new Date(command.dateCheckOut);
      }
      if(foundOffer.price !== command.price && command.price !== undefined) {
        foundOffer.price = command.price;
      }
      if(foundOffer.roomPhoto !== command.roomPhoto && command.roomPhoto !== undefined) {
      foundOffer.roomPhoto = command.roomPhoto;
      }
      if(foundOffer.additionalServices !== command.additionalServices && command.additionalServices !== undefined) {
      foundOffer.additionalServices = command.additionalServices;
      }
      if(foundOffer.paymentMethod !== command.paymentMethod && command.paymentMethod !== undefined) {
      foundOffer.paymentMethod = command.paymentMethod;
      }
      if(foundOffer.numberOfGuests !== command.numberOfGuests && command.numberOfGuests !== undefined) {
      foundOffer.numberOfGuests = command.numberOfGuests;
      }
      if(foundOffer.numberOfBeds !== command.numberOfBeds && command.numberOfBeds !== undefined) {
      foundOffer.numberOfBeds = command.numberOfBeds;
      }
      if(foundOffer.numberOfGuestsPerBeds !== command.numberOfGuestsPerBeds && command.numberOfGuestsPerBeds !== undefined) {
      foundOffer.numberOfGuestsPerBeds = command.numberOfGuestsPerBeds;
      }
      if(foundOffer.title !== command.title && command.title !== undefined) {
        foundOffer.title = command.title;
      }
      if(foundOffer.description !== command.description && command.description !== undefined) {
        foundOffer.description = command.description;
      }
      return this.offerRepository
        .update(foundOffer)
        .then(() => CommandResult.success())
        .catch(e =>
          CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
        );
    } else {
      return Promise.reject(
        CommandResult.failureDueTo(
          `Offer with id: ${command._id} not found!`
        )
      );
    }
  }

  findRoomOfferByUsername(username: string): Promise<RoomOffer[]> {
    return this.offerRepository.findByUsername(username);
  }

  async searchOffersBy(filter: OfferFilter) {
    return this.offerRepository
      .getAll()
      .then(offers => this.filterOffersBy(offers, filter));
  }

  private filterOffersBy(
    offers: RoomOffer[],
    filter: OfferFilter
  ): RoomOffer[] {
    return offers
      .filter(offer => offer.username === filter.username)
  }
  
}

export interface OfferFilter {
  username: string,
  isPublic: boolean
}
