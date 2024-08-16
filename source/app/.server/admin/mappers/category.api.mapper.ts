import { Category } from "@prisma/client";
import { TCategoryDto } from "../dto/category.dto";

export const categoryApiMapper = (
  category: Partial<Category>
): Partial<TCategoryDto> => {
  return {
    id: String(category.id),
    title: category.title || "-/-",
  };
};
