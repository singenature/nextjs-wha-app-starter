"use client";

import { useState } from "react";

export default function AppFooter() {
  const [company, setCompany] = useState('COSCI');

  return (
    <div>
      <hr />
      <p onMouseOver={() => setCompany('SWU')}>{company}</p>
      <div>{new Date().toLocaleDateString()}</div>
      <p>codingthailand@gmail.com &copy; {new Date().getFullYear()}</p>
    </div>
  );
}