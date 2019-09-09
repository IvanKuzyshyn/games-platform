import { Registry } from "../core/Registry";
import { RunnerRenderer } from "./Runner";

const registry = new Registry();

registry.register({
    name: 'runner',
    title: 'Runner',
    renderer: RunnerRenderer,
    type: 'arcade'
});

registry.register({
    name: 'runner2',
    title: 'Runner2',
    renderer: RunnerRenderer,
    type: 'arcade'
});

export { registry as GamesRegistry }
