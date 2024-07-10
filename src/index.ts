import path from 'path';

export function ImageJSX() {
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.tiff'];
  return {
    name: 'vite-plugin-react-image-jsx',
    transform(code, id) {
      const parseId = (originalId) => {
        const [pathId, query] = originalId.split('?');
        const queryStr = query || '';
        return {
          originalId,
          pathId,
          query: queryStr ? `?${query}` : '',
          params: new URLSearchParams(queryStr),
        };
      };
      id = id.toLowerCase();
      const { params, pathId } = parseId(id);
      if (params.has('jsx')) {
        const extension = path.extname(pathId).toLowerCase();
        if (supportedExtensions.includes(extension)) {
          if (!code.includes('srcSet')) {
            console.error(`Image '${id}' could not be optimized to JSX`);
          }
          const index = code.indexOf('export default');
          return (
            code.slice(0, index) +
            `
            import { jsx, Fragment } from "react/jsx-runtime";
            const PROPS = {srcSet, width, height};
            export default function (props, key) {
              return jsx(Fragment, {
                children: jsx("img", {
                  ...{decoding: 'async', loading: 'lazy'}, ...PROPS, ...props
                })
              }, key);
            }`
          );
        }
      }
      return null;
    },
  };
}
