;
(function(exports) {
        "use strict";

        Parse.TxMexRouter = Parse.Router.extend({
            initialize: function() {
                console.log("parserouterinit");
                this.collection = new Parse.ClassList();
                this.model = new Parse.ClassModel();
                this.sessionmodel = new Parse.Session();
                this.homeview = new Parse.HomeView({
                    model: this.model
                });
                this.usercollection = new Parse.userCollection();
                this.markview = new Parse.MarkMenuView();
                this.usermodel = new Parse.UserModel();
                this.classview = new Parse.ClassView({
                    model: this.usermodel
                });
                this.commentsview = new Parse.CommentView();


                Parse.history.start();
            },
            routes: {
                "viewMark": "Mark",
                "viewClasses": "classes",
                "collection": "collection",
                "signup/login": "signuplogin",
                "comments": "comments",
                "register": "register",
                "logout": "logout",
                "default": "oops",
                "*default": "homepage"
            },
            homepage: function() {
                this.homeview.render();
            },
            Mark: function() {
                var self = this
                this.markview.render().then(function() {
                    self.markview.videorender()
                })
            },
            classes: function() {
                var self = this
                this.classview.render().then(function() {
                    self.classview.startGMaps()
                })
            },
            comments: function() {
                this.commentsview.render();
            },
            collection: function() {
                var self = this;
                this.collection.fetch();
            },
            isLoggedIn: function() {
                this.user = Parse.User.current();

                if (!this.user) {
                    this.navigate("login", {
                        trigger: true
                    });
                    return false;
                }
                return true;
            },
            oops: function() {
                if (!this.isLoggedIn()) return;
                var query = new Parse.Query(Parse.UserModel);
                query.equalTo("user", this.user);
                this.collection.query = query;
                this.collection.fetch();
                this.loginsignupview.render();
            },
            signuplogin: function() {
                this.authview.render();
            },
            register: function() {
                this.registerview.render();
            },
            logout: function() {
                Parse.User.logout();
                this.isLoggedIn();
            }

        })

        Parse.HomeView = Parse.TemplateView.extend({
            el: ".container",
            view: "homepage"
        })

        Parse.ClassModel = Parse.Object.extend({
            className: "ClassModel",
            defaults: {
                "classes": "false",
                "title": "not title given",
                "chvritbtn": "false"
            }
        })

        Parse.ClassList = Parse.Collection.extend({
            model: Parse.Classmodel
        })

        Parse.ClassView = Parse.TemplateView.extend({
            el: ".container",
            view: "stntClassView",
            events: {
                "click #viewClasses": "trainingViewPage",
                "submit form.register": "register",
                "submit form.login_signup": "login",
                "click #comments": "signup"
            },
            trainingViewPage: function(event) {
                event.preventDefault();
            },
            register: function(event) {
                event.preventDefault();
                var data = {
                    username: this.el.querySelector(".register input[name='email']").value,
                    password: this.el.querySelector(".register input[name='password']").value
                }
                var result = Parse.User.logIn(data.username, data.password);
                result.then(function() {
                    window.location.hash = "#home";
                })
                result.fail(function(err) {
                    alert(err.message);
                })
            },
            login: function(event) {
                event.preventDefault();
                var data = {
                    username: this.el.querySelector(".login input[name='email']").value,
                    password: this.el.querySelector(".login input[name='password']").value
                }
                var result = Parse.User.logIn(data.username, data.password);
                result.then(function() {
                    window.location.hash = "#comments"
                })
                result.fail(function(error) {
                    alert(error.message);
                })
            },
            signup: function(event) {
                event.preventDefault();
                var data = {
                    username: this.el.querySelector(".register input[name='email']").value,
                    password1: this.el.querySelector(".register input[name='password1']").value,
                    password2: this.el.querySelector(".register input[name='password2']").value
                }
                if (data.password1 !== data.password2) {
                    alert("Passwords must match");
                    return;
                }
                var user = new Parse.User();
                user.set('username', data.username);
                user.set('email', data.username);
                user.set('password', data.password1);

                var result = user.signUp();
                result.then(function(user) {
                    window.location.hash = "#comments";
                    alert("Welcome," + user.get("username"));
                })
                result.fail(function(err) {
                    alert(err.message);
                })
            },
            startGMaps: function() {
                console.log(document.querySelector('#map'))
                this.map = new GMaps({
                    // div: ".stuntwrapper",
                    div: "#map",
                    lat: 29.934777,
                    lng: -95.579013,
                })

                this.map.addMarker({
                    lat: 29.934777,
                    lng: -95.579013,
                    title: "blah",

                    click: function(e) {
                        alert('You clicked in this marker');
                    }
                });
            }

        })

        Parse.Session = Parse.Object.extend({
            className: "Session",
            defaults: {
                "signup": "false",
                "login": "not logged in"
            }
        })

        Parse.MarkMenuView = Parse.TemplateView.extend({
            el: ".container",
            view: "mark",
            markMenuPage: function(event) {
                event.preventDefault();
            },
            videorender: function($) {

                console.log(document.querySelector('#player'));

                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                var player;

                window.onYouTubeIframeAPIReady = function() {
                    player = new YT.Player('player', {
                        div: '#player',
                        // height: '390',
                        // width: '640',
                        videoId: 'FKVbdVXcKs8',
                        events: {
                            onReady: 'onPlayerReady',
                            onStateChange: 'onPlayerStateChange'
                        }
                    });
                }

                function onPlayerReady(event) {
                    event.target.playVideo();
                }
                var done = false;

                function onPlayerStateChange(event) {
                    if (event.data == YT.PlayerState.PLAYING && !done) {
                        setTimeout(stopVideo, 6000);
                        done = true;
                    }
                }

                function stopVideo() {
                    player.stopVideo();
                }
                return player;
            }
        })

        Parse.UserModel = Parse.Object.extend({
            className: "UserModel",
            defaults: {
                "isRegistered": false,
                "loggedIn": false
            },
            initialize: function() {
                this.on('change', function() {
                    this.save();
                })
            }
        })

        Parse.userCollection = Parse.Collection.extend({
            model: Parse.UserModel
        })

        Parse.CommentView = Parse.TemplateView.extend({
            el: ".container",
            view: "comments",
            events: {
                "click #comments": "commentsViewPage",
            },
            commentsViewPage: function(event) {
                    event.preventDefault();
                }
                })
        })(typeof module === "object" ? module.exports : window)