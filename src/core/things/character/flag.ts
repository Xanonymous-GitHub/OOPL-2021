import {Thing} from '../';
import {Direction} from '../../types/things';
import {Species} from '../../resource';
import {Texture} from 'pixi.js';

class Flag extends Thing {
    public handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }

    public handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        return Promise.resolve(false);
    }

    public handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const createFlag = (
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
) => new Flag(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)