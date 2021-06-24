import { RawInstruction } from '@/core/instructions/index'
import type { ThingType } from '@/core/types'
import { none, some, isNone, isSome } from 'fp-ts/es6/Option'
import type { Option } from 'fp-ts/es6/Option'
import { store } from '@/core'
import { convertNounToCharacter, getSpeciesByThingType } from '@/core/utils/thingType'
import type { NounType } from '@/core/types/nouns'
import { sleep } from '@/core/utils/time'
import { THING_MOVE_DURATION } from '@/core/app/configs'
import { Thing } from '@/core/things'

export class TransformInstruction extends RawInstruction {
  private readonly _originalName: string
  private readonly _originalTexture
  private _thingTypes: Option<Array<ThingType>>

  constructor(subject: Thing) {
    super(subject);

    // save original data
    this._originalName = this._subject.name
    this._originalTexture = this._subject.texture

    // init ThingTypes
    this._thingTypes = none
  }

  public addTransformName(name: ThingType): void {
    if (isSome(this._thingTypes)) {
      this._thingTypes.value.push(name)
    } else {
      this._thingTypes = some([name])
    }
  }

  public override async perform() {
    // ignore if instructions does not contain new names
    if (isNone(this._thingTypes)) return

    // cannot change 1 thing to multiple things yet, so we ignore instruction
    if (this._thingTypes.value.length > 1) return

    // wait YOU finish move animations.
    await sleep(THING_MOVE_DURATION)

    // change subject name
    const thingType = convertNounToCharacter(this._thingTypes.value[0] as NounType)
    this._subject.name = thingType as string

    // change subject texture
    const species = getSpeciesByThingType(thingType)
    await store.loadResourcesByName(species, [this._subject.name])
    const textureOption = store.getTextureByName(this._subject.name)
    if (isNone(textureOption)) throw new Error(`texture with name ${this._thingTypes.value[0]} does not exist`)
    this._subject.texture = textureOption.value
  }

  public override async unperform() {
    // unperform subject name
    this._subject.name = this._originalName

    // unperform subject texture
    this._subject.texture = this._originalTexture
  }
}