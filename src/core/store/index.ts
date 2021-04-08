import {createServices} from './services';
import {ContainerService} from './services/container'
import {CommandService, Command} from './services/command'
import {SpriteService} from './services/sprite'
import {TextureService} from './services/texture'
import {DispatchServerService} from './services/dispatchServer';
import {Container, Sprite} from 'pixi.js';
import {ResourceMap} from '../resource';
import {Species} from '../resource';
import {InstructionDispatchServer} from '../observer';
import {RuleController} from '../observer/rule';

const createContainerStore = (containerService: ContainerService) => {
    return {
        getContainerByName: (name: string) => containerService.getContainerByName(name),
        getNonEmptyContainerByIndex: (index: number) => containerService.getNonEmptyContainerByIndex(index),
        getEmptyContainer: () => containerService.getEmptyContainer(),
        addContainer: (container: Container, name: string, index?: number) => containerService.addContainer(container, name, index),
        hasContainerById: (id: string) => containerService.hasContainerById(id),
        hasContainerByName: (name: string) => containerService.hasContainerByName(name),
        hasAnyContainer: () => containerService.hasAnyContainer()
    }
}

const createCommandStore = (commandService: CommandService) => {
    return {
        nextCommand: () => commandService.nextCommand(),
        addCommand: (command: Command) => commandService.addCommand(command),
        clearCommand: () => commandService.clearCommand(),
        initCommandWatchService: () => commandService.initCommandWatchService()
    }
}

const createSpriteStore = (spriteService: SpriteService) => {
    return {
        getSpriteByName: (name: string) => spriteService.getSpriteByName(name),
        getSpritesByName: (name: string, amount: number) => spriteService.getSpritesByName(name, amount),
        getSpriteAmountByName: (name: string) => spriteService.getSpriteAmountByName(name),
        addSpriteByName: (name: string, sprite: Sprite) => spriteService.addSpriteByName(name, sprite),
        addSpritesByName: (name: string, sprites: Array<Sprite>) => spriteService.addSpritesByName(name, sprites)
    }
}

const createTextureStore = (textureService: TextureService) => {
    return {
        addResourceMap: (resourceMap: ResourceMap) => textureService.addResourceMap(resourceMap),
        loadResourcesByName: (species: Species, names: Array<string>) => textureService.loadResourcesByName(species, names),
        getLoadingProgress: () => textureService.getLoadingProgress(),
        getTextureByName: (name: string) => textureService.getTextureByName(name)
    }
}

const createDispatchServerStore = (dispatchServerService: DispatchServerService) => {
    return {
        setDispatchServer: (server: InstructionDispatchServer) => dispatchServerService.setDispatchServer(server),
        getDispatchServer: () => dispatchServerService.getDispatchServer(),
        initDispatchServer: () => dispatchServerService.initDispatchServer(),
        disposeDispatchServer: () => dispatchServerService.disposeDispatchServer(),
        setRuleController: (controller: RuleController) => dispatchServerService.setRuleController(controller),
        getRuleController: () => dispatchServerService.getRuleController()
    }
}

export const createGameStore = () => {
    const services = createServices()

    const containerStore = createContainerStore(services.containerService)
    const commandStore = createCommandStore(services.commandService)
    const spriteStore = createSpriteStore(services.spriteService)
    const textureStore = createTextureStore(services.textureService)
    const dispatchServerStore = createDispatchServerStore(services.dispatchServerService)

    return {
        ...containerStore,
        ...commandStore,
        ...spriteStore,
        ...textureStore,
        ...dispatchServerStore
    }
}

export type GameStore = ReturnType<typeof createGameStore>
