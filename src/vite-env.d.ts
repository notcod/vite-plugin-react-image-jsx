/// <reference types="vite/client" />

declare module '*?jsx' {
  const Cmp: React.FC<Optional<Omit<HTMLImageElement, 'src' | 'width' | 'srcSet' | 'height'>>>;
  export default Cmp;
  export const width: number;
  export const height: number;
  export const srcSet: string;
}
