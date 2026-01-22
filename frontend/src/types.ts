export type FieldType = "text" | "textarea" | "date" | "number" | "email" | "phone";

export interface FieldDescriptor {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}
