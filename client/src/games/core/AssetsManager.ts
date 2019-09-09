import { IAssetsManager, AssetType } from "./interfaces";

class AssetsManager implements IAssetsManager {
    private readonly ROOT_FOLDER_NAME: string = 'game-assets';
    private assets: Map<string, string> = new Map();

    public register(type: AssetType, name: string, file: string): void {
        const assetPath = `/${this.ROOT_FOLDER_NAME}/Runner/${type}/${file}`;

        this.assets.set(name, assetPath);
    }

    public getPathByName(name: string): string | undefined {
        return this.assets.get(name);
    }
}

export { AssetsManager }
