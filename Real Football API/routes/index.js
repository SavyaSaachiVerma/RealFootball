/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./players.js')(router));
    app.use('/api', require('./matches.js')(router));
    app.use('/api', require('./teams.js')(router));
    app.use('/api', require('./leagues.js')(router));
    app.use('/api', require('./leagueID.js')(router));
    app.use('/api', require('./teamID.js')(router));
    app.use('/api', require('./playerID.js')(router));
    app.use('/api', require('./users.js')(router));
        app.use('/api', require('./userID.js')(router));
}