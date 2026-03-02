import { register } from "../src/index.js";
import {
  ButtonComponent,
  InputComponent,
  ConditionalComponent,
  NestedHtmlComponent,
  XssComponent,
  NoRenderComponent,
  StackComponent,
  CardComponent,
  SectionComponent,
  BadgeComponent,
  LinkComponent,
  ComplexInputComponent,
  NativePropComponent,
} from "./fixtures.js";

register(
  ButtonComponent,
  InputComponent,
  ConditionalComponent,
  NestedHtmlComponent,
  XssComponent,
  NoRenderComponent,
  StackComponent,
  CardComponent,
  SectionComponent,
  BadgeComponent,
  LinkComponent,
  ComplexInputComponent,
  NativePropComponent
);
