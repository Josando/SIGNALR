"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var signalr_client_1 = require("@aspnet/signalr-client");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.nick = '';
        this.message = '';
        this.messages = [];
        this.successMessage = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.nick = window.prompt('Your name:', 'John');
        this._hubConnection = new signalr_client_1.HubConnection('http://localhost:5000/chat');
        this._hubConnection
            .start()
            .then(function () { return console.log('Connection started!'); })
            .catch(function (err) { return console.log('Error while establishing connection :('); });
        this._hubConnection.on('sendToAll', function (nick, receivedMessage) {
            var text = nick + ": " + receivedMessage;
            _this.messages.push(text);
        });
        this._hubConnection.on('send', function (nick, receivedMessage) {
            var text = nick + ": " + receivedMessage;
            console.log(receivedMessage);
            _this.messages.push(text);
        });
        var promise = this.executePost();
        promise.then(function (response) { return _this.onClickSuccess(response); });
    };
    AppComponent.prototype.onClick = function () {
        var _this = this;
        var promise = this.executePost();
        promise.then(function (response) { return _this.onClickSuccess(response); });
    };
    AppComponent.prototype.onClickSuccess = function (response) {
        this.successMessage = response;
    };
    AppComponent.prototype.executePost = function () {
        var a = {
            namber: '1',
            nombre: 'pepe'
        };
        var promise = this.http.post("/api/prueba/Get", a)
            .toPromise()
            .then(function Success(response) {
            var body = response.json();
            console.log(body);
            return body;
        });
        return promise;
    };
    AppComponent.prototype.sendMessage = function () {
        this._hubConnection
            .invoke('sendToAll', this.nick, this.message)
            .catch(function (err) { return console.error(err); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map