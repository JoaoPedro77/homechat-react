'use client';

import { Card, Form, ScrollShadow, Button, TextField,TextArea } from "@heroui/react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../lib/supabase";

export default function Chat() {
  
  type Mensagem = {
    id: number;
    nome: string;
    conteudo: string;
    user_id?: string;
    criado_em?: string;
  };

  type User = {
    id: string;
    nome: string;
  };

  const [textoMensagem, setTextoMensagem] = useState("");
  const [listaMensagens, setListaMensagens] = useState<Mensagem[]>([]);

  // Armazena o usuário atualmente logado para referências no chat
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Função para carregar as mensagens do banco
  const carregarMensagens = async () => {
    try {
      const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('id', { ascending: true }); // garante que as antigas vão aparecer primeiro
        
      if (error) {
        console.error("Erro ao buscar mensagens:", error.message);
        return;
      }
      
      if (data) {
        setListaMensagens(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let unmounted = false;

    const inicializaChat = async () => {
      // Pega o usuário da sessão logada no Supabase
      const { data: { session } } = await supabase.auth.getSession();
      if (!unmounted && session?.user) {
        setCurrentUser({
            id: session.user.id,
            nome: session.user.user_metadata?.display_name || "Anônimo"
        });
      }

      const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('criado_em', { ascending: true });

      if (!unmounted && data && !error) {
        setListaMensagens(data);
      }
    };

    inicializaChat();

    return () => {
      unmounted = true;
    };
  }, []);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!textoMensagem.trim() || !currentUser) return;

    // Guarda o texto pra limpar o input antes da request terminar e não travar a UI
    const textoParaEnviar = textoMensagem;
    setTextoMensagem("");

    // 1. Inserimos a mensagem
    const { error } = await supabase
      .from('mensagens')
      .insert([ 
        { 
            nome: currentUser.nome, 
            conteudo: textoParaEnviar,
            user_id: currentUser.id 
        } 
      ]);

    if (error) {
      console.error("Erro ao enviar mensagem! Você configurou as tabelas no Supabase?", error.message);
      // Se der erro, volta o texto pro input
      setTextoMensagem(textoParaEnviar);
      return;
    }

    // 2. Se deu bom, buscamos a lista de mensagens inteira de volta
    carregarMensagens();
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
        <p>Conectando ao banco...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-0 h-full">
      <ScrollShadow className="w-full sm:w-[70%] pb-5 min-h-0 h-full">
        <div className="flex flex-col items-start justify-start min-h-full">
          {listaMensagens.map((mensagem) => (
            <Card className={`rounded-lg p-2 m-2  gap-0 max-w-[70%] ${
                  mensagem.user_id === currentUser.id 
                    ? "self-end rounded-tr-none bg-accent-soft-foreground/30" 
                    : "self-start rounded-tl-none bg-accent-soft"
                }` } key={mensagem.id} >
              <Card.Description className="text-xs">{mensagem.nome}</Card.Description>
              <p className="text-wrap whitespace-pre-wrap wrap-break-word">{mensagem.conteudo}</p>
            </Card>
          ))}
        </div>
      </ScrollShadow>
      <Card className="w-[95%] m-4 p-2 shrink-0 ">
        <Form onSubmit={onSubmit} className="flex flex-row items-center p-2 gap-2 w-full">
          <TextField name="message" className="flex-1">
            <TextArea
              name="textoMensagem"
              value={textoMensagem}
              onChange={(e) => setTextoMensagem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (textoMensagem.trim() !== "") {
                    const form = e.currentTarget.form;
                    if (form) {
                      form.requestSubmit();
                    }
                  }
                }
              }} placeholder="Digite sua mensagem" className="resize-none bg-default/50" />
          </TextField>
          <Button
            type="submit"
            isDisabled={textoMensagem.trim() === ""}
            isIconOnly
          >
            <Icon icon="solar:map-arrow-right-bold-duotone" />
          </Button>
        </Form>
      </Card>
    </div>
  );
}
