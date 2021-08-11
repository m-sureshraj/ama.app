// using the custom types until the package provides types
// https://github.com/jaydenseric/fake-tag/
declare module 'fake-tag' {
  export default function fakeTag(
    literals: TemplateStringsArray,
    ...expressions: unknown[]
  ): string;
}
