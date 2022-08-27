// Your code here

function createEmployeeRecord(employee) {
  let testEmployee = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return testEmployee;
}

function createEmployeeRecords(arr) {
  return arr.map((elem) => {
    return createEmployeeRecord(elem);
  });
}
// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

function createTimeInEvent(recordObject, date) {
  let yourDate = date.split(" ");
  let inTime = {
    type: "TimeIn",
    hour: parseInt(yourDate[1]),
    date: yourDate[0],
  };

  recordObject.timeInEvents = [...recordObject.timeInEvents, inTime];
  return recordObject;
}
// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
// let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400");
// let newEvent = updatedBpRecord.timeInEvents[0];

// console.log(updatedBpRecord);

function createTimeOutEvent(recordObject, date) {
  let yourDate = date.split(" ");
  let outTime = {
    type: "TimeOut",
    hour: parseInt(yourDate[1]),
    date: yourDate[0],
  };

  recordObject.timeOutEvents = [...recordObject.timeOutEvents, outTime];
  return recordObject;
}

function hoursWorkedOnDate(record, date) {
  for (let i = 0; i < record.timeInEvents.length; i++) {
    if (date === record.timeInEvents[i].date) {
      let arrivalTime = record.timeInEvents[i].hour;
      let departureTime = record.timeOutEvents[i].hour;
      let timeTaken = departureTime - arrivalTime;
      return timeTaken / 100;
    }
  }
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log( hoursWorkedOnDate(cRecord, "0044-03-15"))

function wagesEarnedOnDate(record, date) {
  let timeTaken = hoursWorkedOnDate(record, date);
  return timeTaken * record.payPerHour;
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(wagesEarnedOnDate(cRecord, "0044-03-15"))

// function allWagesFor(record) {
//    console.log(record)
//    let amount = []
//    amount.push( wagesEarnedOnDate(record,record.timeInEvents[0].date))
//     allWagesFor()

// }

const allWagesFor = function (record) {
  const eligibleDates = record.timeInEvents.map(function (e) {
    return e.date;
  });

  // const payable = eligibleDates.reduce(
  //   function (memo, d) {
  //     return memo + wagesEarnedOnDate.call(this, d);
  //   }.bind(this),
  //   0
  // ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  // return payable;
  const payable = eligibleDates.reduce((accum, currentDate) => {
    return accum + wagesEarnedOnDate(record, currentDate);
  }, 0);
  return payable;
};

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100");
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");
// // 324 + 54
// console.log(allWagesFor(cRecord));

function calculatePayroll(recordArr) {
  let employeeTotal = recordArr.map((employee) => {
    return allWagesFor(employee);
  });
  let payroll = employeeTotal.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);
  return payroll;
}

// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//   ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//   ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//   ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//   ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//   let [dIn, dOut] = d
//   sRecord = createTimeInEvent(sRecord, dIn)
//   sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//   let [dIn, dOut] = d
//   rRecord = createTimeInEvent(rRecord, dIn)
//   rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]
// let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
// console.log(grandTotalOwed)
// console.log(calculatePayroll(employees))
