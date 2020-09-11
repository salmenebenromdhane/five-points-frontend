import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/User';
@Injectable({
    providedIn: 'root'
  })
export class UserService{
baseUrl="/api";

    constructor(private http:HttpClient) { }
   
    register(u:User){
        return  this.http.post(this.baseUrl+"/user/register",u);
      }

      login(login:any,pwd:any){
        return  this.http.get(this.baseUrl+"/user/login?login="+login+"&pwd="+pwd);
      }

      vote(ids,vote){
        return  this.http.get(this.baseUrl+"/user/vote?idSubject="+ids+"&vote="+vote,{responseType: 'text'});
      }
}