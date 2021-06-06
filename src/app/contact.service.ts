import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = "https://dgsin-contacts-back.herokuapp.com/api/v1/contacts";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text' as 'text'
  };

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(
        catchError(this.handleError<Contact[]>('getContacts', []))
      );
  }

  getContact(contactName: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactsUrl}/${contactName}`)
      .pipe(
        catchError(this.handleError<Contact>(`getContact name=${contactName}`))
      )
  }

  addContact(newContact: Contact): Observable<any> {
    return this.http.post(this.contactsUrl, newContact, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addContact'))
      );
  }

  updateContact(updatedContact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.contactsUrl}/${updatedContact.name}`, updatedContact)
      .pipe(
        catchError(this.handleError<Contact>(`updateContact name=${updatedContact.name}`))
      );
  }

  deleteContact(contactName: string): Observable<any> {
    return this.http.delete(`${this.contactsUrl}/${contactName}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(`deleteContact name=${contactName}`))
      )
  }

  deleteContacts(): Observable<any> {
    return this.http.delete(this.contactsUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteContacts'))
      )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
