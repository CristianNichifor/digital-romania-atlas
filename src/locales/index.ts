import { en } from "./en";
import { ro } from "./ro";
import type { Lang } from "../i18n";

export type MessageKey = keyof typeof ro;

export const messages: Record<Lang, Record<MessageKey, string>> = { ro, en };
