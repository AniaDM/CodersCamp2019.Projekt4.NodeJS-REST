export type AddRoomOpinionCommand = {
    offerId: string;
    userId: string;
    rate: number;
    content?: string;
};
