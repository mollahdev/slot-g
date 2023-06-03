interface Config {
    start: number;
    end: number;
    gap: number;
    ampm: boolean;
    noTime: boolean;
    disabled: [number, number][];
    formatedHours: boolean;
}
export default function slotg(config?: Partial<Config>): {
    [key: number]: string;
} | boolean;
export {};
