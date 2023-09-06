import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private baseUrl = 'http://localhost:8000/api/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(apiKey: string, emailData: any) {
    const url = `${this.baseUrl}?api_key=${apiKey}`;
    return this.http.post(url, emailData);
  }
}
