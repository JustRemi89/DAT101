"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

const AccountType = {
    Normal: 'Brukskonto',
    Saving: 'Sparekonto',
    Credit: 'Kredittkonto',
    Pension: 'Pensjonskonto' 
}

const CurrencyTypes = {
    NOK: {value: 1.0000, name: "Norske kroner", denomination: "kr"},
    EUR: {value: 0.0985, name: "Europeiske euro", denomination: "€"},
    USD: {value: 0.1091, name: "United States dollar", denomination: "$"},
    GBP: {value: 0.0847, name: "Pound sterling", denomination: "£"},
    INR: {value: 7.8309, name: "Indiske rupee", denomination: "₹"},
    AUD: {value: 0.1581, name: "Australske dollar", denomination: "A$"},
    PHP: {value: 6.5189, name: "Filippinske peso", denomination: "₱"},
    SEK: {value: 1.0580, name: "Svenske kroner", denomination: "kr"},
    CAD: {value: 0.1435, name: "Canadiske dollar", denomination: "C$"},
    THB: {value: 3.3289, name: "Thai baht", denomination: "฿"}
}

class TAccount {
    #type;
    #balance;
    #withdrawCount;
    #currencyType;
    constructor(aType){
        this.#type = aType;
        this.#balance = 0;
        this.#withdrawCount = 0;
        this.#currencyType = CurrencyTypes.NOK;
    }

    toString(){
        return this.#type;
    }

    setType(aType) {
        let text = "Account type has been changed from " + this.#type;
        this.#type = aType;
        this.#withdrawCount = 0;
        text += " to " + this.#type;
        printOut(text);
    }

    getBalance() {
        printOut("My account balance is " + this.#balance + " " + this.#currencyType.denomination);
    }

    deposit(aAmount) {
        this.#balance += aAmount;
        printOut("Deposit of " + aAmount + " " + this.#currencyType.denomination + ", new balance is " + this.#balance + " " + this.#currencyType.denomination);
        this.#withdrawCount = 0;
    }

    withdraw(aAmount) {
        let canWithdraw = true;
        let text = "";
        switch (this.#type){
            case AccountType.Saving:
                if(this.#withdrawCount < 3) {
                    this.#withdrawCount++;
                    canWithdraw = true;
                } else {
                    canWithdraw = false;
                    text = "Cannot withdraw more than 3 times from a " + this.#type + " account.";
                }
                break;
            case AccountType.Pension:
                canWithdraw = false;
                text = "Cannot withdraw from a " + this.#type + " account.";
                break;
        }
        if(canWithdraw){
            this.#balance -= aAmount;
            printOut("Withdrawal of " + aAmount + " " + this.#currencyType.denomination + ", new balance is " + this.#balance + " " + this.#currencyType.denomination);
        } else {
            printOut(text);
        }
    }

    setCurrencyType(aType) {
        if(this.#currencyType === aType) {
            // Do nothing
            return this.#currencyType;
        } else {
            this.#currencyType = aType;
            return this.#currencyType;
        }
    }
}

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut(AccountType.Normal + ", " + AccountType.Saving + ", " + AccountType.Credit + ", " + AccountType.Pension);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
let myAccount = new TAccount(AccountType.Normal);
printOut("myAccount: " + myAccount.toString());
myAccount.setType(AccountType.Saving);
printOut("myAccount: " + myAccount.toString());

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(100);
myAccount.withdraw(25);
myAccount.getBalance();

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(25);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(10);
myAccount.setType(AccountType.Pension);
myAccount.withdraw(10);
myAccount.setType(AccountType.Saving);
myAccount.withdraw(10);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.deposit(150);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
