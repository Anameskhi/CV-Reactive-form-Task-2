import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  get getFirstName(){
    return this.form.get('firstname')
  }

  get getLastName(){
    return this.form.get('lastname')
  }

  get getAddress(){
    return this.form.get('userContactInfo.adress')
  }

  get getEmail(){
    return this.form.get('userContactInfo.email')
  }
  get getPhone(){
    return this.form.get('userContactInfo.phone')
  }

  get getGithub(){
    return this.form.get('resource.github')
  }

  get getLinkedin(){
    return this.form.get('resource.linkedin')
  }

  get experiences(){
    return this.form.get('experience') as FormArray
  }

  get educations(){
    return this.form.get('education') as FormArray
  }



  form: FormGroup = new FormGroup({
    firstname: new FormControl("",Validators.required),
    lastname: new FormControl("",Validators.required),

    userContactInfo: new FormGroup({
      adress: new FormControl("",Validators.required),
      email: new FormControl("",[
      Validators.required,
      Validators.email,
    ]),
      phone: new FormControl("",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{9}$/),
      ]),
    }),
    education: new FormArray([
      new FormGroup({
        education: new FormControl("",Validators.required)
      })
    ]),

    experience: new FormArray([
      new FormGroup({
        company: new FormControl("",Validators.required),
        years: new FormControl("",[
          Validators.required,
          Validators.pattern('((\\+91-?)|0)?[0-9]{4}$')

        ])
      })
    ]),

    resource: new FormGroup({
      github: new FormControl("",[
        Validators.required,
        Validators.pattern("^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$")]),
      linkedin: new FormControl("",[
        Validators.required,
        Validators.pattern("^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$")])
    }),

  })



  addEducation(){
    const education = this.educations; //array of educations [{},{},{},{}]
    education.push(
      new FormGroup({
        education: new FormControl("",Validators.required)


      })
    )
    
  }
  addExperience(){
    const experience = this.experiences;
    experience.push(
      new FormGroup({
        company: new FormControl("",Validators.required),
        years: new FormControl("",[Validators.required,Validators.pattern('((\\+91-?)|0)?[0-9]{4}$')])
      })
    )
  }
  deleteExperience(index: number){
    this.experiences.removeAt(index)
  }
  deleteEducation(index: number){
    this.educations.removeAt(index)
  }

  ngOnInit(): void {
    // const user = {
    //   firstname: "",
    //   lastname: "",
    //   active: true,
    //   userContactInfo: {
    //     adress: "",
    //     email: "",
    //     phone: ""
    // },
    // education: [
    //   {
    //     education: ""
    //   }
    // ],
    // resource:{
    //   github: '',
    //   linkedin: ''
    // },
    // experience: [
    //   {
    //     company: "",
    //     years: ""
    //   }
    // ]
    
  }
  // this.form.markAllAsTouched();
  // // user.experiences.forEach(()=> this.addExperience())
  // this.form.patchValue(user)
//}
submit(){
  this.form.markAllAsTouched();
  console.log(this.form.value)
}


}
