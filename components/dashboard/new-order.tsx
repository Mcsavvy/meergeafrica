import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

export type OrderTableProps = {
  orders: Array<{
    id: string;
    items: string;
    price: number;
    type: string;
  }>;
};

const NewOrdersTable: React.FC<OrderTableProps> = ({ orders }) => (
  <div
    id="new-orders"
    className="overflow-auto flex-[0.6] min-h-[355px] flex flex-col justify-start items-start gap-4 bg-white p-4 lg:p-6 rounded-lg shadow-lg max-sm:min-w-[95%] min-w-[60%]"
  >
    <div className="flex w-full items-center justify-between">
      <h2 className="text-3xl">New Orders Today</h2>
      <Button>Create Order</Button>
    </div>
    <table className="w-full">
      <thead className="border-b border-black">
        <tr>
          <th className="text-lg font-normal py-2 text-left w-[20%]">
            Order No.
          </th>
          <th className="text-lg font-normal py-2 text-left w-[30%]">
            Menu Item(s)
          </th>
          <th className="text-lg font-normal py-2 text-left w-[20%]">Price</th>
          <th className="text-lg font-normal py-2 text-left w-[20%]">
            Order Type
          </th>
          <th className="sr-only text-right w-[5%]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="py-3 text-base">{order.id}</td>
            <td className="py-3 text-base">{order.items}</td>
            <td className="py-3 text-base">{order.price.toLocaleString()}</td>
            <td className="py-3 text-base">{order.type}</td>
            <td className="py-3 text-base text-right">
              <EllipsisVertical className="w-8 h-7 inline-block" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default NewOrdersTable;
