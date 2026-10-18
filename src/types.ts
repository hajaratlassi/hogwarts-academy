export type House =
  | "Gryffindor"
  | "Slytherin"
  | "Ravenclaw"
  | "Hufflepuff";

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;

  // Index signature: dynamic properties must use these value types.
  [key: string]: string | number | boolean;
}

export type SpellCategory = "attack" | "defense" | "healing";

export interface Spell {
  id: number;
  name: string;
  category: SpellCategory;
  power: number;
}

export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };

// Conditional type: choose an output type based on the spell category.
export type SpellOutput<T extends SpellCategory> =
  T extends "attack" ? number :
  T extends "defense" ? boolean :
  T extends "healing" ? string :
  never;

// infer extracts an array element type.
export type ArrayElement<T> =
  T extends (infer Item)[] ? Item : never;

// Utility type examples.
// NB : avec l'index signature de Wizard, `Omit<Wizard, "id">` perd toutes les
// propriétés connues (name, house...). Ce mapped type retire "id" tout en
// conservant les propriétés connues ET l'index signature.
export type NewWizard = {
  [K in keyof Wizard as K extends "id" ? never : K]: Wizard[K];
};
export type WizardSummary = Pick<Wizard, "id" | "name" | "house">;
export type WizardUpdate = Partial<Wizard>;

// Exercice 3 : on extrait uniquement l'événement "spell-cast" de l'union.
export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;

export type AttackSpell = Extract<Spell, { category: "attack" }>;
export type NonHealingCategory = Exclude<SpellCategory, "healing">;
export type HousePoints = Record<House, number>;
