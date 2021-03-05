import {ISendNotifications} from "../ISendNotifications";
import {ISendFinalStateBus} from "../bus/ISendFinalStateBus";
import {INasaAntenna} from "./INasaAntenna";
import {Position} from "../../model/Position";
import {Symbols} from "../../model/Symbols"

export class MarsRoverSender implements ISendNotifications {
    private nasaAntenna: INasaAntenna;

    constructor(nasaAntenna: INasaAntenna) {
        this.nasaAntenna = nasaAntenna;
    }

    readsFrom(marsRoverServiceBus: ISendFinalStateBus): void {
        marsRoverServiceBus.trigger(this);
    }

    send(position: Position): void {
        this.nasaAntenna.received([
            Symbols.X + position.getX(),
            Symbols.Y + position.getY(),
            Symbols.Direction + position.getDirection()[0]
        ])
    }

    sendError(): void {
        this.nasaAntenna.received([Symbols.Error])
    }
}
