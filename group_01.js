function Employee(name, empNum, salary, rating) {
  this.name = name;
  this.empNum = empNum;
  this.salary = parseInt(salary);
  this.rating = rating;
  this.bonusPercent = 0;
}

var atticus = new Employee("Atticus", "2405", "47000", 3);
var jem = new Employee("Jem", "62347", "63500", 4);
var boo = new Employee("Boo", "11435", "54000", 3);
var scout = new Employee("Scout", "6243", "74750", 5);
var robert = new Employee("Robert", "26835", "66000", 1);
var mayella = new Employee("Mayella", "89068", "35000", 2);

var employees = [atticus, jem, boo, scout, robert, mayella];

// Calculate bonus info and add/update employee
function calcBonus(employee) {
  calcBaseBonus(employee);
  adjustLongevity(employee);
  adjustBonusHighSalary(employee);
  adjustBonusExtremes(employee);
  employee.bonusAmt = employee.salary * employee.bonusPercent;
  employee.totalComp = employee.salary + employee.bonusAmt;
}


function calcBaseBonus (employee) {
  switch (employee.rating) {
    case 3:
      employee.bonusPercent = .04;
      break;
    case 4:
      employee.bonusPercent = .06;
      break;
    case 5:
      employee.bonusPercent = .1;
      break;
    default:
      employee.bonusPercent = 0;
  };
};

function adjustLongevity (employee) {
  if (employee.empNum.length === 4) {
    employee.bonusPercent += .05;
  }
};

function adjustBonusHighSalary (employee) {
  if (employee.salary > 65000) {
    employee.bonusPercent -= .01;
  }
};

function adjustBonusExtremes (employee) {
  employee.bonusPercent = Math.min(employee.bonusPercent , .13);
  employee.bonusPercent = Math.max(employee.bonusPercent , 0);
};

// Calculate bonus info for each employee
for (var i = 0; i < employees.length; i++) {
  calcBonus(employees[i]);
}

// Log each employee's bonus info
employees.forEach(function(employee) {
  console.log(padRight("Name: " + employee.name, 15) +
  padRight("Bonus Percentage: " + employee.bonusPercent * 100 + "%", 25) +
  padRight("Total Compensation: $" + employee.totalComp, 30) +
  padRight("Total Bonus: $" + employee.bonusAmt, 20));
});

// Format and inject html bonus table
var bonusTable = "";

bonusTable += "<table><tr><th>Name</th><th>Bonus Percentage</th><th>Total Compensation</th><th>Total Bonus</th></tr>"
employees.forEach(function(employee) {
  var badBonus = "class=\"badBonus\"";
  badBonus = employee.bonusPercent === 0 ? "class=\"badBonus\"" : "class=\"goodBonus\"";
  bonusTable += "<tr " + badBonus + "><td>" + employee.name +
      "</td>" +
      "<td>" +
        employee.bonusPercent * 100 +
      "</td>" +
      "<td>" +
        employee.totalComp +
      "</td>" +
      "<td>" +
        employee.bonusAmt
      "</td>" +
    "</tr>"
});
bonusTable += "</table>";

document.getElementById('bonusTable').innerHTML = bonusTable;

// right padding string with spaces to a total of n chars
function padRight(string, n) {
  if (string.length >= n) {
    return string;
  }
  var max = (n - string.length);
  for (var i = 0; i < max; i++) {
    string += " ";
  }
  return string;
};
