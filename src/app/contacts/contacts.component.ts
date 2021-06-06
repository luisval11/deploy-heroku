import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact.service';

import { Contact } from '../contact';
import { CONTACTS } from '../mock-contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts!: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(
      contacts => this.contacts = contacts
    );
  }

  addContact(name: string, email: string, phone: number) : void {
    name = name.trim();
    if(!name) {
      return;
    }
    this.contactService.addContact({name, email, phone}).subscribe(
      _ => this.getContacts()
    );
  }

  deleteContact(name: string): void {
    this.contactService.deleteContact(name).subscribe(
      _ => this.getContacts()
    );
  }

  deleteContacts(): void {
    this.contactService.deleteContacts().subscribe(
      _ => this.getContacts()
    );
  }

}
