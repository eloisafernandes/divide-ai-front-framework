
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
    DrawerDescription,
    DrawerTitle
} from "@/components/ui/drawer";
import { Form, message } from "antd";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useJoinGroup } from "@/hooks/group/groupHook";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { IJoinGroup } from "@/interfaces/IGroup";


export function DrawerInsertCode() {
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();
    const { mutate } = useJoinGroup(); 
    const userId = getUserLocalStorage()?.id;

    const handleClose = () => {
        setIsOpen(false);
        form.resetFields();
    };

    const handleInsertGroupCode = (values: any) => {
        if (userId) {
            const payload: IJoinGroup = {
                code: values.code,
                userId: userId,
            };
            mutate(payload, {
                onSuccess: () => {
                    setIsOpen(false); 
                    form.resetFields();
                    message.success('Você entrou no grupo com sucesso!');
                },
                onError: (error: any) => {
                    message.error(error.message);
                }
            });
        }
    };
    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
            <DrawerTrigger asChild>
                <Button variant="link">Entrar em grupo</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>Entrar em um grupo</DrawerTitle>
                        <DrawerDescription>
                            Forneça o código do grupo e aproveite!
                        </DrawerDescription>
                        <Form 
                            form={form}
                            name="join-group-form"
                            onFinish={handleInsertGroupCode}
                            initialValues={{ code: '' }}
                        >
                            <Label htmlFor="code" className="font-medium">Código</Label>
                            <Form.Item
                                name="code"
                                className="text-primary m-0 mt-2"
                                rules={[{ required: true, message: 'Por favor, insira o código do grupo!' }]}
                            >
                                <Input id="code" />
                            </Form.Item>

                            <Button variant="divideDark" type="submit" className="w-full mt-4">
                                Inserir
                            </Button>
                        </Form>
                    </DrawerHeader>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
