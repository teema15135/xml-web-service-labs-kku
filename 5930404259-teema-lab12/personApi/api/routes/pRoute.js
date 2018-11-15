'use strict';
module.exports = function(app) {
    var controll = require('../controllers/pController')

    app.route('/persons')
        .get(controll.listAllPersons)
        .post(controll.createPerson)

    app.route('/persons/:personId')
        .get(controll.viewPerson)
        .put(controll.updatePerson)
        .delete(controll.deletePerson)
}
