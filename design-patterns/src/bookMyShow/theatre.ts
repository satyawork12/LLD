import type { Screen } from "./screen.js";

export class Theatre {
    constructor(
        public readonly id: string,
        public readonly address: string,
        public readonly city: string,
        public readonly screens: Screen[] = [],
    ) { }
}
