import { Renderer } from "./Renderer";

export type GameEntity = {
    name: String,
    title: String,
    renderer: Renderer,
    type: String
}

export type GameQueryEntity = {
    name: String,
    title: String,
    type: String,
    __typename: 'Game'
}
