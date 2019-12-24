import { UpdateOffer } from './UpdateOffer';
import { addReview } from './addReview.ts';
import { OfferRepository } from './OfferRepository';

export class addOpinion {
    constructor(private offerRepository: OfferRepository) {}
  
    addOpinion(command: addOpinion): Promise<CommandResult> {
      return this.offerRepository
        .save({ ...command })
        .then(() => CommandResult.success())
        .catch(e =>
          CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
        );
    }
  
    async updateOffer(command: UpdateOffer): Promise<CommandResult> {
      const foundOffer = await this.offerRepository.findById(command._offerId);
      if (foundOffer==true) {
        foundOffer.rate = command.rate;
       
        return this.offerRepository
          .update(foundOffer)
          .then(() => CommandResult.success())
          .catch(e =>
            CommandResult.failureDueTo(isDefined(e.message) ? e.message : e)
          );
      } else {
        return Promise.reject(
          CommandResult.failureDueTo(
            `Offer with id: ${command._offerId} not found!`
          )
        );
      }
    }
  }