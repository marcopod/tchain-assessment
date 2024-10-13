// components/ProductInfoModal.tsx
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Button, Link } from "@nextui-org/react";

interface ProductInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
}

const ProductInfoModal = ({ isOpen, onOpenChange, product }: ProductInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {product?.title}
            </ModalHeader>
            <ModalBody>
              <p><b>Precio:</b> {product?.price}</p>
              <p><b>Descripcion:</b> {product?.description || "No hay descripcion disponible."}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" as={Link} href="/checkout">
                Comprar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductInfoModal;
