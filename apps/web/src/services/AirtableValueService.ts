import type { AirtableCellValue } from "../types/backend";

export function selectName(value: AirtableCellValue | undefined) {
  if (!value) {
    return "";
  }

  if (typeof value === "object" && !Array.isArray(value) && "name" in value) {
    return value.name;
  }

  return String(value);
}

export function multiSelectNames(value: AirtableCellValue | undefined) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item : item.name))
    .filter(Boolean);
}

export function textValue(value: AirtableCellValue | undefined) {
  return typeof value === "string" ? value : selectName(value);
}

export function numberValue(value: AirtableCellValue | undefined) {
  return typeof value === "number" ? value : 0;
}

export function booleanValue(value: AirtableCellValue | undefined) {
  return typeof value === "boolean" ? value : false;
}
