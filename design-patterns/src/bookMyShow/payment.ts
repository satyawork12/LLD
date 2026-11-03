import { randomUUID } from "node:crypto";

interface PaymentTransaction {
    readonly amount: number;
    refunded: boolean;
}

export class Payment {
    private readonly transactions = new Map<string, PaymentTransaction>();

    pay(amount: number): string {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Payment amount must be greater than zero");
        }

        const transactionId = randomUUID();
        this.transactions.set(transactionId, {
            amount,
            refunded: false,
        });

        return transactionId;
    }

    refund(transactionId: string): boolean {
        const transaction = this.transactions.get(transactionId);

        if (!transaction || transaction.refunded) {
            return false;
        }

        transaction.refunded = true;
        return true;
    }
}
