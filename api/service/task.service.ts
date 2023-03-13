
export class TaskService {

    private cardNumbers = {
        "sushant": "1",
        "era": "2",
        "saurabh": "3",
        "sarthak": "4",
        "parvati": "5",
        "akash": "6",
        "gargi": "7",
        "sir": "8",
        "teacher": "9",
        "arnav": "10",
    }

    constructor() {}

    async getCardNumber(name: String) {
        if (!Object.keys(this.cardNumbers).includes(name.toLowerCase().trim())) {
            console.log("Participant not found!")
            return -1;
        }
        console.log(name.toLowerCase().trim(), this.cardNumbers[name.toLowerCase()]);
        return parseInt(this.cardNumbers[name.toLowerCase()]);
    }
    async getRandomCardNumber(name: String) {
        if (name === "" || !Object.keys(this.cardNumbers).includes(name.toLowerCase().trim())) {
            console.log("Participant not found!")
            return -1;
        }

        let number = Math.floor(Math.random() * 10) + 1
        console.log("Random Card Number: ", number);
        return number;
    }

}