import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssueServiceTs {

  baseUrl = 'http://localhost:9000/api/issues';

  constructor(private http: HttpClient) {}

  createIssue(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  // issue-service.ts
getAllIssues(): Observable<any[]> {
  return this.http.get<any[]>(this.baseUrl);
}

getIssueById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}`);
}


  updateIssue(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteIssue(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: number, status: string, userId: number) {
    return this.http.put(
      `${this.baseUrl}/${id}/status?status=${status}&userId=${userId}`,
      {}
    );
  }

  getByStatus(status: string) {
    return this.http.get(`${this.baseUrl}/status/${status}`);
  }

 getByAssigned(userId: number) {
  return this.http.get<any[]>(`${this.baseUrl}/assigned/${userId}`);
}


  addComment(issueId: number, userId: number, message: string) {
  return this.http.post(
    `http://localhost:9000/api/comments?issueId=${issueId}&userId=${userId}&message=${encodeURIComponent(message)}`,
    {}
  );
}

// user.service.ts
getAllUsers() {
  return this.http.get<any>('http://localhost:9000/api/auth');
}

getStats(): Observable<any> {
  
  return this.http.get<any>(`${this.baseUrl}/stats`);
}

}
