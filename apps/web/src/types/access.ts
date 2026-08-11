export type InitiationKey = string;

export type AccessState = {
  hasAccess: boolean;
  initiationKey?: InitiationKey;
};
