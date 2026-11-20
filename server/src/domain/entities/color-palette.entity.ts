import { ConflictError } from "../errors/conflict.error.ts";
import type {
  ColorPaletteProps,
  PaletteColors,
  UpdatePaletteProps,
} from "../types/color-palette.types.ts";

export class ColorPalette {
  constructor(
    public readonly id: string | null,
    public name: string,
    public colors: PaletteColors,
    public isActive: boolean,
    public readonly createdAt: Date | null,
    public updatedAt: Date | null,
  ) {}

  static create(props: ColorPaletteProps): ColorPalette {
    return new ColorPalette(
      props.id ?? null,
      props.name,
      { ...props.colors },
      props.isActive,
      props.createdAt,
      props.updatedAt,
    );
  }

  static createActive(
    props: Omit<ColorPaletteProps, "isActive">,
  ): ColorPalette {
    return ColorPalette.create({ ...props, isActive: true });
  }

  static createInactive(
    props: Omit<ColorPaletteProps, "isActive">,
  ): ColorPalette {
    return ColorPalette.create({ ...props, isActive: false });
  }

  updateDetails(data: UpdatePaletteProps): void {
    if (data.name !== undefined) {
      this.name = data.name;
    }

    if (data.colors !== undefined) {
      this.colors = { ...data.colors };
    }
  }

  activate(): void {
    if (this.isActive) {
      throw new ConflictError("Color palette is already active");
    }

    this.isActive = true;
  }

  deactivate(): void {
    if (!this.isActive) {
      throw new ConflictError("Color palette is already inactive");
    }

    this.isActive = false;
  }
}
