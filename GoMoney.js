


const loanTypeForm = document.getElementById("loanTypeForm");
if (loanTypeForm) {
  loanTypeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("loanType").value;
    localStorage.setItem("loanType", type);
    window.location.href = "infos.html"; // go to next page
  });
}

const loanForm = document.getElementById("loanForm");
if (loanForm) {
  loanForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("loanAmount", document.getElementById("loanAmount").value);
    localStorage.setItem("loanDuration", document.getElementById("loanDuration").value);
    localStorage.setItem("salary", document.getElementById("salary").value);
    window.location.href = "result.html";
  });
}

if (window.location.pathname.endsWith("result.html")) {
  const amount = parseFloat(localStorage.getItem("loanAmount"));
  const years = parseFloat(localStorage.getItem("loanDuration"));
  const salary = parseFloat(localStorage.getItem("salary"));
  const type = localStorage.getItem("loanType");

  // Adjust rate depending on type of loan
  let rate;
  if (type === "maison") rate = 0.045;
  else if (type === "terrain") rate = 0.05;
  else rate = 0.055;

  const months = years * 12;
  const monthlyRate = rate / 12;
  const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - amount;

  // Inject data into HTML
  document.getElementById("loanType").textContent = type;
  document.getElementById("monthlyPayment").textContent = monthlyPayment.toFixed(2);
  document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
  document.getElementById("totalPayment").textContent = totalPayment.toFixed(2);

  // Salary check
  const warning = document.getElementById("warningMessage");
  const maxAffordable = salary * 0.4;
  if (monthlyPayment > maxAffordable) {
    warning.textContent = "⚠️ Le prêt dépasse 40% de votre salaire.";
  } else {
    warning.textContent = "✅ Le prêt est accessible.";
  }
}