import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  public countrylist=['India','USA','Singapore','UK']
  public termlist=['15days','30days','45days','60days']
  badgevisible = true;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  private mediaQuery: MediaQueryList;

  constructor(private builder:FormBuilder, private changeDetectorRef: ChangeDetectorRef, private mediaMatcher: MediaMatcher) {
    this.mediaQuery = this.mediaMatcher.matchMedia('(max-width: 700px)');

    this.mediaQuery.addEventListener('change', this.handleScreenSizeChange.bind(this));

  }

  handleScreenSizeChange(event: MediaQueryListEvent): void {
    const isSmallScreen = event.matches;

    // Se a largura da tela for menor que 700px, feche o mat-sidenav
    if (isSmallScreen) {
      this.sidenav.close();
    }else{
      this.sidenav.open();
    }

    // Atualize o estado do Angular para garantir a detecção de alterações
    this.changeDetectorRef.detectChanges();
  }
  
  ngOnInit(): void {
    this.customerform.setValue({name:'Nihira Techiees',email:'nihiratechiees@gmail.com',phone:'77678899',
  country:'USA',term:'45days',address:'add1',dob:new Date(2001,2,3),gender:'Male',status:true})

  }

  public customerform=this.builder.group({
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.required]) ),
    phone:this.builder.control('',Validators.required),
    country:this.builder.control('',Validators.required),
    address:this.builder.control('',Validators.required),
    term:this.builder.control('',Validators.required),
    dob:this.builder.control(new Date(2000,3,25)),
    gender:this.builder.control('Male'),
    status:this.builder.control(true),
   });

  badgevisibility() {
    this.badgevisible = false;
  }

  SaveCustomer(){
    console.log(this.customerform.value);
   }
 
   clearform(){
     this.customerform.reset();
   }
}
