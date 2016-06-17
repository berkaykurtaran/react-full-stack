module.exports = {

    dbSettings:{
        "development": {
            "dialect": "sqlite",
            "storage": "./red.development.sqlite"
        },
        "test": {
            "username": "root",
            "password": null,
            "database": "red_test",
            "host": "127.0.0.1",
            "dialect": "mysql"
        },
        "production": {
            "username": "root",
            "password": null,
            "database": "red_prod",
            "host": "127.0.0.1",
            "dialect": "mysql"
        }
    },

    sessionOptions: {
        secret: 'somesecretkeythatweshouldgenerateandstoresomewhere', //TODO make real secret
        saveUninitialized: true, // save new sessions
        resave: false, // do not automatically write to the session store
        cookie: {
            httpOnly: true,
            maxAge: 2419200000
        } // TODO set secure to true when https is used
    }

};