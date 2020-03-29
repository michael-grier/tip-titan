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
            // the number of people field was blank, set value to 1
            if (numPeople === 0) {
                numPeople = 1;
            } 
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
        tip: '.tip_value',
        totalCost: '.total_cost',
        costEach: '.cost_per_person'
    };


    return {
        // return DOMstrings object
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
        displayCalc: function(tip, total, per) {
            let tipCost = DOMstrings.tip;
            let totalCost = DOMstrings.totalCost;
            let costPer = DOMstrings.costEach;

            document.querySelector(tipCost).textContent = `Tip: $${tip.toFixed(2)}`;
            document.querySelector(totalCost).textContent = `Total bill: $${total.toFixed(2)}`;
            
            // only display if there is more than 1 person sharing the bill
            if (total !== per) {
                document.querySelector(costPer).textContent = `Each owe: $${per.toFixed(2)}`;
            };

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
        UICtrl.displayCalc(tipValue, totalCost, costPerPerson);
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