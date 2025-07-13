// src/helpers/ocrMock.js

export function extractFromSample(file) {
  // You can log or use file.name if needed
  return {
    structure: {
      title: "Invoice Document",
      sections: ["Header", "Billing Info", "Item Table", "Total"],
    },
    entities: {
      names: ["John Doe"],
      dates: ["2023-08-01"],
      addresses: ["123 Elm Street, NY"],
    },
    tables: [
      {
        headers: ["Item", "Quantity", "Price"],
        rows: [
          ["Notebook", "2", "$6"],
          ["Pen", "5", "$5"],
        ],
      },
    ],
  };
}
