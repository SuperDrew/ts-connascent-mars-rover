import {Coordinate} from "./Coordinate";
import {Direction} from "./Direction";
import {format} from "util";
import deepEqual = require("deep-equal");

export class Position {
    private coordinate: Coordinate;
    private direction: Direction;

    constructor(x: number, y: number, direction: Direction) {
        this.coordinate = new Coordinate(x, y);
        this.direction = direction;
    }

    turnLeft(): Position {
        return new Position(this.coordinate.x, this.coordinate.y, this.direction.turnLeft())
    }

    turnRight(): Position {
        return new Position(this.coordinate.x, this.coordinate.y, this.direction.turnRight())
    }

    moveForward() {
        let coordinate: Coordinate = new Coordinate(0, 0);
        let s = this.direction.enumValue();
        if (s === "NORTH") {
            coordinate = this.coordinate.moveNorth()
        } else if (s === "EAST") {
            coordinate = this.coordinate.moveEast()
        } else if (s === "SOUTH") {
            coordinate = this.coordinate.moveSouth()
        } else if (s === "WEST") {
            coordinate = this.coordinate.moveWest();
        }
        return new Position(coordinate.x, coordinate.y, this.direction);
    }

    toString(): string {
        return format("%s %s", this.coordinate.toString(), this.direction.toString())
    }

    equals(o: Position): boolean {
        return deepEqual(this.coordinate, o.coordinate) && this.direction === o.direction;
    }

    getX(): number {
        return this.coordinate.x;
    }

    getY(): number {
        return this.coordinate.y;
    }

    getDirection(): string {
        return this.direction.enumValue();
    }


}
