import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const host = 'http://localhost:3000'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post(host + '/create', data);
  }

  updateEmployee(userId: string, data: any): Observable<any> {
    return this._http.post(host + `/update`, { userId, ...data });
  }

  getEmployeeList(): Observable<any> {
    return this._http.get(host + '/user');
  }

  deleteEmployee(data: any): Observable<any> {
    const body = { userId: data }
    return this._http.post(host + `/delete`, body);
  }

  updateSkill(data: any): Observable<any> {
    return this._http.post(host + `/update/skill`, data);
  }

  updateHobby(data: any): Observable<any> {
    console.log('data here', data)
    return this._http.post(host + `/update/hobby`, data);
  }
}
