/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = (array) => {
    const newEmployeeRecord = {};
    newEmployeeRecord['firstName'] = array[0];
    newEmployeeRecord['familyName'] = array[1];
    newEmployeeRecord['title'] = array[2];
    newEmployeeRecord['payPerHour'] = array[3];
    newEmployeeRecord['timeInEvents'] = [];
    newEmployeeRecord['timeOutEvents'] =[];
    return newEmployeeRecord
}

const createEmployeeRecords = (arrayOfArrays) => {
   return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(dateStamp) {
   const dateStampArray = dateStamp.split(' ');
   const dateStampObject = {}
    dateStampObject['type'] = "TimeIn"
    dateStampObject['hour'] = parseInt(dateStampArray[1]);
    dateStampObject['date'] = dateStampArray[0];
    this.timeInEvents.push(dateStampObject)
    return this
}

function createTimeOutEvent(dateStamp) {
    const dateStampArray = dateStamp.split(' ');
    const dateStampObject = {}
    dateStampObject['type'] = "TimeOut"
    dateStampObject['hour'] = parseInt(dateStampArray[1]);
    dateStampObject['date'] = dateStampArray[0];
    this.timeOutEvents.push(dateStampObject)
    return this
}

function hoursWorkedOnDate(date) {
   const timeInEvent =  this['timeInEvents'].find(dateStamp => dateStamp['date'] === date)
   const timeOutEvent = this['timeOutEvents'].find(dateStamp => dateStamp['date'] === date)

   const hoursWorked = (timeOutEvent['hour']/100) - (timeInEvent['hour']/100)
   return hoursWorked
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    const amountOwed = hoursWorked * this['payPerHour']
    return amountOwed
}

function allWagesFor() {
    const datesWorked = this['timeInEvents'].map(timeInEvent => timeInEvent['date'])
    const wageArray = datesWorked.map(date => wagesEarnedOnDate.call(this, date) )
    const allWages = wageArray.reduce((p,c) => p+c)
    return allWages
}

const findEmployeeByFirstName = (srcArray, firstName) =>  srcArray.find(employeeRecord => employeeRecord['firstName'] === firstName)

function calculatePayroll(arrayOfEmployees){
   const arrayOfWages = arrayOfEmployees.map(employeeRecord => allWagesFor.call(employeeRecord))
   debugger
   const totalPayroll = arrayOfWages.reduce((p,c) => p+c)
   return totalPayroll
}