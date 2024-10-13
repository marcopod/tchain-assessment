import { CheckoutForm } from "./CheckoutForm"
import { NextUIProvider, Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

// Codigo del producto hardcodeado
const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID as string;
const CheckoutPage = () => {
    return (
        <NextUIProvider>
            <main>
                <Navbar className="mb-8">
                    <NavbarContent justify="center">
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/">
                                {'<- '}Regresar
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div className="max-w-screen-lg mx-auto">
                    <CheckoutForm priceId={priceId} />
                </div>
            </main>
        </NextUIProvider>

    )
}

export default CheckoutPage