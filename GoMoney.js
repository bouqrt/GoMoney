function selectLoan(type) {
  // Save the selected loan type
  localStorage.setItem("loanType", type);
  // Go to next page
  window.location.href = "personalinfos.html";
}
const loanForm = document.getElementById("loanForm");
if (loanForm) {
  loanForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = document.getElementById("loanAmount").value;
    const duration = document.getElementById("loanDuration").value;
    const salary = document.getElementById("salary").value;

    // Save form data
    localStorage.setItem("loanAmount", amount);
    localStorage.setItem("loanDuration", duration);
    localStorage.setItem("salary", salary);

    // Redirect to results page
    window.location.href = "results.html";
  });
}

// === Retrieve data ===
const loanType = localStorage.getItem("loanType");
const amount = parseFloat(localStorage.getItem("loanAmount"));
const years = parseFloat(localStorage.getItem("loanDuration"));
const salary = parseFloat(localStorage.getItem("salary"));

// === Calculate ===
const interestRate = 4.5;
const monthlyRate = interestRate / 100 / 12;
const months = years * 12;
const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
const totalPayment = monthlyPayment * months;
const totalInterest = totalPayment - amount;

// === Display results ===
document.getElementById("loanType").textContent = loanType || "—";
document.getElementById("loanAmount").textContent = amount.toFixed(2);
document.getElementById("interestRate").textContent = interestRate.toFixed(2);
document.getElementById("monthlyPayment").textContent = monthlyPayment.toFixed(2);
document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
document.getElementById("totalPayment").textContent = totalPayment.toFixed(2);

// === Conditions ===
const warning = document.getElementById("warningMessage");
if (monthlyPayment < 40) {
  warning.textContent = "❌ Le prêt n’est pas possible : la mensualité est inférieure à 40 MAD.";
} else {
  warning.textContent = "✅ Le prêt est réalisable selon les informations fournies.";
}

// === Recap ===
const recap = document.getElementById("recapMessage");
recap.innerHTML = `
  <h6>🧾 Récapitulatif :</h6>
  <ul class="list-unstyled m-0">
    <li><strong>Type de prêt :</strong> ${loanType}</li>
    <li><strong>Montant demandé :</strong> ${amount.toFixed(2)} MAD</li>
    <li><strong>Taux appliqué :</strong> ${interestRate.toFixed(2)} %</li>
    <li><strong>Mensualité :</strong> ${monthlyPayment.toFixed(2)} MAD</li>
    <li><strong>Total des intérêts :</strong> ${totalInterest.toFixed(2)} MAD</li>
    <li><strong>Montant total à rembourser :</strong> ${totalPayment.toFixed(2)} MAD</li>
  </ul>
`;