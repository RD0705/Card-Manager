import { type User, type InsertUser, type Member, type InsertMember } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllMembers(): Promise<Member[]>;
  getMember(id: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined>;
  deleteMember(id: string): Promise<boolean>;
}

function generateSeedMembers(): Member[] {
  const today = new Date();
  
  const names = [
    "Maria Silva Santos",
    "João Pedro Oliveira",
    "Ana Carolina Costa",
    "Carlos Eduardo Souza",
    "Fernanda Lima Pereira",
    "Ricardo Almeida Neto",
    "Patricia Gomes Ferreira",
    "Lucas Martins Ribeiro",
    "Juliana Araújo Mendes",
    "Roberto Carlos Dias",
    "Camila Rodrigues Silva",
    "André Luiz Barbosa",
  ];

  const generateCPF = (index: number): string => {
    const base = String(11122233344 + index * 11111111).padStart(11, "0");
    return base.slice(0, 11);
  };

  const generateDates = (isActive: boolean): { startDate: string; expirationDate: string } => {
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12 + 1));
    
    const expirationDate = new Date(startDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    
    if (!isActive) {
      expirationDate.setMonth(today.getMonth() - Math.floor(Math.random() * 6 + 1));
    } else {
      expirationDate.setMonth(today.getMonth() + Math.floor(Math.random() * 6 + 1));
    }
    
    return {
      startDate: startDate.toISOString().split("T")[0],
      expirationDate: expirationDate.toISOString().split("T")[0],
    };
  };

  const activePattern = [true, true, true, false, true, false, true, true, false, true, false, true];

  return names.map((name, index) => {
    const isActive = activePattern[index];
    const dates = generateDates(isActive);
    const email = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, ".")
      + "@email.com";
    
    const phones = [
      "(11) 98765-4321",
      "(21) 97654-3210",
      "(31) 96543-2109",
      "(41) 95432-1098",
      "(51) 94321-0987",
      "(61) 93210-9876",
      "(71) 92109-8765",
      "(81) 91098-7654",
      "(85) 90987-6543",
      "(91) 99876-5432",
      "(27) 98765-4320",
      "(48) 97654-3219",
    ];

    return {
      id: randomUUID(),
      name,
      email,
      cpf: generateCPF(index),
      phone: phones[index],
      photoUrl: null,
      startDate: dates.startDate,
      expirationDate: dates.expirationDate,
    };
  });
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private members: Map<string, Member>;

  constructor() {
    this.users = new Map();
    this.members = new Map();
    
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "admin123",
    });
    
    const seedMembers = generateSeedMembers();
    for (const member of seedMembers) {
      this.members.set(member.id, member);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.members.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }

  async getMember(id: string): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const id = randomUUID();
    const member: Member = { ...insertMember, id };
    this.members.set(id, member);
    return member;
  }

  async updateMember(id: string, updates: Partial<InsertMember>): Promise<Member | undefined> {
    const existing = this.members.get(id);
    if (!existing) return undefined;
    
    const updated: Member = { ...existing, ...updates };
    this.members.set(id, updated);
    return updated;
  }

  async deleteMember(id: string): Promise<boolean> {
    return this.members.delete(id);
  }
}

export const storage = new MemStorage();
