import React from "react";

export const randomNumberGenerator = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};
