import React from 'react';

/**
 * Composes a list of Provider components into one, avoiding a hand-nested
 * "provider pyramid". Order matters: providers earlier in the array wrap
 * providers later in the array (same nesting order as writing them by hand).
 *
 *   composeProviders([A, B, C])  ==  <A><B><C>{children}</C></B></A>
 */
export function composeProviders(providers) {
  return function ComposedProviders({ children }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}
