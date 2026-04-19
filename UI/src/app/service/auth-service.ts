import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   baseUrl = 'http://localhost:9000/api/auth';

   constructor(private http: HttpClient) {}

   register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
    
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getUser() {
    
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    localStorage.clear();
  }

  

}
