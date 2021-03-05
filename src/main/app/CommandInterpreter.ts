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

enum CommandListIndex {
    InitializationCommand = 0,
    StartingPositionCommand = 1,
    MovementCommand = 2,

}

export class CommandInterpreter {
    private letterToDirection: Map<string, Direction> = new Map([
        [Symbols.North, Direction.NORTH()],
        [Symbols.East, Direction.EAST()],
        [Symbols.South, Direction.SOUTH()],
        [Symbols.West, Direction.WEST()]
    ]);

    translate(commands: string): Array<ICommand> {
        let allCommands = new Array<ICommand>();
        const lines: string[] = commands.split(Symbols.CommandSeparator);
        allCommands.push(this.getInitializationCommand(lines[CommandListIndex.InitializationCommand]));
        allCommands.push(this.getStartingPositionCommand(lines[CommandListIndex.StartingPositionCommand]));
        allCommands.push(...this.getMovementCommands(lines[CommandListIndex.MovementCommand]));

        return allCommands;
    }

    private getMovementCommands(movementCommandString: string): ICommand[] {
        let movementCommands = new Array<ICommand>();
        for (let command of movementCommandString) {
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

    private getInitializationCommand(initializationCommandString: string): InitializationCommand {
        let topRight: string[] = initializationCommandString.split(" ");
        return new InitializationCommand(new Coordinate(parseInt(topRight[0]), parseInt(topRight[1])));
    }

    private getStartingPositionCommand(startingPositionCommandString: string): StartingPositionCommand {
        let coords: string[] = startingPositionCommandString.split(" ");

        let coordinate: Coordinate = new Coordinate(parseInt(coords[0]), parseInt(coords[1]));
        let direction: Direction = <Direction>this.letterToDirection.get(coords[2]);
        let position: Position = new Position(coordinate.x, coordinate.y, direction);
        return new StartingPositionCommand(position);
    }


}
