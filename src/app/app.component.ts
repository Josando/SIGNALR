import { Component } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private _hubConnection: HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];
  successMessage: string = '';

  constructor(private http: Http) {

  }
 
  ngOnInit() {
    this.nick = window.prompt('Your name:', 'John');

    Observable.forkJoin([this.executePost()])
      .subscribe((response) => {
        console.log('promesa realizada');
      });

    this._hubConnection = new HubConnection('http://localhost:5000/chat');

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });

    this._hubConnection.on('send', (nick: string, receivedMessage: JSON) => {
      const text = `${nick}: ${receivedMessage}`;
      console.log(receivedMessage);
      this.messages.push(text);
    });

    //var promise = this.executePost();
    //promise.then(response => this.onClickSuccess(response));
  }

//   var promises = [getMessageCount(), getPeople()];
//return $q.all(promises).then(function () {
//  logger.info('Activated Dashboard View');

  onClick() {
    var promise = this.executePost();
    promise.then(response => this.onClickSuccess(response));
  }

  onClickSuccess(response: string) {
    this.successMessage = response;
  }

  executePost(): Promise<any> {
    var a = {
      namber: '1',
      nombre: 'pepe'
    }

    var promise = this.http.post("/api/prueba/Get", a)
      .toPromise()
      .then(  
      function Success(response) {
        let body = response.json();
        console.log(body);
        return body;
      }
      );
    return promise;
  }

  public sendMessage(): void {
    this._hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .catch(err => console.error(err));
  }




}




