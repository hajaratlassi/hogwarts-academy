import type { Wizard, Spell, NewWizard } from "./types";
import { Log, MeasureTime, ValidateSpellPower } from "./decorators";

export class Repository<T extends { id: number }> {
  private items: T[] = [];

  @Log
  add(item: T): void {
    this.items.push(item);
  }

  @MeasureTime
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  // Prochain identifiant libre (max + 1), pour que l'appelant n'en fournisse pas.
  protected nextId(): number {
    return this.items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, changes: Partial<T>): boolean {
    const item = this.findById(id);

    if (!item) return false;

    Object.assign(item, changes);
    return true;
  }
}

export class WizardRepository extends Repository<Wizard> {
  // Exercice 1 : l'appelant fournit un NewWizard (sans id), le dépôt attribue l'id.
  create(data: NewWizard): Wizard {
    const wizard = { ...data, id: this.nextId() } as Wizard;
    this.add(wizard);
    return wizard;
  }

  // Exercice 2 : Wizard["house"] = type indexé -> l'union House.
  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
  // Exercice 4 : rejette tout sort dont power < 0.
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}
