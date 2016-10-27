var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];
var robert = ["Robert", "26835", "66000", 1];
var mayella = ["Mayella", "89068", "35000", 2];

var employees = [atticus, jem, boo, scout, robert, mayella];

var empBonuses = [];  // bonuses of all employees

for (var i = 0; i < employees.length; i++) {
  empBonuses.push(calcBonus(employees[i]));
}

empBonuses.forEach(function(employee) {

  console.log("Name: " + employee[0] + ", Bonus Percentage: " + employee[1] +
  "%, Total Compensation: $" + employee[2] + ", Total Bonus: $" + employee[3]);
});

function calcBonus(employee) {
  var empBonus = []; // individual employee bonus array
  var bonusPercent = 0;
  empBonus.push(employee[0]);
  switch (employee[3]) {
    case 1, 2:
      bonusPercent = 0;
      break;
    case 3:
      bonusPercent = .04;
      break;
    case 4:
      bonusPercent = .06;
      break;
    case 5:
      bonusPercent = .1;
      break;
    default:
      bonusPercent = 0;
  };
  if (employee[1].length === 4) {
    bonusPercent += .05;
  }

  if (employee[2] > 65000) {
    bonusPercent -= .01;
  }

  if (bonusPercent > .13) {
    bonusPercent = .13;
  } else if (bonusPercent < 0) {
    bonusPercent = 0;
  }
  empBonus.push(bonusPercent * 100);

  empBonus.push(Math.round(employee[2] * 100) * (1 + bonusPercent) / 100);

  empBonus.push(Math.round(bonusPercent * employee[2]));

  return empBonus;
};

var bonusTable = "";

bonusTable += "<table><tr><th>Name</th><th>Bonus Percentage</th><th>Total Compensation</th><th>Total Bonus</th></tr>"
empBonuses.forEach(function(empBonuses) {
  var badBonus = "class=\"badBonus\"";
  badBonus = empBonuses[1] === 0 ? "class=\"badBonus\"" : "class=\"goodBonus\"";
  bonusTable += "<tr " + badBonus + "><td>" + empBonuses[0] +
      "</td>" +
      "<td>" +
        empBonuses[1] +
      "</td>" +
      "<td>" +
        empBonuses[2] +
      "</td>" +
      "<td>" +
        empBonuses[3]
      "</td>" +
    "</tr>"
});
bonusTable += "</table>";

document.getElementById('bonusTable').innerHTML = bonusTable;
