// src/__test__/notFound.spec.tsx
import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import PageNotFound from '../pageNotFound';

let documentBody: RenderResult;

describe('<PageNotFound />', () => {
  beforeEach(() => {
    documentBody = render(<PageNotFound />);
  });
  
  it('shows not found message', () => {
    expect(documentBody.getByText('You shouldn\'t be here!')).toBeInTheDocument();
  });
});