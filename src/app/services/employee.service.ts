import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/create', data);
  }

  updateEmployee(userId: string, data: any): Observable<any> {
    return this._http.post(`http://localhost:3000/update`, {userId, ...data});
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/user');
  }

  deleteEmployee( data: any): Observable<any> {
    const body = {userId: data}
    return this._http.post(`http://localhost:3000/delete`, body);
  }

  updateSkill( data: any): Observable<any> {
    return this._http.post(`http://localhost:3000/update/skill`, data);
  }

  updateHobby( data: any): Observable<any> {
    console.log('data here', data)
    return this._http.post(`http://localhost:3000/update/hobby`, data);
  }
}
