export class ComponentStack {

    componentIds: string[] = [];
    rootId: string;

    constructor() {
    }

    push(compId: string) {
        console.log(this.componentIds)
        if (!this.includes(compId)) {
            this.componentIds.push(compId);
        }
    }

    pop(): string {
        console.log(this.componentIds)
        return this.componentIds.pop();
    }

    getLast(): string {
        return this.componentIds[this.componentIds.length - 1];
    }

    includes(compId: string) : boolean {
        return this.componentIds.includes(compId);
    }


    getPrevious(): string {
        this.pop();
        return this.componentIds && this.componentIds.length > 0 ? this.getLast() : '';
    }


    clear() {
        this.componentIds = []
    }
}