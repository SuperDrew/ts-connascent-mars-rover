import {INasaAntenna} from "../main/infrastructure/spacecomm/INasaAntenna";
import {MarsRoverSender} from "../main/infrastructure/spacecomm/MarsRoverSender";
import {mock} from "jest-mock-extended";
import {Position} from "../main/model/Position";
import {Direction} from "../main/model/Direction"

describe('Test: MarsRoverSender', () => {
    it('should send message correctly', () => {
        const nasaAntenna: INasaAntenna = mock<INasaAntenna>();
        let marsRoverSender: MarsRoverSender = new MarsRoverSender(nasaAntenna);

        const position = new Position(6, 99, Direction.SOUTH())
      marsRoverSender.send(position);

        expect(nasaAntenna.received).toBeCalledWith(["X6", "Y99", "DS"])
    });

    it('should send error message', () => {
        const nasaAntenna: INasaAntenna = mock<INasaAntenna>();
        let marsRoverSender: MarsRoverSender = new MarsRoverSender(nasaAntenna);

        marsRoverSender.sendError();

        expect(nasaAntenna.received).toBeCalledWith(["ER"])
    });
})
