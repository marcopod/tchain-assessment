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
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure(); // Disclosure for edit modal

  const { isOpen: isProductOpen, onOpen: onProductOpen, onOpenChange: onProductOpenChange } = useDisclosure(); // Disclosure for product info modal

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track index of the product being edited

  const [productList, setProductList] = useState<any>(CONSTANTS.LIST);

  const handleCreateProduct = () => {
    if (name && price) {
      const newProduct = {
        title: name,
        price: `$${price}`,
        description,
      };

      setProductList([...productList, newProduct]);
      setName('');
      setPrice('');
      setDescription('');
    }
  };

  // Function to handle editing a product
  const handleEditProduct = (index: number) => {
    const productToEdit = productList[index];
    setEditingIndex(index);
    setName(productToEdit.title);
    setPrice(productToEdit.price.replace("$", "")); // Remove the dollar sign for editing
    setDescription(productToEdit.description || "");
    onEditOpen(); // Open the edit modal
  };

  // Function to handle updating the product after edit
  const handleUpdateProduct = () => {
    if (editingIndex !== null) {
      const updatedProductList = [...productList];
      updatedProductList[editingIndex] = {
        title: name,
        price: `$${price}`,
        img: productList[editingIndex].img,
        description,
      };
      setProductList(updatedProductList);
      setEditingIndex(null); // Clear editing state
      setName('');
      setPrice('');
      setDescription('');
    }
  };

  const handleDeleteProduct = (index: number) => {
    const updatedList = productList.filter((_: any, i: any) => i !== index);
    setProductList(updatedList);
  };

  // Function to open product details modal
  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    onProductOpen(); // Open product details modal
  };

  return (
    <NextUIProvider>
      <div className="dark text-foreground bg-background min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-4 font-[family-name:var(--font-geist-sans)]">
        <Navbar className="mb-8">
          <NavbarContent justify="end">
            <NavbarItem>
              <Button onPress={onOpen} color="primary">Crear Producto</Button>
              {/* Use the ProductCreationModal component for creating a product */}
              <ProductCreationModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                description={description}
                setDescription={setDescription}
                handleCreateOrUpdateProduct={handleCreateProduct}
                modalType="create"
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
                onPress={() => handleCardClick(item)} // Pass the clicked product to handleCardClick and open modal
              >
                <div className="absolute top-2 right-2 z-20">
                  <Dropdown>
                    <DropdownTrigger>
                      <div className="group relative inline-flex items-center justify-center box-border overflow-hidden border-medium backdrop-blur px-3 min-w-8 h-8 text-medium rounded-small border-default z-10 hover:bg-gray-700">
                        Opciones
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Static Actions"
                      onAction={(key) => {
                        if (key === "edit") handleEditProduct(index);
                        if (key === "delete") handleDeleteProduct(index);
                      }}
                    >
                      <DropdownItem key="edit">Editar</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" color="danger">
                        Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="transition-transform duration-300 hover:bg-[#222] group">
                  <CardBody className="overflow-visible p-0 transition-transform duration-300 group-hover:scale-105">
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
        {/* Use the ProductCreationModal for editing a product */}
        <ProductCreationModal
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
          handleCreateOrUpdateProduct={handleUpdateProduct} // Handle update instead of create
          modalType="edit"
        />
        {/* Modal for displaying selected product information */}
        <ProductInfoModal
          isOpen={isProductOpen} // Ensure this opens when a card is clicked
          onOpenChange={onProductOpenChange}
          product={selectedProduct}
        />
      </div>
    </NextUIProvider>
  );
}