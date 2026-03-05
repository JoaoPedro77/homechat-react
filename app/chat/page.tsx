'use client';

import { Card, Form, ScrollShadow, Button, TextField, Label, TextArea } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function Chat() {

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextoMensagem("");
  };

  const [textoMensagem, setTextoMensagem] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-center justify-start w-full p-2">
        <Button
          variant="outline"
          onPress={() => {
            router.push("/");
          }}
        >
          <Icon icon={'solar:logout-2-bold-duotone'}/>
          Sair
        </Button>
      </div>
      <ScrollShadow className="w-full sm:w-[70%]">
        <div className="w-full flex flex-col items-center justify-center h-screen">
          <h1>Chat</h1>
        </div>
      </ScrollShadow>
      <Card className="w-[95%] m-4 p-2 shrink-0">
          <Form onSubmit={onSubmit} className="flex flex-row items-center p-2 gap-2 w-full">
            <TextField name="message" className="flex-1">
                <TextArea
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
              }} placeholder="Digite sua mensagem" className="resize-none bg-default/50"/>
              </TextField>
              <Button
              type="submit"
              isDisabled={textoMensagem.trim() === ""}
              isIconOnly
              >
                <Icon icon={'solar:map-arrow-right-bold-duotone'}/>
              </Button>
          </Form>
      </Card>
    </div>
  );
}
