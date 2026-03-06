import { Card } from "@heroui/react";
import Image from "next/image";

export default function MeuHeader() {
    return (
        <header>
            <Card className="bg-accent-soft-hover rounded-none flex flex-row items-center gap-3 p-2 px-4">
                <Image src="/favicon.png" alt="Logo" width={80} height={80} />
                <div>
                    <Card.Title className="text-xl font-bold">Home Chat</Card.Title>
                    <Card.Description className="text-xs text-muted-foreground">O lar da conversa</Card.Description>
                </div>
            </Card>
        </header>
    )
}