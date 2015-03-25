;
(function(exports) {
    "use strict";

    Parse.TxMexRouter =  Parse.Router.extend({
        initialize: function(){
            console.log("parserouterinit");
            Parse.history.start();
        },
        router: {

            "signup/login": "signuplogin",
            "register": "register",
            "logout": "logout",
            "*default":  "oops"
        },
        isLoggedIn: function(){
            this.user = Parse.User.current();

            if(!this.user){
                this.navigate("login", {trigger: true});
                return false;
            }
            return true;
        },
         oops: function(){
            if(!this.isLoggedIn()) return;
            var query = new Parse.Query(Parse.UserModel);
            query.equalTo("user", this.user);
            this.collection.query = query;
            this.collection.fetch();
            this.loginsignupview.render();
         },
         signuplogin: function(){
            this.authview.render();
        },
         register: function(){
            this.registerview.render();
        },
        logout: function(){
            Parse.User.logout();
            this.isLoggedIn();
        }
    })

Parse.UserModel = Parse.Object.extend({
    className: "UserModel",
    defaults: {
        "isRegistered": false;
        "loggedIn": false;
    },
    initialize: function(){
        this.on('change', function(){
            this.save();
        })
    }
})

Parse.userCollection: Parse.Collection.extend({
    model: UserModel
})

Parse.AuthView =  Parse.