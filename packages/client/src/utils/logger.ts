export enum LogType {
    ReplayEvent,
    DocEvent,
    PromptEvent,
    RunEvent,
    SubmitEvent,
    InitialCode,
}

export class LogObj {
    lastUpdate: number;
    userId: string;
    taskId: string;
    initialCode: string;
    replayEvents: Array<{
        t: number;
        e: {
            c: Array<{
                r: {
                    sl: number;
                    sc: number;
                    el: number;
                    ec: number;
                };
                rl: number;
                ro: number;
                t: string;
                f: string;
            }>;
            r: string;
            u: string;
        };
    }>;
    docEvents: Array<{ t: number; e: any }>;
    promptEvents: Array<{ t: number; e: any }>;
    runEvents: Array<{ t: number; e: any }>;
    submitEvents: Array<{ t: number; e: any }>;

    constructor(userId: string, taskId: string) {
        this.lastUpdate = Date.now();
        this.userId = userId;
        this.taskId = taskId;
        this.initialCode = "";
        this.replayEvents = [];
        this.docEvents = [];
        this.promptEvents = [];
        this.runEvents = [];
        this.submitEvents = [];
    }
}

export const log = (
    taskId: string,
    userId: string | undefined,
    type: LogType,
    data: any
) => {
    const l = getLogObject(taskId, userId);

    switch (type) {
        case LogType.ReplayEvent:
            l.replayEvents.push({
                t: Date.now(),
                e: {
                    c: data.changes.map((c: any) => {
                        return {
                            r: {
                                sl: c.range.startLineNumber,
                                sc: c.range.startColumn,
                                el: c.range.endLineNumber,
                                ec: c.range.endColumn,
                            },
                            rl: c.rangeLength,
                            ro: c.rangeOffset,
                            t: c.text,
                            f: c.forceMoveMarkers ? "t" : "f",
                        };
                    }),
                    r: data.isRedoing ? "t" : "f",
                    u: data.isUndoing ? "t" : "f",
                },
            });

            break;

        case LogType.InitialCode:
            l.initialCode = data;

            break;

        case LogType.DocEvent:
            l.docEvents.push({ t: Date.now(), e: data });

            break;

        case LogType.PromptEvent:
            l.promptEvents.push({ t: Date.now(), e: data });

            break;

        case LogType.RunEvent:
            l.runEvents.push({ t: Date.now(), e: data });

            break;

        case LogType.SubmitEvent:
            l.submitEvents.push({ t: Date.now(), e: data });

            break;

        default:
            console.error(`wrong log type provided: ${type}`);

            return;
    }

    // TEST:
    if (l.replayEvents.length > 150) {
        console.log(JSON.stringify(l));
    }

    l.lastUpdate = Date.now();
};

const logMapMemory = new Map<string, LogObj>();

// all the logs for one single task of a particular user
export const getLogObject = (
    taskId: string,
    userId: string | undefined
): LogObj => {
    const uid = userId ? userId : "user";
    const key = getLogKey(taskId, uid);

    let memoryLog = logMapMemory.get(key);

    if (memoryLog) {
        return memoryLog;
    } else {
        const storageLog = localStorage.getItem(`log-${key}`);
        console.log(`reloading from storage: ${key}`);

        if (storageLog) {
            const logObj = JSON.parse(storageLog);
            logMapMemory.set(key, logObj);

            return logObj;
        } else {
            console.log(`initializing the first time: ${key}`);
            const logObj = new LogObj(uid, taskId);

            logMapMemory.set(key, logObj);

            return logObj;
        }
    }
};

const getLogKey = (taskId: string, userId: string) => {
    return `${taskId}-${userId}`;
};

setInterval(() => {
    const toBeDeleted = new Set<string>();

    logMapMemory.forEach((logObj, key) => {
        let lastUpdateStr = localStorage.getItem(`log-lastUpdate-${key}`);
        let lastUpdate = lastUpdateStr ? parseInt(lastUpdateStr) : 0;

        console.log(`${key} -> lastUpdate: ${lastUpdate}`);

        if (
            Date.now() - logObj.lastUpdate < 300000 &&
            logObj.lastUpdate - lastUpdate > 5000
        ) {
            console.log(
                `${key} -> saving -> f: ${Date.now() - logObj.lastUpdate} s: ${
                    logObj.lastUpdate - lastUpdate
                }`
            );
            // it has been updated in the last 5 minutes
            // and it has been updated in the last 5 seconds
            // -> needs to get saved
            localStorage.setItem(`log-${key}`, JSON.stringify(logObj));
            localStorage.setItem(
                `log-lastUpdate-${key}`,
                Date.now().toString()
            );
        } else if (Date.now() - logObj.lastUpdate > 300000) {
            // it has been updated in the last 5 minutes
            // -> needs to get deleted

            console.log(
                `${key} -> deleting -> f: ${
                    Date.now() - logObj.lastUpdate
                } s: ${logObj.lastUpdate - lastUpdate}`
            );

            toBeDeleted.add(key);
        }
    });

    toBeDeleted.forEach((key) => {
        logMapMemory.delete(key);
    });
}, 2500);
