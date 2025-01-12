import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types/menu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDuration, formatPrice } from "@/lib/utils";
import { useAddOns, usePairedItems } from "@/lib/hooks/menu";
import { Edit } from "lucide-react";

interface ViewMenuItemProps {
  menuItem: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const ViewMenuItem = ({
  menuItem,
  isOpen,
  onClose,
  onEdit,
}: ViewMenuItemProps) => {
  const pairedItems = usePairedItems(menuItem.pairedItems);
  const addOns = useAddOns(menuItem.addOns);

  return (
    <>
      <Modal
        id={`view-menu-item-${menuItem.id}`}
        className="max-w-4xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Modal.Header>
          <div className="flex items-center justify-start gap-2">
            <h2>Menu Item Details</h2>
            <Button variant="link" onClick={onEdit}>
              <Edit className="!h-5 !w-5" />
              <span className="sr-only">Edit menu item</span>
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body className="md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={menuItem.image}
                  alt={menuItem.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{menuItem.name}</h3>
                  <p className="text-2xl font-bold mt-1">
                    ₦{menuItem.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">{menuItem.category}</Badge>
                  <Badge
                    variant={
                      menuItem.status === "available" ? "default" : "secondary"
                    }
                  >
                    •{" "}
                    {menuItem.status.charAt(0).toUpperCase() +
                      menuItem.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Details</h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <dt className="text-muted-foreground">Size</dt>
                  <dd>
                    {menuItem.size.amount}
                    {menuItem.size.unit}
                  </dd>

                  {menuItem.portions && (
                    <>
                      <dt className="text-muted-foreground">Portions</dt>
                      <dd>{menuItem.portions}</dd>
                    </>
                  )}

                  <dt className="text-muted-foreground">Ready in</dt>
                  <dd>{formatDuration(menuItem.readyTime)}</dd>
                </dl>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <p className="text-sm">{menuItem.ingredients}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
                {addOns.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Available Add-ons</h4>
                    <div className="grid gap-3">
                      {addOns.map((addon) => (
                        <div key={addon.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image
                              src={addon.image!}
                              alt={addon.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{addon.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ₦{addon.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {pairedItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Best Paired With</h4>
                    <div className="grid gap-3">
                      {pairedItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image
                              src={item.image!}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewMenuItem;
