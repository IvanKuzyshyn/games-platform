export enum AssetType {
    IMAGE = 'image',
    WALLPAPER = 'wallpaper',
    SOUND = 'sound'
}

export interface IAssetsManager {
    register(type: AssetType, name: string, file: string): void;
    getPathByName(name: string): string | undefined;
}
