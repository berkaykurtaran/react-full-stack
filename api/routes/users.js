var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply when needed
var User = require('../models').User;

var setUserRoutes = function (router) {

    router.get('/api/v1/users/:id',
        function (req, res) {
          console.log(User);
            var userId = req.params.id;
            User.findOne({where:{id:userId}}).then(function (user) {
                return res.json(user)
            });
        }
    );

};

module.exports = setUserRoutes;
