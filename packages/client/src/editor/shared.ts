import normalizeUrl from "normalize-url";

export function createUrl(
    hostname: string,
    port: number,
    path: string
): string {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    return normalizeUrl(`${protocol}://${hostname}:${port}${path}`);
}
