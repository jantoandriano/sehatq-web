export type ConstToUnion<Const extends Record<string, string>> =
  Const[keyof Const];
