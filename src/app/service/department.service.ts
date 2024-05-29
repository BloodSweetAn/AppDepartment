import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject,} from 'rxjs';
import { Department } from '../model/department';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = `${baseUrl}`
  private listaCambio = new Subject<Department[]>()
  constructor(private http: HttpClient) { }


  list(): Observable<any>{
    console.log(this.url);
    return this.http.get<Department[]> (this.url + "/departments");
  }

  listId(id:number){
    return this.http.get<Department>(this.url+"/department/"+ id);
  }

  create(department: Department){
    return this.http.post(this.url + "/department", department);
  }

  update(iddepa: Department){
    return this.http.put(this.url + "/department", iddepa);
  }

  delete(id:string){
    return this.http.delete(this.url + "/department/" + id);
  }

  setList(listaNueva : Department[]){
  this.listaCambio.next(listaNueva);
  }
  
  getList(){
  return this.listaCambio.asObservable();
  }
}
