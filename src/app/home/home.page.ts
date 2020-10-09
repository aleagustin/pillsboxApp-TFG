import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  goPillsBox(){
    
    this.router.navigate(['pillsboxindex'], {
     
    });
  }


  goProspect(){
    
    this.router.navigate(['prospectos'], {
     
    });
  }


  goSettings(){
    
    this.router.navigate(['settings'], {
     
    });
  }


  goHome(){
    
    this.router.navigate(['home'], {
     
    });
  }

}
