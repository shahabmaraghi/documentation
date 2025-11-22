import type { MDXComponents } from 'mdx/types';
import { CodeTabs } from './app/components/CodeTabs';
import { ApiRequestResponse } from './app/components/ApiRequestResponse';
import { ApiInteractive } from './app/components/ApiInteractive';
import { ScalarApiReference } from './app/components/ScalarApiReference';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    CodeTabs,
    ApiRequestResponse,
    ApiInteractive,
    ScalarApiReference,
  };
}

