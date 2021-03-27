import { Injectable } from '@angular/core';

import { serverUrl } from '../globals/globals';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserById(id): Observable<IUser>{
  return this.http.get<IUser>(serverUrl+'/user/getById/'+id)
}

getByUsername(username): Observable<IUser>{
  return this.http.get<IUser>(serverUrl+'/user/getByUsername/'+username)
}

updateLastAccess(idUser){
  return this.http.post(serverUrl+'/user/updateLastAccess/'+idUser,{"lastAccess": moment().valueOf() },{responseType:'text'})

}

getAllUsers(): Observable<IUser[]>{
  return this.http.get<IUser[]>(serverUrl+'/user/getAll/')
}

saveUser(user){

  return this.http.post(serverUrl+'/user/save',user,{responseType: 'text'})
}

}

