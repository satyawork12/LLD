import type { User } from "./user.js";

export class UserRepository {
    private readonly users = new Map<string, User>();

    save(user: User): void {
        this.users.set(user.id, user);
    }

    getById(userId: string): User | undefined {
        return this.users.get(userId);
    }

    getAll(): User[] {
        return Array.from(this.users.values());
    }
}
