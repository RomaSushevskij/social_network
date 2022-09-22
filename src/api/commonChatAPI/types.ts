export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type SubscriberType = (messages: ChatMessageType[]) => void;