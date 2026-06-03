import axios from "axios";
import { supabase } from "../lib/supabase";

const API_URL = "https://compartir-api.onrender.com";

async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Usuario no autenticado");
  }

  return {
    Authorization: `Bearer ${session.access_token}`,
  };
}

export const sendMessage = async (message, personalityId, conversationId) => {
  const headers = await getAuthHeaders();

  const response = await axios.post(
    `${API_URL}/chat/send`,
    {
      message,
      personality_id: personalityId,
      conversation_id: conversationId,
    },
    {
      headers,
    },
  );



  return response.data;
};

export const deleteConversation = async (conversationId) => {
  const headers = await getAuthHeaders();

  const response = await axios.delete(
    `${API_URL}/chat/conversations/${conversationId}`,
    { headers },
  );

  return response.data;
};

export const getConversations = async () => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${API_URL}/chat/conversations`, {
    headers,
  });

  return response.data;
};

export const getMessages = async (conversationId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(
    `${API_URL}/chat/conversations/${conversationId}/messages`,
    {
      headers,
    },
  );



  return response.data;
};
