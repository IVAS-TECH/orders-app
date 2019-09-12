export default class ServerFile {
    readonly name: string;
    readonly id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }

    get url(): string {
        return `/api/file/${this.id}/${this.name}`;
    }
};