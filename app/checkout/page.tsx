import { CheckoutForm } from "./CheckoutForm"
import { NextUIProvider, Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const CheckoutPage = () => {
    // Codigo del producto hardcodeado
    const priceId = 'price_1Q9GFM2L610zh1yMwpqh9DQw'

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