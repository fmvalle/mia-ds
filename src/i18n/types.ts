export type Locale = 'pt-BR' | 'en'

export type MessageTree = {
  [key: string]: string | MessageTree
}

export type Messages = MessageTree
