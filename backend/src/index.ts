import { Db, DataDefault, Log, Message } from './configs';
import { Api, TopicController } from './controllers';

(() => {
    Db.getInstance();

    const start = new Date().getTime();
    DataDefault.getInstance().insertDataDefault()
        .subscribe({
            next: () => {
                const end = (new Date().getTime() - start);
                Log.get().info(`${Message.DATA_SAVE_SUCCESS}${end}ms`);

                const PORT = 3000;
                const app = Api.getInstance().getApp();
                new TopicController(app);
                app.listen(PORT, () => Log.get().info(`${Message.APP_LISTENING}${PORT}`));
            },
            error: (error) => Log.get().error(Message.DATA_SAVE_ERROR, error)
        });
})();
