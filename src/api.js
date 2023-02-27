//supabase mdp : supabaseM2-IDL-2022

const SUPABASE_URL = "https://lbhszopdfalkjjfdxktb.supabase.co/rest/v1/todos";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaHN6b3BkZmFsa2pqZmR4a3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MDU2NDUsImV4cCI6MTk5MzA4MTY0NX0.MD4jMpfuVOkJuFEszn3w_iBdenrhiWLizgJhAEx-0-0";


/**
 * Récupère les items sur Supabase
 * @returns Promise<array>
 */
export const loadTodoItemsFromApi = () => {
  return fetch(`${SUPABASE_URL}?order=created_at`, {
    headers: {
      apiKey: SUPABASE_API_KEY,
    },
  }).then((response) => response.json());
};

/**
 * Récupère une tâche sur Supabase grâce à son identifiant
 * @param {number} id 
 * @returns Promise<{id: number, text: string, done: boolean}>
 */
export const loadTodoItemFromApi = (id) => {
  return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      headers: {
          "Content-Type": "application/json",
          apiKey: SUPABASE_API_KEY,
          Prefer: "return=representation",
      },
  })
      .then((response) => response.json())
      .then((items) => items[0]);
};
  
/**
 * Modifie le statut d'une tâche sur Supabase
 * @returns Promise<array>
 */
export const toggleComplete = (id, done) => {
  return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_KEY,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ done: done }),
  });
};
  
/**
 * Créé une nouvelle tâche dans Supabase
 * @returns Promise<{id: number, text: string, done: boolean}>
 */
export const saveTodoItemToApi = (item) => {
  return fetch(SUPABASE_URL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_KEY,
      Prefer: "return=representation",
    },
  }).then((response) => response.json());
};