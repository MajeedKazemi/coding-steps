import normalizeUrl from "normalize-url";

export function createUrl(
    hostname: string,
    port: number,
    path: string
): string {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    return normalizeUrl(`${protocol}://${hostname}:${port}${path}`);
}

export function convertTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    return `${m}:${s}`;
}
