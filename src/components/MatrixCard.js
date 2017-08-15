
const matrixCard = [
            {key: "[1,A]", value: "W"},
            {key: "[1,B]", value: "F"},
            {key: "[1,C]", value: "I"},
            {key: "[1,D]", value: "5"},
            {key: "[1,E]", value: "G"},
            {key: "[1,F]", value: "Y"},
            {key: "[1,G]", value: "Q"},

            {key: "[2,A]", value: "X"},
            {key: "[2,B]", value: "G"},
            {key: "[2,C]", value: "M"},
            {key: "[2,D]", value: "V"},
            {key: "[2,E]", value: "Q"},
            {key: "[2,F]", value: "2"},
            {key: "[2,G]", value: "L"},
            
            {key: "[3,A]", value: "C"},
            {key: "[3,B]", value: "9"},
            {key: "[3,C]", value: "3"},
            {key: "[3,D]", value: "A"},
            {key: "[3,E]", value: "P"},
            {key: "[3,F]", value: "9"},
            {key: "[3,G]", value: "Q"},

            {key: "[4,A]", value: "W"},
            {key: "[4,B]", value: "N"},
            {key: "[4,C]", value: "8"},
            {key: "[4,D]", value: "G"},
            {key: "[4,E]", value: "V"},
            {key: "[4,F]", value: "4"},
            {key: "[4,G]", value: "1"},

            {key: "[5,A]", value: "2"},
            {key: "[5,B]", value: "0"},
            {key: "[5,C]", value: "O"},
            {key: "[5,D]", value: "P"},
            {key: "[5,E]", value: "3"},
            {key: "[5,F]", value: "G"},
            {key: "[5,G]", value: "5"},

            {key: "[6,A]", value: "5"},
            {key: "[6,B]", value: "J"},
            {key: "[6,C]", value: "E"},
            {key: "[6,D]", value: "F"},
            {key: "[6,E]", value: "3"},
            {key: "[6,F]", value: "K"},
            {key: "[6,G]", value: "3"},

            {key: "[7,A]", value: "6"},
            {key: "[7,B]", value: "W"},
            {key: "[7,C]", value: "K"},
            {key: "[7,D]", value: "7"},
            {key: "[7,E]", value: "J"},
            {key: "[7,F]", value: "T"},
            {key: "[7,G]", value: "Y"},
        ];

class MatrixCard {
    constructor() {
        this.getValue = this.getValue.bind(this);
    }

    getValue(key) {
        let value;
        matrixCard.forEach((each) => {
            if (each.key === key) {
                value = each.value;
            }
        });
        return value;
    }


}

var instance = new MatrixCard();
export default instance;