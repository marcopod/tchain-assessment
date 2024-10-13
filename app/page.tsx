"use client";
import {
  NextUIProvider,
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import * as CONSTANTS from "@/constants";
import ProductCreationModal from "@/components/ProductCreationModal";
import ProductInfoModal from "@/components/ProductInfoModal";

type Product = {
  title: string;
  price: string;
  description?: string;
  img?: string;
};

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const { isOpen: isProductOpen, onOpen: onProductOpen, onOpenChange: onProductOpenChange } = useDisclosure();

  // State management for product data
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [productList, setProductList] = useState<Product[]>(CONSTANTS.LIST);

  // Utility function to reset product form
  const resetProductForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setEditingIndex(null);
  };

  // Handle product creation or update
  const handleCreateOrUpdateProduct = () => {
    if (!name || !price) return; // Validate fields

    const product: Product = {
      title: name,
      price: `$${price}`,
      description,
      img: editingIndex !== null ? productList[editingIndex]?.img : undefined,
    };

    if (editingIndex !== null) {
      // Update existing product
      const updatedList = [...productList];
      updatedList[editingIndex] = product;
      setProductList(updatedList);
    } else {
      // Create new product
      setProductList([...productList, product]);
    }

    resetProductForm();
  };

  // Handle product edit
  const handleEditProduct = (index: number) => {
    const product = productList[index];
    setName(product.title);
    setPrice(product.price.replace("$", ""));
    setDescription(product.description || "");
    setEditingIndex(index);
    onEditOpen();
  };

  // Handle product deletion
  const handleDeleteProduct = (index: number) => {
    setProductList(productList.filter((_, i) => i !== index));
  };

  // Handle product detail view
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    onProductOpen();
  };

  return (
    <NextUIProvider>
      <div className="dark text-foreground bg-background min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-4 font-[family-name:var(--font-geist-sans)]">
        <Navbar className="mb-8">
          <NavbarContent justify="end">
            <NavbarItem>
              <Button onPress={onOpen} color="primary">Crear Producto</Button>
              {/* Modal for product creation */}
              <ProductCreationModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                description={description}
                setDescription={setDescription}
                handleCreateOrUpdateProduct={handleCreateOrUpdateProduct}
                modalType="create"
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <main>
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            {productList.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => handleCardClick(item)}
              >
                <div className="absolute top-2 right-2 z-20">
                  <Dropdown>
                    <DropdownTrigger>
                      <div className="group relative inline-flex items-center justify-center box-border overflow-hidden border-medium backdrop-blur px-3 min-w-8 h-8 text-medium rounded-small border-default z-10 hover:bg-gray-700">
                        Opciones
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Product Actions"
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

        {/* Modal for editing a product */}
        <ProductCreationModal
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
          handleCreateOrUpdateProduct={handleCreateOrUpdateProduct}
          modalType="edit"
        />

        {/* Modal for displaying selected product details */}
        <ProductInfoModal
          isOpen={isProductOpen}
          onOpenChange={onProductOpenChange}
          product={selectedProduct}
        />
      </div>
    </NextUIProvider>
  );
}
