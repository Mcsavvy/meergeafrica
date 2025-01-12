// import InputMask from "react-input-mask";
// import { ChangeEvent, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Product {
//   id: number;
//   name: string;
//   image: File | null;
//   manufacturer: string;
//   price: string;
//   unitsAvailable: string;
//   size: string;
//   weight: string;
//   expiryDate: string;
//   description: string;
//   availability: string;
//   deliveryTime: string;
//   pickupOption: string;
// }

// // Define the AddProductDialogProps interface
// interface AddProductDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   onAdd: (product: Product) => void;
//   newProduct: Omit<Product, "id">;
//   setNewProduct: (product: Omit<Product, "id">) => void;
// }

// const AddProductDialog: React.FC<AddProductDialogProps> = ({
//   open,
//   setOpen,
//   onAdd,
//   newProduct,
//   setNewProduct,
// }) => {
//   const [errors, setErrors] = useState<{
//     [key in keyof Omit<Product, "id">]?: string;
//   }>({});

//   const validateForm = (): boolean => {
//     const newErrors: { [key in keyof Omit<Product, "id">]?: string } = {};

//     // Required field checks for all fields
//     if (!newProduct.name?.trim()) newErrors.name = "Product name is required";
//     else if (!/^[a-zA-Z\s]+$/.test(newProduct.name))
//       newErrors.name = "Input a correct name (letters and spaces only)";

//     if (!newProduct.image) newErrors.image = "Product image is required";
//     else {
//       const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
//       if (!allowedTypes.includes(newProduct.image.type)) {
//         newErrors.image = "Only PNG and JPEG images are allowed";
//       }
//     }

//     if (!newProduct.manufacturer?.trim())
//       newErrors.manufacturer = "Manufacturer's name is required";
//     else if (!/^[a-zA-Z\s]+$/.test(newProduct.manufacturer))
//       newErrors.manufacturer = "Manufacturer's name must contain only letters";

//     if (!newProduct.price?.trim()) newErrors.price = "Price is required";
//     else {
//       const sanitizedPrice = newProduct.price.replace(/,/g, "");
//       if (!/^\d+(\.\d{1,2})?$/.test(sanitizedPrice))
//         newErrors.price = "Invalid price format. Use 0.00 or 0,000.00 format";
//     }

//     if (!newProduct.unitsAvailable?.trim())
//       newErrors.unitsAvailable = "Units available is required";
//     else if (!/^\d+$/.test(newProduct.unitsAvailable))
//       newErrors.unitsAvailable = "Units available must be a whole number";

//     if (!newProduct.size?.trim()) newErrors.size = "Size is required";
//     else if (!/^\d+$/.test(newProduct.size))
//       newErrors.size = "Size must be a number";

//     if (!newProduct.weight?.trim()) newErrors.weight = "Weight is required";
//     else if (!/^\d+(\.\d+)?(G\/kg\/L)?$/.test(newProduct.weight))
//       newErrors.weight = "Invalid weight format. Use 0.00G/kg/L format";

//     if (!newProduct.expiryDate?.trim())
//       newErrors.expiryDate = "Expiry date is required";
//     else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(newProduct.expiryDate))
//       newErrors.expiryDate = "Invalid expiry date format. Use MM/YY";

//     if (!newProduct.description?.trim())
//       newErrors.description = "Product description is required";

//     if (!newProduct.availability)
//       newErrors.availability = "Availability is required";

//     if (!newProduct.deliveryTime)
//       newErrors.deliveryTime = "Delivery time is required";

//     if (!newProduct.pickupOption)
//       newErrors.pickupOption = "Pickup option is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (
//     event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = event.target;
    
//     if (event.target instanceof HTMLInputElement && event.target.type === 'file') {
//       const files = event.target.files;
//       if (files) {
//         setNewProduct({ ...newProduct, [name]: files[0] });
//       }
//     } else {
//       setNewProduct({ ...newProduct, [name]: value });
//     }
//   };

//   const handleAdd = () => {
//     if (validateForm()) {
//       onAdd({ ...newProduct, id: Date.now() } as Product);
//       setNewProduct({
//         name: "",
//         image: null,
//         manufacturer: "",
//         price: "",
//         unitsAvailable: "",
//         size: "",
//         weight: "",
//         expiryDate: "",
//         description: "",
//         availability: "",
//         deliveryTime: "",
//         pickupOption: ""
//       });
//       setErrors({});
//       setOpen(false);
//     }
//   };

//   const fieldLabels: { [key: string]: string } = {
//     name: "Product Name",
//     image: "Product Image",
//     manufacturer: "Manufacturer's Name",
//     price: "Price (₦)",
//     unitsAvailable: "Units Available",
//     size: "Size",
//     weight: "Weight (kg/L)",
//     expiryDate: "Expiry Date (MM/YY)",
//     availability: "Availability Status",
//     deliveryTime: "Delivery Time Estimate",
//     pickupOption: "Pick Up Option",
//     description: "Product Description",
//   };

//   const leftFields = [
//     "name",
//     "image",
//     "manufacturer",
//     "price",
//     "unitsAvailable",
//     "size",
//     "weight",
//   ];
//   const rightFields = [
//     "expiryDate",
//     "availability",
//     "deliveryTime",
//     "pickupOption",
//     "description",
//   ];

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[800px]">
//         <DialogHeader>
//           <DialogTitle>Add Product</DialogTitle>
//         </DialogHeader>
//         <div className="flex gap-4 py-4">
//           {/* ... (JSX for form fields - same as before, but using handleChange) */}
//           <div className="w-1/2">
//             {leftFields.map((key) => (
//               <div key={key} className="mb-4">
//                 <Label
//                   htmlFor={key}
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   {fieldLabels[key] || key.replace(/([A-Z])/g, " $1").trim()}
//                 </Label>
//                 {key === "image" ? (
//                   <Input
//                     type="file"
//                     id={key}
//                     name={key} // Add name attribute
//                     onChange={handleChange}
//                   />
//                 ) : key === "unitsAvailable" || key === "size" ? (
//                   <Input
//                     type="number"
//                     id={key}
//                     name={key} // Add name attribute
//                     value={newProduct[key] || ""}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   <Input
//                     type="text"
//                     id={key}
//                     name={key} // Add name attribute
//                     value={newProduct[key] || ""}
//                     onChange={handleChange}
//                     placeholder={`Enter ${key
//                       .replace(/([A-Z])/g, " $1")
//                       .trim()}`}
//                   />
//                 )}
//                 {errors[key] && (
//                   <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="w-1/2">
//             {rightFields.map((key) => (
//               <div key={key} className="mb-4">
//                 <Label
//                   htmlFor={key}
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   {fieldLabels[key] || key.replace(/([A-Z])/g, " $1").trim()}
//                 </Label>
//                 {key === "availability" ||
//                 key === "deliveryTime" ||
//                 key === "pickupOption" ? (
//                   <Select
//                     name={key} // Add name attribute
//                     onValueChange={(value) =>
//                       setNewProduct({ ...newProduct, [key]: value })
//                     }
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue
//                         placeholder={`Select ${key
//                           .replace(/([A-Z])/g, " $1")
//                           .trim()}`}
//                       />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {key === "availability" && (
//                         <>
//                           <SelectItem value="In Stock">In Stock</SelectItem>
//                           <SelectItem value="Out of Stock">
//                             Out of Stock
//                           </SelectItem>
//                         </>
//                       )}
//                       {key === "deliveryTime" && (
//                         <>
//                           <SelectItem value="1-3 days">1-3 days</SelectItem>
//                           <SelectItem value="3-5 days">3-5 days</SelectItem>
//                         </>
//                       )}
//                       {key === "pickupOption" && (
//                         <>
//                           <SelectItem value="Available">Available</SelectItem>
//                           <SelectItem value="Not Available">
//                             Not Available
//                           </SelectItem>
//                         </>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 ) : (
//                   <>
//                     {key === "expiryDate" ? (
//                       <InputMask
//                         mask="99/99"
//                         maskChar="_"
//                         value={newProduct.expiryDate || ""}
//                         onChange={handleChange} // Use handleChange
//                         placeholder="MM/YY"
//                       >
//                         {(inputProps) => (
//                           <Input
//                             {...inputProps}
//                             type="text"
//                             id={key}
//                             name={key}
//                           />
//                         )}
//                       </InputMask>
//                     ) : (
//                       <Input
//                         type="text"
//                         id={key}
//                         name={key} // Add name attribute
//                         value={newProduct[key] || ""}
//                         onChange={handleChange}
//                         placeholder={`Enter ${key
//                           .replace(/([A-Z])/g, " $1")
//                           .trim()}`}
//                       />
//                     )}
//                   </>
//                 )}
//                 {errors[key] && (
//                   <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
//                 )}
//               </div>
//             ))}
//             <div className="flex justify-end mt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setOpen(false)}
//                 className="mr-2"
//               >
//                 Cancel
//               </Button>
//               <Button onClick={handleAdd}>Add</Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddProductDialog;
