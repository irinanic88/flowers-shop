import * as XLSX from "xlsx-js-style";
import { OrderType } from "@/src/types";
import { orderStatusesDict } from "@/src/constants";

const headerStyle = {
  font: { bold: true },
  alignment: { horizontal: "center" },
};

const totalStyle = {
  font: { bold: true },
  alignment: {
    wrapText: true,
    vertical: "top",
  },
};

const metaValueStyle = {
  alignment: { horizontal: "left" },
};

export function exportOrdersToExcel(orders: OrderType[]) {
  const rows: unknown[][] = [];

  orders.forEach((order, orderIndex) => {
    rows.push([
      {
        v: `ORDER #${order.id}`,
        s: { font: { bold: true } },
      },
    ]);

    rows.push([{ v: order.profile_name || "—", s: metaValueStyle }]);

    rows.push([
      {
        v: new Date(order.created_at).toLocaleString(),
        s: metaValueStyle,
      },
    ]);

    rows.push([
      {
        v: orderStatusesDict[order.status],
        s: metaValueStyle,
      },
    ]);

    if (order.comment) {
      rows.push([
        {
          v: `Comentario cliente: ${order.comment}`,
          s: metaValueStyle,
        },
      ]);
    }

    if (order.admin_comment) {
      rows.push([
        {
          v: `Comentario administrador: ${order.admin_comment}`,
          s: metaValueStyle,
        },
      ]);
    }

    rows.push([]);

    rows.push([
      { v: "Producto", s: headerStyle },
      { v: "Cantidad", s: headerStyle },
      { v: "Precio", s: headerStyle },
      { v: "Total", s: headerStyle },
    ]);

    order.items.forEach((item) => {
      rows.push([
        { v: item.title },
        { v: item.quantity },
        { v: item.price },
        { v: item.price * item.quantity },
      ]);
    });

    rows.push([
      { v: "TOTAL", s: totalStyle },
      "",
      "",
      { v: order.total, s: totalStyle },
    ]);

    if (orderIndex < orders.length - 1) {
      rows.push([]);
      rows.push([]);
    }
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);

  ws["!cols"] = [{ wch: 40 }, { wch: 18 }, { wch: 18 }, { wch: 20 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pedidos");

  XLSX.writeFile(wb, "preorders.xlsx");
}
