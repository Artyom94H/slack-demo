import React, { Suspense } from 'react';

const Loader = (
  <div>
    loading ...
  </div>
);

export default Component => props => (
  <Suspense fallback={ Loader }>
    <Component { ...props } />
  </Suspense>
)
