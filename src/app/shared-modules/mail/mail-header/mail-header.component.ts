import { Component, OnInit, Input } from '@angular/core';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.css']
})
export class MailHeaderComponent implements OnInit {
  @Input() editando:Boolean;
  @Input() lista;
  @Input() individual:Boolean
  
  constructor(private mailService: MailService) {
    this.individual=false;
  }

  ngOnInit() {

  }

}
