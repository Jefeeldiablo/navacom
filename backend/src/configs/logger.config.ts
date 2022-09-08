import { Logger } from 'tslog';

export class Log {

    private static instance: Log;
    private readonly log: Logger;

    private constructor() {
        this.log = new Logger({
            displayFilePath: 'hidden',
            displayFunctionName: false,
            displayInstanceName: false
        });
    }

    public static get(): Logger {
        if (!Log.instance) {
            Log.instance = new Log();
        }

        return Log.instance.log;
    }
}
