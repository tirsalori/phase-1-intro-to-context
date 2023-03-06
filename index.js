function createEmployeeRecord(empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedEmpArray){
    const newEmpArray = []
    for (let array of nestedEmpArray) {
        newEmpArray.push(createEmployeeRecord(array))
    }
    return newEmpArray
}

function createTimeInEvent(empRecord, dateStamp){
    empRecord.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    })
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp){
    empRecord.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0,10)
    })
    return empRecord
}

function hoursWorkedOnDate(empRecord, dateStamp){
    for (let i = 0; i < empRecord.timeInEvents.length; i++){
        if(empRecord.timeInEvents[i].date === dateStamp.slice(0,10)){
            return (empRecord.timeOutEvents[i].hour - empRecord.timeInEvents[i].hour)/100
        }
    }
}

function wagesEarnedOnDate(empRecord, dateStamp){
    return parseInt(hoursWorkedOnDate(empRecord, dateStamp)) * empRecord.payPerHour
}

function allWagesFor(empRecord){
    const datesWorked = []
    let allWages = 0
    for (let i = 0; i < empRecord.timeInEvents.length; i++){
        datesWorked.push(empRecord.timeInEvents[i].date)
    }
    for (let i = 0; i < datesWorked.length; i++){
        allWages += wagesEarnedOnDate(empRecord, datesWorked[i])
    }
    return allWages
}

function calculatePayroll(empRecordArray){
    let payroll = 0
    for (let empRecord of empRecordArray){
        payroll += allWagesFor(empRecord)
    }
    return payroll
}

