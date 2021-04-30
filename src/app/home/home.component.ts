import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {changeTurn, setPlayers} from "../board/state/board.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playerOne: string = ""
  playerTwo: string = ""

  constructor(
    private _store : Store<AppState>
  ) { }

  ngOnInit(): void {

    this.setPlayers()

    this._store.dispatch(setPlayers({
      players: {
        playerOne: this.playerOne,
        playerTwo: this.playerTwo,
      }
    }))

    this._store.dispatch(changeTurn({playerToMove: this.playerOne}))

  }

  setPlayers(){

    let prompt: any = "";

    //If the document contains a cookie then allow the user to continue, if not prompt a window to input the user's name
    if (this.getCookiePropertyValue("playerOne") !== "") {
      this.playerOne = this.getCookiePropertyValue("playerOne")
    } else {

      prompt = prompt("Enter a name for Player One");

      this.playerOne = prompt
      if (this.playerOne != null) {
        document.cookie = "playerOne=" + escape(this.playerOne)
      }
    }

    if (this.getCookiePropertyValue("playerTwo") !== "") {
      this.playerTwo = this.getCookiePropertyValue("playerTwo")
    } else {

      prompt = prompt("Enter a name for Player Two");

      this.playerTwo = prompt
      if (this.playerTwo != null) {
        document.cookie = "playerTwo=" + escape(this.playerTwo)
      }
    }
  }

  //Get a specific property from a cookie
  getCookiePropertyValue(property: any) {

    // Split cookie string and get all individual name=value pairs in an array
    let cookieData = document.cookie.split(";");

    // Loop through the array elements
    for (let i = 0; i < cookieData.length; i++) {
      let cookiePair = cookieData[i].split("=");
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if (property == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }
    //Return empty if not found
    return ""
  }

}
