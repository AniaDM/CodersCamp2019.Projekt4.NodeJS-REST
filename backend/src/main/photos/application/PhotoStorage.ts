import {Photo} from "../domain/Photo";
import {PhotoRepository} from "../domain/PhotoRepository";
import {isDefined, isNotDefined} from "../../utils";

export class PhotoStorage {

    constructor(public photoRepository: PhotoRepository) {
    }

    store(base64: string): Promise<Photo> {
        return this.photoRepository.save(Photo.fromBase64(base64));
    }

    retrieve(photoId: string): Promise<Photo> {
        return this.photoRepository.findById(photoId)
            .then(it => isDefined(null) ? Promise.resolve(it!) : Promise.reject(new Error(`Photo with id ${photoId} not found!`)));
    }

}
