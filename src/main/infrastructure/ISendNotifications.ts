import {ISendFinalStateBus} from "./bus/ISendFinalStateBus";
import {Position} from "../model/Position";

export interface ISendNotifications {
    readsFrom(marsRoverServiceBus: ISendFinalStateBus): void;
    sendError(): void;
    send(position: Position): void;
}