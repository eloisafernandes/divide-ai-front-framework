import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ICategory } from "@/interfaces/ICategory";
import { CategoryForm } from "./CategoryForm";
import { message } from "antd";
import { useCategoryUpdate } from "@/hooks/category/categoryHook";

interface DrawerCategoryProps {
  initialCategory: ICategory;
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerCategory({ initialCategory, isOpen, onClose }: DrawerCategoryProps) {
  const { mutate: updateCategory, isPending } = useCategoryUpdate();

  const handleCategorySave = (values: ICategory) => {
    updateCategory(
      { ...values, id: initialCategory.id },
      {
        onSuccess: () => {
          message.success("Categoria editada com sucesso!");
          onClose();
        },
        onError: () => {
          message.error("Erro ao editar a categoria. Tente novamente.");
        },
      }
    );
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onClose}
      onClose={onClose}>
      <DrawerContent onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Editar Categoria</DrawerTitle>
            <DrawerDescription>
              Altere os detalhes da categoria.
            </DrawerDescription>
            <CategoryForm
              onSubmit={handleCategorySave}
              isLoading={isPending}
              initialData={initialCategory}
            />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
