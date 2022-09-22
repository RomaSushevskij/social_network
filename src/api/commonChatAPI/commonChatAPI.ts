import {SubscriberType} from "./types";

let ws: WebSocket | null = null;

function closeHandler() {
    console.log('wsChannel closed')
    createChannel();
}

function messageHandler(e: MessageEvent) {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(subscriber => subscriber(newMessages));
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler);
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
}


let subscribers = [] as SubscriberType[];

export const chatAPI = {
    openChannel() {
        console.log('wsChannel opened')
        createChannel();
    },
    closeChannel() {
        console.log('wsChannel closed');
        subscribers = [];
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback);
        return () => {
            subscribers.filter(subscriber => subscriber !== callback);
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers.filter(subscriber => subscriber !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}