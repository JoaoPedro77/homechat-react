'use client';

import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function MeuHeader() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header>
            <Card className="bg-accent-soft-hover rounded-none flex flex-row items-center justify-between p-2 px-4">
                <div className="flex flex-row items-center gap-3">
                    <Image src="/favicon.png" alt="Logo" width={80} height={80} />
                    <div>
                        <Card.Title className="text-xl font-bold">Home Chat</Card.Title>
                        <Card.Description className="text-xs text-muted-foreground">O lar da conversa</Card.Description>
                    </div>
                </div>
                {pathname === "/chat" && (
                    <Button
                        variant="outline"
                        onPress={() => router.push("/")}
                    >
                        <Icon icon={'solar:logout-2-bold-duotone'} />
                        Sair
                    </Button>
                )}
            </Card>
        </header>
    )
}