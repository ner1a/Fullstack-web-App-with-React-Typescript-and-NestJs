import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';

export type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: { lat?: string; lng?: string };
  };
  phone?: string;
  website?: string;
  company?: { name?: string; catchPhrase?: string; bs?: string };
};

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    try {
      const filePath = __dirname + '/../../src/data/users.json';
      const raw = readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw) as User[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.users = parsed;
        this.nextId =
          (this.users.reduce((max, u) => Math.max(max, u.id), 0) || 0) + 1;
      }
    } catch (err) {
      console.warn('Could not load users.json, starting with empty users', err);
    }
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  create(partial: Omit<User, 'id'>): User {
    const newUser: User = { id: this.nextId++, ...partial };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, patch: Partial<Omit<User, 'id'>>): User {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException(`User ${id} not found`);
    this.users[idx] = { ...this.users[idx], ...patch };
    return this.users[idx];
  }

  remove(id: number): { removed: boolean } {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException(`User ${id} not found`);
    this.users.splice(idx, 1);
    return { removed: true };
  }
}
