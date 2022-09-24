import {ChannelEventsTypes, MessagesReceivedSubscriberType, StatusChangedSubscriberType} from "./types";
import {ChatStatusType} from "../../redux/redusers/chatReducer/types";

let ws: WebSocket | null = null;

function closeHandler() {
    changeChatStatus('pending');
    createChannel();
}

function messageHandler(e: MessageEvent) {
    const newMessages = JSON.parse(e.data);
    subscribers["messages-received"].forEach(subscriber => subscriber(newMessages));
}

function openHandler() {
    changeChatStatus('ready');
}

function errorHandler() {
    changeChatStatus('error');
    console.error('Refresh page')
}

function cleanUp() {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener ('error', errorHandler);
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    changeChatStatus('pending');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

function changeChatStatus(status: ChatStatusType) {
    subscribers['status-changed'].forEach(subscriber => subscriber(status))
}


let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
};

export const chatAPI = {
    openChannel() {
        createChannel();
    },
    closeChannel() {
        subscribers["messages-received"] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(channelEvent: ChannelEventsTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[channelEvent].push(callback);
        return () => {
            // @ts-ignore
            subscribers[channelEvent].filter(subscriber => subscriber !== callback);
        }
    },
    unsubscribe(channelEvent: ChannelEventsTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[channelEvent].filter(subscriber => subscriber !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}