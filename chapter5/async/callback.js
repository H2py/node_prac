const DB = [];

function register(user) {
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`register ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            resolve(user);
        } else {
            reject(new Error("Save DB Error"));
        }
    });
}

function sendEmail(user) {
    console.log(`email to ${user.email}`);
    return Promise.resolve(user);
}

function getResult(user) {
    return `success register ${user.name}`;
}

function registerByPromise(user) {
    return register(user)
        .then(sendEmail)
        .then(getResult);
}

const myUser = { email: "andy@test.com", password: "1234", name: "andy" };
registerByPromise(myUser).then(console.log).catch(console.error);
