import { createClient } from "@supabase/supabase-js";

// Pegando as variáveis de ambiente que definimos no .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criando e exportando o cliente do banco de dados
export const supabase = createClient(supabaseUrl, supabaseKey);
