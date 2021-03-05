import {Position} from "../../model/Position";

export interface ISendNotificationBus {
    NotifyExecution(position: Position): void;
}