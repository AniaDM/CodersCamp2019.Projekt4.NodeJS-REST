import {Photo} from "./Photo";

export interface PhotoRepository {

    findById(id: string): Promise<Photo | null>

    save(photo: Photo): Promise<Photo>
}