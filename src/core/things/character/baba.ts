import {Thing} from '../';
import {Direction} from '../../types/things';

export class Baba extends Thing {
    public async handleBesides(visitor: Thing, direction: Direction): Promise<void> {

    }

    public async handleEncounter(visitor: Thing, direction: Direction): Promise<boolean> {
        return true
    }
}