import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

   baseUrl = 'http://localhost:9000/api/notifications';

  constructor(private http: HttpClient) {}

  getUserNotifications(userId: number) {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  markAsRead(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/read`, {});
  }
}
