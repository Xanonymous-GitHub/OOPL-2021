import {Sprite, Texture} from 'pixi.js'
import {Direction} from '../types/things';
import {Factor} from '../types';
import {ThingSetup} from '../types/things';
import {ThingController} from '../observer';
import {RuleController} from '../observer/rule';
import {MapController} from '../observer/map';

export abstract class Thing extends Sprite {
    private _blockX: number // start from 0
    private _blockY: number // start from 0
    private readonly _maxBlockX: number
    private readonly _maxBlockY: number
    private readonly _blockSize: number
    private _towards: Direction
    protected _thingController!: ThingController
    protected _ruleController!: RuleController
    protected _mapController!: MapController

    protected constructor(
        name: string,
        texture: Texture,
        defaultBlockX: number,
        defaultBlockY: number,
        blockSize: number,
        maxBlockX: number,
        maxBlockY: number,
        defaultTowards?: Direction
    ) {
        // provide the texture to the sprite.
        super(texture)

        // set name
        this.name = name

        // setup default positions.
        this._blockX = defaultBlockX
        this._blockY = defaultBlockY

        // setup maximum block point on map.
        this._maxBlockX = maxBlockX
        this._maxBlockY = maxBlockY

        // setup default sprite towards.
        this._towards = defaultTowards ?? 0;

        // setup block size.
        this._blockSize = blockSize
        this.height = blockSize
        this.width = blockSize

        // center the sprite's anchor point.
        this.anchor.set(0.5)

        // move to the point
        this.x = (this._blockX + 0.5) * this._blockSize
        this.y = (this._blockY + 0.5) * this._blockSize
    }

    public bindThingController(thingController: ThingController): void {
        this._thingController = thingController
    }

    public bindRuleController(ruleController: RuleController): void {
        this._ruleController = ruleController
    }

    public bindMapController(mapController: MapController): void {
        this._mapController = mapController
    }

    public setup(options: Pick<ThingSetup, 'defaultBlockX' | 'defaultBlockY' | 'defaultTowards'>) {
        this.blockX = options.defaultBlockX
        this.blockY = options.defaultBlockY
        this.towards = options.defaultTowards
    }

    public get blockX(): number {
        return Number(this._blockX)
    }

    public set blockX(x: number) {
        this._blockX = x
        this.x = (x + 0.5) * this._blockSize
    }

    public get blockY(): number {
        return Number(this._blockY)
    }

    public set blockY(y: number) {
        this._blockY = y
        this.y = (y + 0.5) * this._blockSize
    }

    public set towards(side: Direction) {
        this._towards = side
    }

    public get towards(): Direction {
        return this._towards
    }

    public atRightEdge(): boolean {
        return this.blockX === this._maxBlockX
    }

    public atLeftEdge(): boolean {
        return this.blockX === 0
    }

    public atTopEdge(): boolean {
        return this.blockY === 0
    }

    public atBottomEdge(): boolean {
        return this.blockY === this._maxBlockY
    }

    public async moveUp(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.atTopEdge()) {
                reject()
            } else {
                this.blockY--
            }
            resolve()
        })
    }

    public async moveDown(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.atBottomEdge()) {
                reject()
            } else {
                this.blockY++
            }
            resolve()
        })
    }

    public async moveRight(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.atRightEdge()) {
                reject()
            } else {
                this.blockX++
            }
            resolve()
        })
    }

    public async moveLeft(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this.atLeftEdge()) {
                reject()
            } else {
                this.blockX--
            }
            resolve()
        })
    }

    public abstract handleEncounter(visitor: Thing, direction: Direction): Promise<boolean>

    public abstract handleBesides(visitor: Thing, direction: Direction): Promise<void>
}

abstract class Factory {
    public abstract createInstance<T>(_factor: Factor<T>): T;
}

export class ThingFactory extends Factory {
    public createInstance<T>(factor: Factor<T>, ...args: Array<any>): T {
        return new factor(...args)
    }
}
