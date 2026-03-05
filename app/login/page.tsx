'use client';
import Image from "next/image";
import { Button, Card, CardFooter, Form, Label, TextField, Input, FieldError } from '@heroui/react';
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/chat");
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="m-2 flex flex-col items-center justify-center">
        <Form onSubmit={onSubmit} className="space-y-3">
          <Card.Header className="flex flex-row gap-3 items-center justify-center">
            <Image src="/entrar.png" alt="entrar" width={80} height={80}/>
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
              <Input placeholder="Insira seu nome" className='bg-accent/5 shadow-sm'/>
              <FieldError />
            </TextField>
            <TextField isRequired fullWidth name="senha" validate={(value) => {
                  if (value.length < 6) {
                    return "Senha deve ter pelo menos 6 caracteres";
                  }

                  return null;
                }}>
              <Label>Senha</Label>
              <Input type="password" placeholder="Insira sua senha" className='bg-accent/5 shadow-sm'/>
              <FieldError />
            </TextField>
          </Card.Content>
          <CardFooter>
            <Button type="submit" className="w-full shadow-sm">
              Login
              <Image src="/magago.png" alt="Magago" width={40} height={40}/>
            </Button>
          </CardFooter>
        </Form>
      </Card>

    </div>
  );
}
