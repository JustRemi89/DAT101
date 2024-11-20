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

    constructor(aType) {
        this.#type = aType;
        this.#balance = 0;
        this.#withdrawCount = 0;
        this.#currencyType = CurrencyTypes.NOK; // Standard NOK
    }

    setType(aType) {
        let text = "Account type has been changed from " + this.#type;
        this.#type = aType;
        this.#withdrawCount = 0;
        text += " to " + this.#type;
        printOut(text);
    }

    #currencyConvert(amount, fromCurrency, toCurrency) {
        const conversionRate = fromCurrency.value / toCurrency.value;
        return parseFloat((amount / conversionRate).toFixed(2));
    }

    setCurrencyType(newCurrency = CurrencyTypes.NOK) {
        if (this.#currencyType === newCurrency) {
            printOut(`The currency is already set to ${this.#currencyType.name}.`);
            return this.#currencyType;
        } else {
            const oldCurrency = this.#currencyType;

            // Oppdater saldo
            this.#balance = this.#currencyConvert(this.#balance, oldCurrency, newCurrency);
            this.#currencyType = newCurrency;

            printOut(`The account currency has been changed from ${oldCurrency.name} to ${newCurrency.name}.`);
            printOut(`New balance: ${this.#balance.toFixed(2)} ${newCurrency.denomination}`);
            return this.#currencyType;
        }
    }

    getBalance() {
        printOut(`My account balance is ${this.#balance.toFixed(2)} ${this.#currencyType.denomination}`);
    }

    deposit(aAmount, aType = CurrencyTypes.NOK) {
        const convertedAmount = this.#currencyConvert(aAmount, aType, this.#currencyType);
        this.#balance += convertedAmount;
        printOut(`Deposit of ${aAmount.toFixed(2)} ${aType.denomination} (${aType.name}), new balance is ${this.#balance.toFixed(2)} ${this.#currencyType.denomination}`);
        this.#withdrawCount = 0;
    }

    withdraw(aAmount, aType = CurrencyTypes.NOK) {
        const convertedAmount = this.#currencyConvert(aAmount, aType, this.#currencyType);
        let canWithdraw = true;
        let text = "";
        switch (this.#type) {
            case AccountType.Saving:
                if (this.#withdrawCount < 3) {
                    this.#withdrawCount++;
                } else {
                    canWithdraw = false;
                    text = `Cannot withdraw more than 3 times from a ${this.#type} account.`;
                }
                break;
            case AccountType.Pension:
                canWithdraw = false;
                text = `Cannot withdraw from a ${this.#type} account.`;
                break;
        }
        if (canWithdraw) {
            if (this.#balance >= convertedAmount) {
                this.#balance -= convertedAmount;
                printOut(`Withdrawal of ${aAmount.toFixed(2)} ${aType.denomination} (${aType.name}), new balance is ${this.#balance.toFixed(2)} ${this.#currencyType.denomination}`);
            } else {
                printOut(`Insufficient funds for withdrawal.`);
            }
        } else {
            printOut(text);
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
myAccount.setCurrencyType(CurrencyTypes.SEK); // Endre til SEK
myAccount.getBalance();

myAccount.setCurrencyType(CurrencyTypes.USD); // Endre til USD
myAccount.getBalance();

myAccount.setCurrencyType(); // Tilbake til NOK (standard)
myAccount.getBalance();

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
myAccount.getBalance();
myAccount.deposit(12, CurrencyTypes.USD);
myAccount.withdraw(10, CurrencyTypes.GBP);
myAccount.setCurrencyType(CurrencyTypes.CAD);
myAccount.setCurrencyType(CurrencyTypes.INR);
myAccount.withdraw(150.11, CurrencyTypes.SEK);
printOut(newLine);