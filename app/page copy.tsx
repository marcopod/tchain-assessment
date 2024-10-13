"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useState } from "react";
import * as CONSTANTS from "@/constants";
import ProductCreationModal from "@/components/ProductCreationModal"; // Import the abstracted component
import ProductInfoModal from "@/components/ProductInfoModal"; // Import the new abstracted ProductInfoModal

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // New modal for showing product details
  const { isOpen: isProductOpen, onOpen: onProductOpen, onOpenChange: onProductOpenChange } = useDisclosure();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // State for the selected product

  const [productList, setProductList] = useState<any>(CONSTANTS.LIST);

  const handleCreateProduct = () => {
    if (name && price) {
      const newProduct = {
        title: name,
        price: `$${price}`,
        description,
      };

      // Add new product to the list
      setProductList([...productList, newProduct]);

      // Clear the form and close the modal
      setName('');
      setPrice('');
      setDescription('');
    }
  };

  // Function to handle card click and set the selected product
  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    onProductOpen(); // Open the modal to show the product details
  };

  return (
    <NextUIProvider>
      <div className="dark text-foreground bg-background min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-4 font-[family-name:var(--font-geist-sans)]">
        <Navbar className="mb-8">
          <NavbarContent justify="end">
            <NavbarItem>
              <Button onPress={onOpen} color="primary">Crear Producto</Button>
              {/* Use the ProductCreationModal component */}
              <ProductCreationModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                description={description}
                setDescription={setDescription}
                handleCreateProduct={handleCreateProduct}
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <main>
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            {productList.map((item: any, index: any) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => handleCardClick(item)} // Pass the clicked product to handleCardClick
              >
                {/* Dropdown button at the top-right corner */}
                <div className="absolute top-2 right-2 z-20">
                  <Dropdown>
                    <DropdownTrigger>
                      {/* No se permite usar botones dentro de botones en HTML, por lo que lo sustituimos por un div */}
                      <div className="group relative inline-flex items-center justify-center box-border overflow-hidden border-medium bg-transparent px-3 min-w-8 h-8 text-medium gap-2 rounded-small  transition-transform-colors-opacity motion-reduce:transition-none border-default text-default-foreground z-10 hover:bg-gray-700">
                        +
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="edit">Editar</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" color="danger">
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="transition-transform duration-300 hover:bg-[#222]">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="w-full object-cover h-[140px]"
                      src={item.img || "https://nextui.org/images/hero-card-complete.jpeg"}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.title}</b>
                    <p className="text-default-500">{item.price}</p>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </main>
        {/* Use the abstracted ProductInfoModal component */}
        <ProductInfoModal
          isOpen={isProductOpen}
          onOpenChange={onProductOpenChange}
          product={selectedProduct}
        />
      </div>
    </NextUIProvider>
  );
}

// "use client";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

// import { NextUIProvider } from "@nextui-org/react";
// import { Navbar, NavbarContent, NavbarItem, Button, Link } from "@nextui-org/react";
// import { useDisclosure } from "@nextui-org/react";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
// import { useState } from "react";
// import * as CONSTANTS from "@/constants";
// import ProductCreationModal from "@/components/ProductCreationModal"; // Import the abstracted component

// export default function Home() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   // New modal for showing product details
//   const { isOpen: isProductOpen, onOpen: onProductOpen, onOpenChange: onProductOpenChange } = useDisclosure();

//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState<any>(null); // State for the selected product

//   const [productList, setProductList] = useState<any>(CONSTANTS.LIST);

//   const handleCreateProduct = () => {
//     if (name && price) {
//       const newProduct = {
//         title: name,
//         price: `$${price}`,
//         description,
//       };

//       // Add new product to the list
//       setProductList([...productList, newProduct]);

//       // Clear the form and close the modal
//       setName('');
//       setPrice('');
//       setDescription('');
//     }
//   }


//   // Function to handle card click and set the selected product
//   const handleCardClick = (product: any) => {
//     setSelectedProduct(product);
//     onProductOpen(); // Open the modal to show the product details
//   };

//   return (
//     <NextUIProvider>
//       <div className="dark text-foreground bg-background min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-4 font-[family-name:var(--font-geist-sans)]">
//         <Navbar className="mb-8">
//           <NavbarContent justify="end">
//             <NavbarItem>
//               <Button onPress={onOpen} color="primary">Crear Producto</Button>
//               {/* Use the ProductCreationModal component */}
//               <ProductCreationModal
//                 isOpen={isOpen}
//                 onOpenChange={onOpenChange}
//                 name={name}
//                 setName={setName}
//                 price={price}
//                 setPrice={setPrice}
//                 description={description}
//                 setDescription={setDescription}
//                 handleCreateProduct={handleCreateProduct}
//               />
//             </NavbarItem>
//           </NavbarContent>
//         </Navbar>
//         <main>
//           <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
//             {productList.map((item: any, index: any) => (
//               <Card
//                 shadow="sm"
//                 key={index}
//                 isPressable
//                 onPress={() => handleCardClick(item)} // Pass the clicked product to handleCardClick
//               >
//                 {/* Dropdown button at the top-right corner */}
//                 <div className="absolute top-2 right-2 z-20">
//                   <Dropdown>
//                     <DropdownTrigger>
//                       {/* No se permite usar botones dentro de botones en HTML, por lo que lo sustituimos por un div */}
//                       <div className="group relative inline-flex items-center justify-center box-border overflow-hidden border-medium bg-transparent px-3 min-w-8 h-8 text-medium gap-2 rounded-small  transition-transform-colors-opacity motion-reduce:transition-none border-default text-default-foreground z-10 hover:bg-gray-700">
//                         +
//                       </div>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Static Actions">
//                       <DropdownItem key="edit">Editar</DropdownItem>
//                       <DropdownItem key="delete" className="text-danger" color="danger">
//                         Eliminar
//                       </DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </div>

//                 <div className="transition-transform duration-300 hover:bg-[#222]">
//                   <CardBody className="overflow-visible p-0">
//                     <Image
//                       shadow="sm"
//                       radius="lg"
//                       width="100%"
//                       alt={item.title}
//                       className="w-full object-cover h-[140px]"
//                       src={item.img || "https://nextui.org/images/hero-card-complete.jpeg"}
//                     />
//                   </CardBody>
//                   <CardFooter className="text-small justify-between">
//                     <b>{item.title}</b>
//                     <p className="text-default-500">{item.price}</p>
//                   </CardFooter>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </main>
//         { /* Modal to display selected product details */}
//         <Modal isOpen={isProductOpen} onOpenChange={onProductOpenChange} size="lg">
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   {selectedProduct?.title}
//                 </ModalHeader>
//                 <ModalBody>
//                   <p><b>Precio:</b> {selectedProduct?.price}</p>
//                   <p><b>Descripcion:</b> {selectedProduct?.description || "No hay descripcion disponible."}</p>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="light" onPress={onClose}>
//                     Cerrar
//                   </Button>
//                   <Button
//                     color="primary"
//                     as={Link}
//                     href="/checkout"
//                   >
//                     Comprar
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       </div>
//     </NextUIProvider>
//   );
// }


// "use client"
// import { NextUIProvider } from "@nextui-org/react";
// import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
// import { useRouter } from 'next/router';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
// import { Input, Textarea } from "@nextui-org/react";
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import * as CONSTANTS from "@/constants"

// export default function Home() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   // New modal for showing product details
//   const { isOpen: isProductOpen, onOpen: onProductOpen, onOpenChange: onProductOpenChange } = useDisclosure();

//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState<any>(null); // State for the selected product

//   const [productList, setProductList] = useState<any>(CONSTANTS.LIST);

//   const handleCreateProduct = () => {
//     if (name && price) {
//       const newProduct = {
//         title: name,
//         price: `$${price}`,
//         description,
//       };

//       // Add new product to the list
//       setProductList([...productList, newProduct]);

//       // Clear the form and close the modal
//       setName('');
//       setPrice('');
//       setDescription('');
//     }
//   }


//   // Function to handle card click and set the selected product
//   const handleCardClick = (product: any) => {
//     setSelectedProduct(product);
//     onProductOpen(); // Open the modal to show the product details
//   };

//   return (
//     <NextUIProvider>
//       <div className="dark text-foreground bg-background min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-4 font-[family-name:var(--font-geist-sans)]">
//         <Navbar className="mb-8">
//           <NavbarContent justify="end">
//             <NavbarItem>
//               <Button onPress={onOpen} color="primary">Crear Producto</Button>
//               <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
//                 <ModalContent>
//                   {(onClose) => (
//                     <>
//                       <ModalHeader className="flex flex-col gap-1">
//                         Creación del Producto
//                       </ModalHeader>
//                       <ModalBody>
//                         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//                           <div className="w-full md:w-2/3">
//                             <Input
//                               label="Nombre del producto"
//                               labelPlacement="outside"
//                               value={name} // Bind input to state
//                               onChange={(e) => setName(e.target.value)} // Update state on input change
//                             />
//                           </div>
//                           <div className="w-full md:w-1/3">
//                             <Input
//                               type="number"
//                               label="Precio"
//                               placeholder="0.00"
//                               labelPlacement="outside"
//                               value={price} // Bind input to state
//                               onChange={(e) => setPrice(e.target.value)} // Update state on input change
//                               startContent={
//                                 <div className="pointer-events-none flex items-center">
//                                   <span className="text-default-400 text-small">$</span>
//                                 </div>
//                               }
//                             />
//                           </div>
//                         </div>
//                         <Textarea
//                           label="Descripción"
//                           value={description} // Bind textarea to state
//                           onChange={(e) => setDescription(e.target.value)} // Update state on change
//                         />
//                       </ModalBody>
//                       <ModalFooter>
//                         <Button color="danger" variant="light" onPress={onClose}>
//                           Close
//                         </Button>
//                         <Button
//                           color="primary"
//                           onPress={() => {
//                             handleCreateProduct(); // Add the product to the product stack
//                             onClose(); // Close the modal
//                           }}
//                         >
//                           Crear
//                         </Button>
//                       </ModalFooter>
//                     </>
//                   )}
//                 </ModalContent>
//               </Modal>
//             </NavbarItem>
//           </NavbarContent>
//         </Navbar>
//         <main>
//           <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
//             {productList.map((item: any, index: any) => (
//               <Card
//                 shadow="sm"
//                 key={index}
//                 isPressable
//                 onPress={() => handleCardClick(item)} // Pass the clicked product to handleCardClick
//               >
//                 {/* Dropdown button at the top-right corner */}
//                 <div className="absolute top-2 right-2 z-20">
//                   <Dropdown>
//                     <DropdownTrigger>
//                       {/* No se permite usar botones dentro de botones en HTML, por lo que lo sustituimos por un div */}
//                       <div className="group relative inline-flex items-center justify-center box-border overflow-hidden border-medium bg-transparent px-3 min-w-8 h-8 text-medium gap-2 rounded-small  transition-transform-colors-opacity motion-reduce:transition-none border-default text-default-foreground z-10 hover:bg-gray-700">
//                         +
//                       </div>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Static Actions">
//                       <DropdownItem key="edit">Editar</DropdownItem>
//                       <DropdownItem key="delete" className="text-danger" color="danger">
//                         Eliminar
//                       </DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </div>

//                 <div className="transition-transform duration-300 hover:bg-[#222]">
//                   <CardBody className="overflow-visible p-0">
//                     <Image
//                       shadow="sm"
//                       radius="lg"
//                       width="100%"
//                       alt={item.title}
//                       className="w-full object-cover h-[140px]"
//                       src={item.img || "https://nextui.org/images/hero-card-complete.jpeg"}
//                     />
//                   </CardBody>
//                   <CardFooter className="text-small justify-between">
//                     <b>{item.title}</b>
//                     <p className="text-default-500">{item.price}</p>
//                   </CardFooter>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </main>

//         {/* Modal to display selected product details */}
//         <Modal isOpen={isProductOpen} onOpenChange={onProductOpenChange} size="lg">
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   {selectedProduct?.title}
//                 </ModalHeader>
//                 <ModalBody>
//                   <p><b>Precio:</b> {selectedProduct?.price}</p>
//                   <p><b>Descripcion:</b> {selectedProduct?.description || "No hay descripcion disponible."}</p>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="light" onPress={onClose}>
//                     Cerrar
//                   </Button>
//                   <Button
//                     color="primary"
//                     as={Link}
//                     href="/checkout"
//                   >
//                     Comprar
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>

//         <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//           {CONSTANTS.FOOTER_LINKS.map((link, index) => (
//             <a
//               key={index}
//               className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//               href={link.href}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Image
//                 aria-hidden
//                 src={link.imgSrc}
//                 alt={link.alt}
//                 width={16}
//                 height={16}
//               />
//               {link.text}
//             </a>
//           ))}
//         </footer>
//       </div>
//     </NextUIProvider>
//   );
// }
