import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/User';
import { SubjectModel } from 'src/models/SubjectModel';
@Injectable({
    providedIn: 'root'
  })
export class SubjectService{
baseUrl="/api";

    constructor(private http:HttpClient) { }
   
    addSubject(id,title,desc){
        return  this.http.get(this.baseUrl+"/subject/addSubject?u="+id+"&titre="+title+"&description="+desc);
      }

      allSubjects(){
        return  this.http.get(this.baseUrl+"/subject/allSubjects");
      }
}