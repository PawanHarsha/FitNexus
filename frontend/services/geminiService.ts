import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Product, Gym, Package, WorkoutData } from "../types";

// Update to point to the Django backend
const BASE_API_URL = 'http://localhost:8000/api';

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  const ai = getAIClient();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are NexusCoach, an elite AI fitness assistant for the FitNexus platform. 
      Your goal is to help users with fitness advice. Keep answers concise, motivating, and action-oriented.`,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) initializeChat();
  try {
    const response: GenerateContentResponse = await chatSession!.sendMessage({ message });
    return response.text || "Mainframe error.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error processing request.";
  }
};

/**
 * BACKEND API CALLS
 */

const handleFetch = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('API Unavailable');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    return null;
  }
};

export const fetchProducts = async (category: string = 'All'): Promise<Product[] | null> => {
  const query = category !== 'All' ? `?category=${category}` : '';
  return handleFetch(`/products/${query}`);
};

export const fetchGyms = async (search: string = ''): Promise<Gym[] | null> => {
  const query = search ? `?search=${search}` : '';
  return handleFetch(`/gyms/${query}`);
};

export const fetchPackages = async (): Promise<Package[] | null> => {
  return handleFetch(`/packages/`);
};

export const fetchDashboardData = async (): Promise<WorkoutData[] | null> => {
  return handleFetch(`/dashboard/`);
};