import type { ParkingSpot } from "./parkingSpot.js";
import type { Vehicle } from "./vehicle.js";

export enum TicketStatus {
    Active = "ACTIVE",
    Completed = "COMPLETED"
}
export enum PaymentStatus {
    Pending = "PENDING",
    Success = "SUCCESS",
    Failed = "FAILED"
}

export class ParkingTicket {
    private readonly ticketId: string;
    private readonly entryTime: Date;
    private ticketStatus: TicketStatus;
    private paymentStatus: PaymentStatus = PaymentStatus.Pending
    constructor(
        private readonly vehicle: Vehicle,
        private readonly parkingSpot: ParkingSpot,
    ) {
        this.ticketId = crypto.randomUUID();
        this.entryTime = new Date();
        this.ticketStatus = TicketStatus.Active;
    }

    getTicketId(): string {
        return this.ticketId;
    }

    getParkingSpot(): ParkingSpot {
        return this.parkingSpot;
    }

    getEntryTime(): Date {
        return new Date(this.entryTime);
    }
    getVehicle(): Vehicle {
        return this.vehicle;
    }
    getTicketStatus(): TicketStatus {
        return this.ticketStatus;
    }
    getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }
    markPaymentSuccessful(): void {
        if (this.paymentStatus === PaymentStatus.Success) {
            return;
        }

        this.paymentStatus = PaymentStatus.Success;
    }
    completeTicket(): void {
        if (this.ticketStatus !== TicketStatus.Active) {
            throw new Error("Ticket is not active");
        }

        if (this.paymentStatus !== PaymentStatus.Success) {
            throw new Error("Payment is not completed");
        }

        this.ticketStatus = TicketStatus.Completed;
    }
    markPaymentFailed(): void {
    if (this.paymentStatus === PaymentStatus.Success) {
        throw new Error("Payment already succeeded");
    }

    this.paymentStatus = PaymentStatus.Failed;
}
}