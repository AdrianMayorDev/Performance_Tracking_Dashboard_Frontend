import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Theme configuration
  theme: {
    semanticTokens: {
      colors: {
        danger: { value: '{colors.red.500}' },
        success: { value: '{colors.green.500}' },
        muted: { value: '{colors.gray.500}' },
        canvas: { value: '{colors.white}' },
      },
    },
  },
  // Patterns configuration
  patterns: {
    extend: {
      container: {
        transform(props) {
          // Customize the container pattern
          delete props.centerContent;
          return Object.assign(
            {
              position: 'relative',
              width: '100%',
              maxWidth: '7xl',
              mx: 'auto',
              paddingX: { base: '4', md: '6' },
            },
            props
          );
        },
      },
    },
  },
});