"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";

interface ProductCreationModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  name: string;
  setName: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  handleCreateOrUpdateProduct: () => void;
  modalType: "create" | "edit"; // Reuso este modal para crear y editar productos
}

const ProductCreationModal = ({
  isOpen,
  onOpenChange,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  handleCreateOrUpdateProduct,
  modalType,
}: ProductCreationModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modalType === "create" ? "Creación del Producto" : "Editar Producto"}
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <div className="w-full md:w-2/3">
                  <Input
                    label="Nombre del producto"
                    placeholder="Manzana"
                    labelPlacement="outside"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    startContent={
                      <></>
                    }
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <Input
                    type="number"
                    label="Precio"
                    placeholder="0.00"
                    labelPlacement="outside"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                </div>
              </div>
              <Textarea
                label="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleCreateOrUpdateProduct(); // Crear o Modificar producto
                  onClose();
                }}
              >
                {modalType === "create" ? "Crear" : "Guardar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductCreationModal;