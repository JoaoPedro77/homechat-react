'use client';
import Image from "next/image";
import { Button, Card, CardFooter, Form, Label, TextField, Input, FieldError } from '@heroui/react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    // Login Anônimo no Supabase guardando o Nome desejado no perfil
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          display_name: name
        }
      }
    });

    if (error) {
      console.error("Erro no Login Anônimo:", error);
      alert("Falha ao entrar no chat. Verifique se ativou o Login Anônimo no Supabase.");
      setLoading(false);
      return;
    }

    router.push("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Card className="m-2 flex flex-col items-center justify-center">
        <Form onSubmit={onSubmit} className="space-y-3">
          <Card.Header className="flex flex-row gap-3 items-center justify-center">
            <Image src="/entrar.png" alt="entrar" width={80} height={80} />
            <div>
              <Card.Title className="text-2xl"> Entre no HomeChat</Card.Title>
              <Card.Description className="text-xs">Bora conversando, Bora conversando!</Card.Description>
            </div>
          </Card.Header>
          <Card.Content>
            <TextField isRequired fullWidth name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Um nome válido é obrigatório";
                }

                return null;
              }}>
              <Label>Nome</Label>
              <Input placeholder="Insira seu nome" className='bg-accent/5 shadow-sm' />
              <FieldError />
            </TextField>
          </Card.Content>
          <CardFooter>
            <Button type="submit" isDisabled={loading} className="w-full shadow-sm">
              {loading ? "Entrando..." : "Login"}
              <Image src="/magago.png" alt="Magago" width={40} height={40} />
            </Button>
          </CardFooter>
        </Form>
      </Card>

    </div>
  );
}
