import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ transactions }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Tracker Report", 14, 20);

    autoTable(doc, {
      head: [["Description", "Amount", "Category", "Date"]],
      body: transactions.map((item) => [
        item.text,
        item.amount,
        item.category,
        item.date,
      ]),
      startY: 30,
    });

    doc.save("Expense_Report.pdf");
  };

  return (
    <button onClick={exportPDF}>
      📑 Export PDF
    </button>
  );
}

export default ExportPDF;