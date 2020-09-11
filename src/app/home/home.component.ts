import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SubjectModel } from 'src/models/SubjectModel';
import { SubjectService } from 'src/services/SubjectService';
import { User } from 'src/models/User';
import { UserService } from 'src/services/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  msgError="";
  voteError=""
  resultVote="";
  activeForm:boolean;
  newSubject : SubjectModel=new SubjectModel();
  user:User=new User();
  subjects:SubjectModel[]=[];
  constructor(router:Router,private subjectService:SubjectService,private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('User'))
    this.activeForm=false;
    this.subjectService.allSubjects().subscribe(res=>this.subjects=JSON.parse(JSON.stringify(res)),
    e=>{},()=>{console.log(this.subjects)})
  }
  redirectToSubjectForm(){
    if(this.activeForm==false)this.activeForm=true ;
    else this.activeForm=false;
  }
  Logout(){
    localStorage.clear();
    location.reload()
  }
  Add(title,desc){
    this.msgError="";
    if(title.value!='' && desc.value!=''){
   
      this.newSubject.titre=title.value;
      this.newSubject.description=desc.value
      
     this.subjectService.addSubject(this.user.id,title.value,desc.value).subscribe(res=>{},e=>{console.log('')},()=>{this.ngOnInit()})
   
     }
     else{
      
       this.msgError="Required title and description"
     }
  }

  vote(yes,no,ids){
    this.voteError=""
    console.log(yes.checked)
    console.log(no.checked)
    if(yes.checked==false && no.checked==false)
    {this.voteError="Required check";}
    else{
      if(yes.checked)
      this.userService.vote(ids,"oui").subscribe(res=>{this.resultVote=res.toString()},e=>{console.log(e)},()=>{
        if(this.resultVote!="demain")
        this.ngOnInit()
        else if(this.resultVote==="demain")
        this.resultVote="No more than 5 votes in one day"
      })
      else if(no.checked)
      this.userService.vote(ids,"non").subscribe(res=>{this.resultVote=res.toString()},e=>{},()=>{
        if(this.resultVote!="demain")
        this.ngOnInit()
        else if(this.resultVote==="demain")
        this.resultVote="No more than 5 votes in one day"
      })
    }
  }

}
