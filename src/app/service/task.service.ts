import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TasksDocument } from '../models/tasks-document';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
    private apiUrl: string;
    constructor(private http: HttpClient) {
        //this.apiUrl = 'http://localhost:8080/api'; 
        this.apiUrl =  'https://localhost:7128/api';
    }

    CreateTask(model: TasksDocument): Observable<any> {
        const url = `${this.apiUrl}/Tasks`;
        return this.http.post(url, model);
    }

    UpdateTask(model: TasksDocument): Observable<any> {
        const url = `${this.apiUrl}/Tasks/${model.id}`;
        return this.http.put(url, model);
    }


    ///Tasks/tk/subtasks/dd/status
    UpdateSubTaskStatus(status: string, taskId: string, subtaskId: string): Observable<any> {
        const url = `${this.apiUrl}/Tasks/${taskId}/subtasks/${subtaskId}/status`;
        const model = { "status": status };
        return this.http.put(url, model);
    }

    GetTasks(userId: string): Observable<TasksDocument[]> {
        const url = `${this.apiUrl}/Tasks/user/${userId}/tasks`;
        return this.getArrary<TasksDocument>(url);
    }

    ///Tasks/t1?userId=u1
    GetTask(userId: string, taskId:string): Observable<TasksDocument> {
        const url = `${this.apiUrl}/Tasks/${taskId}?userId=${userId}`;
        return this.get<TasksDocument>(url);
    }

    DeleteTask(userId: string, taskId:string): Observable<any> {
        const url = `${this.apiUrl}/Tasks/${taskId}?userId=${userId}`;
        return this.http.delete(url);
    }

    private get<T>(url: string, options?: any): Observable<T> {
        return this.http
            .get(url, options)
            .pipe(map((res) => this.extractData<T>(res))) as Observable<T>;
    }
    private getArrary<T>(url: string, options?: any): Observable<T[]> {
        return this.http
            .get(url, options)
            .pipe(map((res) => this.extractData<T[]>(res))) as Observable<T[]>;
    }

    private extractData<T>(res: any) {
        if (res && (res.status < 200 || res.status >= 300)) {
            throw new Error('Bad response status: ' + res.status);
        }
        return (res || {}) as T;
    }
}