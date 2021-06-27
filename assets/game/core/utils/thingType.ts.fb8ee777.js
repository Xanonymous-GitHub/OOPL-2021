import {C as s} from "../types/characters.ts.00fc2b75.js";
import {S as e} from "../../../../TheGameFramework/ResourceManager.js";
import {N as r} from "../types/nouns.ts.d68a0573.js";
import {O as t} from "../types/operators.ts.01a24b60.js";
import {P as o} from "../types/properties.ts.9ca008cf.js";

const convertNounToCharacter = s => s.substr(5), isNoun = s => Object.values(r).includes(s),
  getSpeciesByThingType = r => {
    if ((e => Object.values(s).includes(e))(r)) return e.CHARACTERS;
    if (isNoun(r)) return e.NOUNS;
    if ((s => Object.values(t).includes(s))(r)) return e.OPERATORS;
    if ((s => Object.values(o).includes(s))(r)) return e.PROPERTIES;
    throw new Error(`ThingType ${r} does not exist in all Species`)
  };
export {convertNounToCharacter as c, getSpeciesByThingType as g, isNoun as i};
