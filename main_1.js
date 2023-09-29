import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let retries = 0;
        const maxRetries = 10;

        const repeatFct = async () => {
            await setTimeout(() => {
                retries += 1;

                if (retries >= maxRetries) {
                    reject();
                } else if (!dbClient.isAlive()) {
                    repeatFct();
                } else {
                    resolve();
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();
