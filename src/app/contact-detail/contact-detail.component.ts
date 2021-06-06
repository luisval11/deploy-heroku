import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;

  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private location: Location) {
      this.contact = { //initialize to prevent an error in client
        name: "",
        email: "",
        phone: Number()
      };
    }

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    this.contactService.getContact(this.route.snapshot.paramMap.get('name') as string)
      .subscribe(contact => this.contact = contact);
  }

  saveContact(): void {
    this.contactService.updateContact(this.contact)
      .subscribe(_ => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
