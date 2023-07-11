import React from 'react';

interface LayoutProps {
  title: string;
  children?: JSX.Element;
}

export const Layout = ({ title, children }: LayoutProps) => (
  <section className="layout">
    <section className="header"></section>
    <section className="main">
      <h1>{title}</h1>
      {children ? children : ''}
    </section>
  </section>
);
