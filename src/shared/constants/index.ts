export enum PATTERN {
  POSITIVE_NUMBER = '^[0-9]+$',
  ROLE_NAME = '^[a-zA-Z][a-zA-Z0-9]+ ?[a-zA-Z0-9]+$',
  UUID = '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
  EMAIL = '^[^ @]+@[^ @]+\.[^ @]+$',
  PASSWORD = '^[^ ]{8,16}$'
}

export enum FILE {
  RANDOM_NAME_KEY_LENGTH = 32,
  MAXIMUM_SIZE_IN_BYTES = 500 * 1024
}
