import {GameEntity, GameQueryEntity} from "./types";
import {Renderer} from "./Renderer";

class Registry {
    private games: Map<String, GameEntity> = new Map();

    public register(game: GameEntity): void {
        this.games.set(game.name, game);
    }

    public unregister(name: String ): void {
        this.games.delete(name);
    }

    public mapGamesForQuery(): GameQueryEntity[] {
        const collection: GameEntity[] = Array.from(this.games.values());

        return collection.map(({ name, title, type }, index) => ({
            id: index,
            name,
            title,
            type, __typename: 'Game'
        }))
    }

    public getGameRendererByName(name: string): Renderer {
        const game = this.games.get(name);

        if (!game) {
            throw new Error('Game not found')
        }

        return game.renderer;
    }
}

export { Registry }
