import { saveAs } from "file-saver";

function ExportCSV({ transactions }) {
  const exportCSV = () => {
    const headers = "Description,Amount,Category,Date\n";

    const rows = transactions
      .map(
        (item) =>
          `${item.text},${item.amount},${item.category},${item.date}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "transactions.csv");
  };

  return (
    <button onClick={exportCSV}>
      📄 Export CSV
    </button>
  );
}

export default ExportCSV;