import type { Dispense } from "./dispense.js";
import type { Payment } from "./payment.js";
import type { Product } from "./products.js";


interface CurrTransaction {
    paymentStatus: "Paid" | "Pending";
    dispenseStatus: "Sucess" | "Pending";
    ProductQtyUpdated: boolean;
    productId: string,
    transactionId : string | null;
}

export class Machine {
    private currTransaction: CurrTransaction | null = null;
    private qty: Map<string, number> = new Map();
    private products: Set<string> = new Set();
    private productList: Set<Product> = new Set();
    private arrangementOfProduct: Map<string, [number, number]> = new Map();
    constructor(private dispense: Dispense,
        private payment: Payment) { };

    addProductToMachine(product: Product, qty: number) {
        const productId = product.id;
        if (!this.arrangementOfProduct.has(productId)) {
            throw new Error(`location for that product is not defined`);
        }
        this.products.add(productId);
        this.qty.set(productId, this.qty.getOrInsert(productId, 0) + qty);
        this.productList.add(product);


    }
    reduceOneQtyOfProductFromMachine(product: Product) {
        const productId = product.id;
        const hasProduct = this.products.has(productId);
        if (!hasProduct) {
            throw new Error(`give product id ${productId} is not found`);
        }
        const currQty = this.qty.get(productId);
        if (currQty == 0) {
            throw new Error(`product is not available ${productId}`);
        }
        this.qty.set(productId, currQty! - 1);
    }
    defineLocationDForProduct(productId: string, location: [number, number]) {
        this.arrangementOfProduct.set(productId, location)
    }
    viewProduct() {
        const productList: Product[] = [];
        for (const product of this.productList) {
            productList.push(product);
        }
        return productList;
    }
    buy(productId: string) {
        if (this.currTransaction == null) {
            this.currTransaction = {
                paymentStatus: "Pending",
                dispenseStatus: "Pending",
                ProductQtyUpdated: false,
                productId: productId,
                transactionId : null,

            }
        }
        if (this.currTransaction.productId != productId) {
            throw new Error("finish the current transcation then start new one")
        }
        const isPaymentDone = this.currTransaction?.paymentStatus;
        let productObj: Product | null = null;
        for (let product of this.productList) {
            if (product.id == productId) {
                productObj = product;

            }
        }
        if (productObj == null) {
            throw new Error("Product obj is not found ")
        }
        if (isPaymentDone === "Pending") {
            try {
                let productFee = null;
                for (let product of this.productList) {
                    if (product.id == productId) {
                        productFee = product.price;
                    }
                }
                if (productFee == null) {
                    throw new Error("Productfee is not found")
                }

                const paymentSuccessful = this.payment.pay(productFee);
                if (!paymentSuccessful) {
                    throw new Error("Payment failed");
                }

                this.currTransaction!.paymentStatus = "Paid";
                this.currTransaction!.transactionId = paymentSuccessful;
            }
            catch (error) {
                throw new Error("Payment failed")
            }
        }

        const isProductDispensed = this.currTransaction?.dispenseStatus;
        if (isProductDispensed == "Pending") {
            try {
                const productLocation = this.arrangementOfProduct.get(productId);
                if (productLocation == undefined) {
                    throw new Error("Product location is not found")
                }
                const isDispenseSucceed = this.dispense.dispense(productLocation)
                if (!isDispenseSucceed) {
                    if(this.currTransaction.transactionId!=null){

                        this.payment.refund(this.currTransaction.transactionId);
                    }
                    throw new Error("Dispense failed ")
                }
                this.currTransaction!.dispenseStatus = "Sucess"
            }
            catch {

                throw new Error("Dispense failed");
            }

        }

        try {
            if (!this.currTransaction.ProductQtyUpdated) {
                this.reduceOneQtyOfProductFromMachine(productObj);
                this.currTransaction!.ProductQtyUpdated = true;
            }
            
            

        }
        catch {
            throw new Error("There is an error updating the stock")
        }
        const shouldTransactionBeCompleted = this.currTransaction?.ProductQtyUpdated == true &&
            this.currTransaction.dispenseStatus === "Sucess" &&
            this.currTransaction.paymentStatus === "Paid";
        if (shouldTransactionBeCompleted) {
            this.currTransaction = null;
        }
    }

}