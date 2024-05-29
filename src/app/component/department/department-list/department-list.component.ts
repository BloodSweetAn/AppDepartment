import { Component, ViewChild } from '@angular/core';
import { Department } from '../../../model/department';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmentService } from '../../../service/department.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent {
  lista: Department[] = [];
  displayedColumns = ['gcId', 'gcDescription', 'gcAuthorities', 'gcNroOfficers', 'gcOperative', 'accion01' , 'accion02'];
  dataSource = new MatTableDataSource<Department>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private departmentService: DepartmentService, private router: Router , private dialog: MatDialog) {
    console.log("CONSTRUCTOR LISTAR")
  }
  ngOnInit(): void {
    console.log("NGONINIT DE LISTAR")
    this.departmentService.list().subscribe(data => this.dataSource.data = data);
    this.departmentService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    //this.authorService.list().subscribe(data=> this.dataSource = new MatTableDataSource(data));
  }

  openDialog(gcId:string){
    const dialogRef = this.dialog.open(DialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(gcId);
      }else{
        console.log("FALSE");
      }
    });
  }

  delete(gcId:string){
    this.departmentService.delete(gcId).subscribe(()=>{
      this.departmentService.list().subscribe(data=>{
        this.departmentService.setList(data);
      })
    });
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /*
  filtrar(e:any){
    this.dataSource.filter = e.target.value.trim();
  }
  */
}
