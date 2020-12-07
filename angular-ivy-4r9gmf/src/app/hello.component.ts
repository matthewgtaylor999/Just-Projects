import { Component, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";

@Component({
  selector: "hello",
  templateUrl: `./hello.component.html`,

  styles: [
    `
      h1 {
        font-family: Lato;
      }

      .ng-invalid:not(form) {
          border-left: 5px solid red;
      }

      .ng-touched:not(form) {
          border-left: 5px solid blue;
      }
    `
  ]
})
export class HelloComponent {
  profile = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, this.ageValidator(21)]),
    address: new FormGroup({
      street: new FormControl(""),
      city: new FormControl(""),
      country: new FormControl("")
    })
  });
  printValues() {
    console.log(this.profile.value);
  }
  reset() {
    this.profile.setValue({
      name: "",
      age: "",
      address: {
        street: "",
        city: "",
        country: ""
      }
    });
  }
  get name(){
    return this.profile.get('name')
  }
  get age () {
    return this.profile.get('age');
  }
  ageValidator(age: number): ValidatorFn {
    return (control: AbstractControl): 
      {[key:string]: any} | null => 
        {const errors = control.value ? control.value < age : false;
        return errors ? 
          {'age': 
            {value: 'You are not old enough'}
          } : null;
        }
  }
  
}
