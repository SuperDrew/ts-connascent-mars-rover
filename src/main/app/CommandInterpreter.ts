import {Direction} from "../model/Direction";
import {ICommand} from "../commands/ICommand";
import {TurnLeftCommand} from "../commands/TurnLeftCommand";
import {MoveForwardCommand} from "../commands/MoveForwardCommand";
import {TurnRightCommand} from "../commands/TurnRightCommand";
import {InitializationCommand} from "../commands/InitializationCommand";
import {Coordinate} from "../model/Coordinate";
import {Position} from "../model/Position";
import {StartingPositionCommand} from "../commands/StartingPositionCommand";
import {Symbols} from "../model/Symbols"

export class CommandInterpreter {
    private letterToDirection: Map<string, Direction> = new Map([
        [Symbols.North, Direction.NORTH()],
        [Symbols.East, Direction.EAST()],
        [Symbols.South, Direction.SOUTH()],
        [Symbols.West, Direction.WEST()]
    ]);

    translate(commands: string): Array<ICommand> {
        let allCommands = new Array<ICommand>();
        allCommands.push(this.getInitializationCommand(commands));
        allCommands.push(this.getStartingPositionCommand(commands));
        allCommands.push(...this.getMovementCommands(commands));

        return allCommands;
    }

    private getMovementCommands(commands: string): ICommand[] {
        let movementCommands = new Array<ICommand>();
        let lines: string[] = commands.split(Symbols.CommandSeparator);
        for (let command of Array.from(lines[2])) {
            switch (command) {
                case Symbols.TurnLeft:
                    movementCommands.push(new TurnLeftCommand());
                    break;
                case Symbols.MoveForward:
                    movementCommands.push(new MoveForwardCommand());
                    break;
                case Symbols.TurnRight:
                    movementCommands.push(new TurnRightCommand());
                    break;
            }
        }
        return movementCommands;
    }

    private getInitializationCommand(commands: string): InitializationCommand {
        let lines: string[] = commands.split(Symbols.CommandSeparator);
        let topRight: string[] = lines[0].split(" ");
        return new InitializationCommand(new Coordinate(parseInt(topRight[0]), parseInt(topRight[1])));
    }

    private getStartingPositionCommand(commands: string): StartingPositionCommand {
        let lines: string[] = commands.split(Symbols.CommandSeparator);
        let coords: string[] = lines[1].split(" ");

        let coordinate: Coordinate = new Coordinate(parseInt(coords[0]), parseInt(coords[1]));
        let direction: Direction = <Direction>this.letterToDirection.get(coords[2]);
        let position: Position = new Position(coordinate.x, coordinate.y, direction.toString());
        return new StartingPositionCommand(position);
    }


}
