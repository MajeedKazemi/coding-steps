import normalizeUrl from "normalize-url";

export function createUrl(
    hostname: string,
    port: number,
    path: string
): string {
    let host = hostname;

    if (host.startsWith("http") || host.startsWith("https")) {
        host = host.substring(host.indexOf("://") + 3);
    }

    if (host.includes(":")) {
        host = host.substring(0, host.indexOf(":"));
    }

    const protocol = location.protocol === "https:" ? "wss" : "ws";

    let url = `${host}${path}`;

    if (import.meta.env.DEV) {
        url = `${host}:${port}${path}`;
    }

    return normalizeUrl(`${protocol}://${url}`);
}

export function convertTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    let sStr = s.toString();
    let mStr = m.toString();

    if (s < 10) sStr = "0" + sStr;
    if (m < 10) mStr = "0" + mStr;

    return `${mStr}:${sStr}`;
}
