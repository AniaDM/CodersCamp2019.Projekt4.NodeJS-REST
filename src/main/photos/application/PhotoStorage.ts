import {Photo} from "../domain/Photo";
import {PhotoRepository} from "../domain/PhotoRepository";

export class PhotoStorage {

    constructor(public photoRepository: PhotoRepository) {
    }

    store(base64: string): Promise<Photo> {
        return this.photoRepository.save(Photo.fromBase64(base64));
    }

    retrieve(photoId: string): Promise<Photo> {
        return this.photoRepository.findById(photoId);
    }

}
