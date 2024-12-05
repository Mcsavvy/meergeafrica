import { EllipsisVertical } from "lucide-react";

export type SalesHistoryProps = {
  sales: Array<{
    id: string;
    paymentType: string;
    status: "success" | "failed";
  }>;
};

const SalesHistory: React.FC<SalesHistoryProps> = ({ sales }) => (
  <div
    id="sales-history"
    className="overflow-auto flex-[0.4] min-h-[355px] flex flex-col justify-start items-start gap-4 bg-white p-4 lg:p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-3xl">Sales History Today</h2>
    <table className="w-full">
      <thead className="border-b border-black">
        <tr>
          <th className="text-lg font-normal py-2 text-left">Order No.</th>
          <th className="text-lg font-normal py-2 text-left">Payment Type</th>
          <th className="text-lg font-normal py-2 text-left">Status</th>
          <th className="sr-only text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr
            key={sale.id}
            className={`group-data-[status="${sale.status}"]/sales`}
          >
            <td className="py-3">{sale.id}</td>
            <td className="py-3">{sale.paymentType}</td>
            <td
              className={`py-3 ${
                sale.status === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {sale.status}
            </td>
            <td className="py-3 w-[5%] text-right">
              <EllipsisVertical className="w-8 h-7 inline-block" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SalesHistory;
