import {ChatStatusType} from "../../redux/redusers/chatReducer/types";

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
export type StatusChangedSubscriberType = (status: ChatStatusType) => void;

export type ChannelEventsTypes = 'messages-received' | 'status-changed';

