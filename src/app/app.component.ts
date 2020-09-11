import { Component } from '@angular/core';
import { UserService } from 'src/services/UserService';
import { User } from 'src/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  msgError="";
  signIn="";
  msgErrorLogin=""
  user:User=new User()
  userToConnect:User=new User()
  userConnected:User=new User()
  constructor(public userService:UserService,private router:Router) { 
   
  }
  ngOnInit() {
    this.userConnected=JSON.parse(localStorage.getItem('User'))
    console.log(this.userConnected)
  }


  register(login:any,pwd:any){
    this.msgError=""
    if(login.value!='' && pwd.value!=''){
   
     this.user.login=login.value;
     this.user.pwd=pwd.value
     
    
     this.userService.register(this.user).subscribe(res=>{},e=>{console.log(e)},()=>{
      this.signIn="SIGN IN NOW!";
      login.value='';
      pwd.value=""
     })
    }
    else{
     
      this.msgError="Required username and password"
    }

  }
  

  testlogin(username,password){
    this.msgErrorLogin=""

    this.userService.login(username.value,password.value).subscribe(res=>{this.userToConnect=JSON.parse(JSON.stringify(res));},
    e=>{console.log(e)},()=>{
      console.log(this.userToConnect)
      if(this.userToConnect!=null){
        localStorage.setItem('User',JSON.stringify(this.userToConnect));
        location.replace('/home')
      }else{
        this.msgErrorLogin="Username or password incorrect"
      }
    })
  }
  
}


