import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../service/department.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model/department';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss'
})
export class CreateEditComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  department: Department = new Department();
  mensaje: string = "";
  id: number = 0;
  edicion: boolean = false;
  constructor(private departmentService: DepartmentService, private router: Router, private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        gcId: new FormControl('', [Validators.required]),
        gcDescription: new FormControl('', [Validators.required , Validators.minLength(5)]),
        gcAuthorities: new FormControl('', [Validators.required]),
        gcNroOfficers: new FormControl('', [Validators.required]),
        gcOperative: new FormControl('', [Validators.required ])
      }
      
    );
    
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;
      this.init();
    });
    
  }
  
  init() {
    if (this.edicion) {
    this.departmentService.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        gcId: new FormControl(data.gcId),
        gcDescription: new FormControl(data.gcDescription),
        gcAuthorities: new FormControl(data.gcAuthorities),
        gcNroOfficers: new FormControl(data.gcNroOfficers),
        gcOperative: new FormControl(data.gcOperative)
      });
    });
    } //del if
  } // del init
  
  aceptar(){
    this.department.gcId = this.form.value['gcId'];
    this.department.gcDescription = this.form.value['gcDescription'];
    this.department.gcAuthorities = this.form.value['gcAuthorities'];
    this.department.gcNroOfficers = this.form.value['gcNroOfficers'];
    this.department.gcOperative = this.form.value['gcOperative'];
  
    if(this.form.valid){
      if (this.edicion){
        console.log(this.department);
        //validacion
          this.departmentService.update(this.department).subscribe((data)=>{
            this.departmentService.list().subscribe(data => {
              this.departmentService.setList(data);//enviando la lista al suscriptor
            })
          });
      }else {
        console.log(this.department);
        //validacion
        this.departmentService.create(this.department).subscribe((data)=>{
          this.departmentService.list().subscribe(data => {
            this.departmentService.setList(data);//enviando la lista al suscriptor
          })
        });
    }
      this.router.navigate(['departments']);
    } else{
      this.mensaje="Agregue campos omitidos";
    }
  }   

}
