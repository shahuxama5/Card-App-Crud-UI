import { CardService } from './service/card.service';

import { Component, OnInit } from '@angular/core';
import { Card } from './models/Card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    cvc: '',
    expiryMonth: '',
    expiryYear: ''
  }

  constructor(private cardService: CardService) {

  }
  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardService.getAllCards().subscribe( res => {
      this.cards = res;
    });
  }

  onSubmit() {
    if (this.card.id === '') {
      this.cardService.addCard(this.card).subscribe( res => {
        this.getAllCards();
        this.card = {
          id: '',
          cardHolderName: '',
          cardNumber: '',
          cvc: '',
          expiryMonth: '',
          expiryYear: ''
        }
      });
    }
    else {
      this.updateCard(this.card);
    }
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id).subscribe( res => {
      this.getAllCards();
    });
  }

  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card) {
    this.cardService.updateCard(card).subscribe( res => {
      this.getAllCards();
    });
  }
}

