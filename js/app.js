// data controller module
var dataController = (() => {
    
    return {
        // calculate the tip
        calcTipValue: function(num, perc) {
            let tipCost = num * perc;
            return tipCost;
        },

        // add tip to cost of bill
        calcTotalCost: function(billVal, tipVal) {
            let totalCost = (billVal + tipVal);
            return totalCost;
        },

        // divide the total cost by the number of people sharing the bill
        divideByNumberOfPersons: function(total, numPeople) {
            let dividedCost = total / numPeople;
            return dividedCost;
        }
    };


})();

// ui controller module
var UIController = (() => {

    // store class names of HTML elements
    const DOMstrings = {
        billAmount: '.bill_amount',
        tipPercent: '.tip_percentage',
        numberOfPeople: '.people_amount',
        calcButton: '.calculate_btn',
        finalValue: '.cost_per_person'
    };

    // return DOMstrings object
    return {
        getDOMstrings: () => {
            return DOMstrings;
        },

        // read and return field input data
        getInput: function() {
            return {
                bill: Number(document.querySelector(DOMstrings.billAmount).value),
                percent: Number(document.querySelector(DOMstrings.tipPercent).value),
                numOfPeople: Number(document.querySelector(DOMstrings.numberOfPeople).value)
            };
        },

        // update the UI to display final calculations
        displayCalc: function(num) {
            let element = DOMstrings.finalValue;

            document.querySelector(element).textContent = `Total Cost: $${num.toFixed(2)} each`;
        }
    };

})();

// global app controller module
var globalController = ((dataCtrl, UICtrl) => {

    const setupEventListeners = function() {
        // get DOMstrings object from UI controller
        var DOM = UICtrl.getDOMstrings();

        // run calculations on button or key press
        document.querySelector(DOM.calcButton).addEventListener('click', ctrlCalcCostPerPerson);
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlCalcCostPerPerson();
            }
        });
    };

    const ctrlCalcCostPerPerson = function() {
        
        // get field input data -- ui
        let input = UICtrl.getInput();

        // calculate tip cost (bill * tip%) -- data
        let tipValue = dataCtrl.calcTipValue(input.bill, input.percent);

        // add tip cost to bill cost -- data
        let totalCost = dataCtrl.calcTotalCost(input.bill, tipValue);

        // divide total cost by number of persons -- data
        let costPerPerson = dataCtrl.divideByNumberOfPersons(totalCost, input.numOfPeople);

        // update UI -- ui
        UICtrl.displayCalc(costPerPerson);
    };

    // initialization function
    return {
        init: () => {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(dataController, UIController);

// initialize app
globalController.init();