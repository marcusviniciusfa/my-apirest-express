export enum PATTERN {
  POSITIVE_NUMBER = '^[0-9]+$',
  UUID = '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
  EMAIL = '^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$',
  PASSWORD = '^[^ \t\r\n]{8,16}$'
}

export enum FILE {
  RANDOM_NAME_KEY_LENGTH = 32,
  MAXIMUM_SIZE_IN_BYTES = 500 * 1024
}


export enum MILLISECOND {
  ONE_MINUTE = 60 * 1000
}

export enum LANGUAGE {
  EN = 'en',
  PT_BR = 'pt-BR',
}
