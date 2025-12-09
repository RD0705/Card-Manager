import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMemberSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      
      const { username, password } = parsed.data;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
      
      res.json({ message: "Login realizado com sucesso", user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Logout realizado com sucesso" });
  });

  app.get("/api/members", async (req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar associados" });
    }
  });

  app.get("/api/members/:id", async (req, res) => {
    try {
      const member = await storage.getMember(req.params.id);
      if (!member) {
        return res.status(404).json({ message: "Associado não encontrado" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar associado" });
    }
  });

  app.post("/api/members", async (req, res) => {
    try {
      const parsed = insertMemberSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: parsed.error.flatten() 
        });
      }
      
      const member = await storage.createMember(parsed.data);
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar associado" });
    }
  });

  app.patch("/api/members/:id", async (req, res) => {
    try {
      const partialSchema = insertMemberSchema.partial();
      const parsed = partialSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: parsed.error.flatten() 
        });
      }
      
      const member = await storage.updateMember(req.params.id, parsed.data);
      if (!member) {
        return res.status(404).json({ message: "Associado não encontrado" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar associado" });
    }
  });

  app.delete("/api/members/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMember(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Associado não encontrado" });
      }
      res.json({ message: "Associado removido com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover associado" });
    }
  });

  return httpServer;
}
