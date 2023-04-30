import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';

export interface Skills {
  name:String;
}

export interface Hobbies {
  name:String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})


export class AppComponent implements OnInit {
  displayedColumns: any[] = [
    'id',
    'username',
    'phone',
    'email',
    'action',
    'skill',
    'hobby'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  skills: any;
  hobbies: any;

  skillsList: Skills[] = [];

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.skills =  res[0].UserSkills
        this.hobbies = res.UserHobbies
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.skillsList = res[0].UserSkills
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(data: any) {
    this._empService.deleteEmployee(data).subscribe({
      next: (res) => {
        if(res.Success){
          this._coreService.openSnackBar('Employee deleted!', 'done');
        }else{
          this._coreService.openSnackBar('Employee delete failed', 'Ok');
        }
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  /// Edit Skill and Hobbies
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent, rowSkills: any, userId: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      rowSkills.push({name: value});
    }

    this._empService.updateSkill({userId, skills: rowSkills}).subscribe({
      next: (res) => {
        if(res.Success){
          this._coreService.openSnackBar('Updated Skills', 'X');
        }else{
          this._coreService.openSnackBar('Update skill failed', 'X');
        }
        this.getEmployeeList();
      },
      error: console.log,
    });

    // Clear the input value
    event.chipInput!.clear();

  }

  remove(skill: Skills, rowSkills: any, userId: any): void {
    const index = rowSkills.indexOf(skill);

    if (index >= 0) {
      rowSkills.splice(index, 1);
    }

    this._empService.updateSkill({userId, skills:rowSkills}).subscribe({
      next: (res) => {

        if(res.Success){
          this._coreService.openSnackBar('Updated Skills', 'X');
        }else{
          this._coreService.openSnackBar('Update skill failed', 'X');
        }
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  edit(skill: Skills, event: MatChipEditedEvent, rowSkills: any, userId: any) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(skill, rowSkills, userId);
      return;
    }

    // Edit existing fruit
    const index = rowSkills.indexOf(skill);
    if (index >= 0) {
      rowSkills[index].name = value;
    }

    
  }


  addHobby(event: MatChipInputEvent, rowHobbies: any, userId: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      rowHobbies.push({name: value});
    }

    this._empService.updateHobby({userId, hobbies: rowHobbies}).subscribe({
      next: (res) => {
        if(res.Success){
          this._coreService.openSnackBar('Updated Skills', 'X');
        }else{
          this._coreService.openSnackBar('Update skill failed', 'X');
        }
        this.getEmployeeList();
      },
      error: console.log,
    });

    // Clear the input value
    event.chipInput!.clear();

  }

  removeHobby(hobby: Hobbies, rowHobbies: any, userId: any): void {
    const index = rowHobbies.indexOf(hobby);

    if (index >= 0) {
      rowHobbies.splice(index, 1);
    }

    this._empService.updateHobby({userId, hobbies:rowHobbies}).subscribe({
      next: (res) => {

        if(res.Success){
          this._coreService.openSnackBar('Updated Skills', 'X');
        }else{
          this._coreService.openSnackBar('Update skill failed', 'X');
        }
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  editHobby(hobby: Hobbies, event: MatChipEditedEvent, rowHobbies: any, userId: any) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(hobby, rowHobbies, userId);
      return;
    }

    // Edit existing fruit
    const index = rowHobbies.indexOf(hobby);
    if (index >= 0) {
      rowHobbies[index].name = value;
    }
    
  }

}
