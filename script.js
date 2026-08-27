let budgetChartInstance;
let investmentChartInstance;

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);

}


function calculatePlan() {

    const salary =
        Number(document.getElementById("salary").value);

    const expenses =
        Number(document.getElementById("expenses").value);

    const emi =
        Number(document.getElementById("emi").value);

    const savings =
        Number(document.getElementById("savings").value);

    const age =
        Number(document.getElementById("age").value);

    const risk =
        document.getElementById("risk").value;


    if (!salary || salary <= 0) {

        alert("Please enter a valid monthly salary.");

        return;
    }


    if (expenses < 0 || emi < 0 || savings < 0) {

        alert("Values cannot be negative.");

        return;
    }


    const totalExpenses = expenses + emi;

    let surplus = salary - totalExpenses;

    if (surplus < 0) {
        surplus = 0;
    }


    let investmentPercent;

    if (risk === "low") {
        investmentPercent = 0.50;
    }
    else if (risk === "medium") {
        investmentPercent = 0.65;
    }
    else {
        investmentPercent = 0.75;
    }


    let investmentAmount =
        surplus * investmentPercent;

    let emergencyContribution =
        surplus * 0.20;

    let personalAmount =
        surplus - investmentAmount - emergencyContribution;


    if (personalAmount < 0) {

        investmentAmount =
            surplus * 0.60;

        emergencyContribution =
            surplus * 0.20;

        personalAmount =
            surplus - investmentAmount - emergencyContribution;
    }


    // INVESTMENT ALLOCATION

    let equityPercent;
    let debtPercent;
    let goldPercent;


    if (risk === "low") {

        equityPercent = 30;
        debtPercent = 60;
        goldPercent = 10;

    }

    else if (risk === "medium") {

        equityPercent = 60;
        debtPercent = 30;
        goldPercent = 10;

    }

    else {

        equityPercent = 75;
        debtPercent = 15;
        goldPercent = 10;

    }


    // AGE ADJUSTMENT

    if (age >= 50) {

        equityPercent -= 10;
        debtPercent += 10;

    }


    const equityAmount =
        investmentAmount * equityPercent / 100;

    const debtAmount =
        investmentAmount * debtPercent / 100;

    const goldAmount =
        investmentAmount * goldPercent / 100;


    // EMERGENCY FUND

    const emergencyTarget =
        totalExpenses * 6;

    let emergencyPercentage =
        emergencyTarget > 0
            ? (savings / emergencyTarget) * 100
            : 100;


    if (emergencyPercentage > 100) {
        emergencyPercentage = 100;
    }


    // SHOW RESULTS

    document.getElementById("emptyMessage")
        .style.display = "none";

    document.getElementById("results")
        .style.display = "block";


    document.getElementById("salaryResult")
        .textContent = formatCurrency(salary);

    document.getElementById("expenseResult")
        .textContent = formatCurrency(totalExpenses);

    document.getElementById("surplusResult")
        .textContent = formatCurrency(surplus);

    document.getElementById("investmentResult")
        .textContent =
        formatCurrency(investmentAmount);


    // SHOW SECTIONS

    document.getElementById("planSection")
        .style.display = "block";

    document.getElementById("investmentSection")
        .style.display = "block";

    document.getElementById("emergencySection")
        .style.display = "block";

    document.getElementById("goalSection")
        .style.display = "block";


    // MONTHLY PLAN

    document.getElementById("planExpenses")
        .textContent =
        formatCurrency(totalExpenses);

    document.getElementById("planInvestment")
        .textContent =
        formatCurrency(investmentAmount);

    document.getElementById("planEmergency")
        .textContent =
        formatCurrency(emergencyContribution);

    document.getElementById("planPersonal")
        .textContent =
        formatCurrency(personalAmount);


    // INVESTMENT DATA

    document.getElementById("equityPercent")
        .textContent =
        equityPercent + "%";

    document.getElementById("equityAmount")
        .textContent =
        formatCurrency(equityAmount);


    document.getElementById("debtPercent")
        .textContent =
        debtPercent + "%";

    document.getElementById("debtAmount")
        .textContent =
        formatCurrency(debtAmount);


    document.getElementById("goldPercent")
        .textContent =
        goldPercent + "%";

    document.getElementById("goldAmount")
        .textContent =
        formatCurrency(goldAmount);


    // RISK TEXT

    document.getElementById("riskText")
        .textContent =
        "Your " + risk +
        " risk preference has been used to create the investment allocation.";


    // EMERGENCY FUND

    document.getElementById("emergencyText")
        .textContent =
        "Recommended emergency fund: " +
        formatCurrency(emergencyTarget) +
        " (approximately 6 months of expenses).";


    document.getElementById("emergencyProgress")
        .style.width =
        emergencyPercentage + "%";


    document.getElementById("emergencyStatus")
        .textContent =
        "Your current savings cover approximately " +
        emergencyPercentage.toFixed(0) +
        "% of your recommended emergency fund.";


    // WARNING SYSTEM

    const warningBox =
        document.getElementById("warningBox");


    if (totalExpenses > salary * 0.80) {

        warningBox.className = "warning";

        warningBox.innerHTML =
        "⚠️ Your expenses are above 80% of your salary. Try reducing unnecessary expenses before increasing investments.";

    }

    else if (surplus <= 0) {

        warningBox.className = "warning";

        warningBox.innerHTML =
        "⚠️ Your monthly expenses are equal to or greater than your income. Focus on reducing expenses.";

    }

    else {

        warningBox.className = "success";

        warningBox.innerHTML =
        "✅ Your financial structure looks healthy. Continue building your emergency fund and investing consistently.";

    }


    // SUGGESTIONS

    const suggestions =
        document.getElementById("suggestionsList");

    suggestions.innerHTML = "";


    const advice = [];


    if (savings < emergencyTarget) {

        advice.push(
            "Build your emergency fund until it reaches approximately 6 months of essential expenses."
        );

    }


    if (emi > salary * 0.30) {

        advice.push(
            "Your EMI is relatively high. Try to keep total debt obligations under control before increasing high-risk investments."
        );

    }


    if (investmentAmount > 0) {

        advice.push(
            "Consider investing " +
            formatCurrency(investmentAmount) +
            " per month according to your selected risk profile."
        );

    }


    if (age < 30) {

        advice.push(
            "You have a longer investment horizon. Consistent long-term investing may help you benefit from compounding."
        );

    }

    else if (age >= 50) {

        advice.push(
            "Consider prioritizing capital preservation and maintaining a stronger allocation toward lower-risk investments."
        );

    }


    if (surplus < salary * 0.10) {

        advice.push(
            "Your monthly surplus is low. Review subscriptions, lifestyle expenses and unnecessary spending."
        );

    }


    advice.forEach(function(item) {

        const li =
            document.createElement("li");

        li.textContent = item;

        suggestions.appendChild(li);

    });


    // CREATE CHARTS

    createBudgetChart(
        totalExpenses,
        investmentAmount,
        emergencyContribution,
        personalAmount
    );


    createInvestmentChart(
        equityAmount,
        debtAmount,
        goldAmount
    );

}


function createBudgetChart(
    expenses,
    investment,
    emergency,
    personal
) {

    const ctx =
        document.getElementById("budgetChart");


    if (budgetChartInstance) {

        budgetChartInstance.destroy();

    }


    budgetChartInstance =
    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Expenses",
                "Investments",
                "Emergency Fund",
                "Personal"
            ],

            datasets: [{

                data: [
                    expenses,
                    investment,
                    emergency,
                    personal
                ],

                backgroundColor: [
                    "#ef4444",
                    "#2563eb",
                    "#22c55e",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}


function createInvestmentChart(
    equity,
    debt,
    gold
) {

    const ctx =
        document.getElementById("investmentChart");


    if (investmentChartInstance) {

        investmentChartInstance.destroy();

    }


    investmentChartInstance =
    new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Equity",
                "Debt",
                "Gold"
            ],

            datasets: [{

                data: [
                    equity,
                    debt,
                    gold
                ],

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}