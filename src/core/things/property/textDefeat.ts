import {Thing} from '../index';
import {Direction} from '../../types/things';
import {Species} from '../../resource';
import {Texture} from 'pixi.js';
import {generalHandleEncounterMixin} from '../_mixins/handleEncounter';

class TextDefeat extends Thing {
    public handleBeside(visitor: Thing, visitorBeside: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async handleEncounter(visitor: Thing, visitorFrom: Direction): Promise<boolean> {
        return await generalHandleEncounterMixin(this, visitor, visitorFrom, this._ruleController, this._mapController, this._thingController)
    }

    public handleLeave(visitor: Thing, visitorLeavesFrom: Direction): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export const createTextDefeat = (
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
) => new TextDefeat(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)