import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {}

  /**
   *
   * Perform a GET request to "user" url, with HTTP Basic authentication credentials in headers if they are provided.
   *
   * @param credentials HTTP Basic authentication credentials.
   * @param callback Optional callback argument that we can use to execute some code if the request is successful.
   */
  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
        if (response['name']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

}
}
